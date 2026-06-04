# Pad / Tablet UX — spec for the pad-side build

Hi pad CC.  Re-read this from scratch — the data model just got
**rewritten** at the user's request, and the previous nested
structure is retired.

---

## 1. The new data model (READ THIS FIRST)

Two flat JSON files live in the repo root:

### `vocab.json`
**Every word's content is stored exactly once.**

```json
{
  "object": {
    "word":  "object",
    "pos":   "v./n.",
    "zh":    "反对；物体；对象",
    "phrases": [
      ["object to a proposal", "反对一个提议"],
      ["a physical object",    "一个实体物体"]
    ],
    "example": [
      "Environmental groups object to building roads through protected wetlands.",
      "环保组织反对在受保护湿地中修建道路。"
    ]
  },
  "objection": { … },
  "objective": { … },
  "reject":    { … },
  …
}
```

**5878 entries total.**  Each is what the user calls a "主词卡内
容" — the core information about that word.

### `links.json`
**Only the word-id graph — no duplicated content.**

```json
{
  "object": {
    "family": ["objection", "objective", "objectively"],
    "kin":    ["reject", "project", "inject", "eject", "subject"],
    "group":  ["oppose", "resist", "disagree"]
  },
  "reject": {
    "family": ["rejection", "rejected"],
    "kin":    ["object", "project", "inject"],
    "group":  ["refuse", "decline"]
  },
  …
}
```

**5878 entries.**

Definitions:
| field | meaning |
|---|---|
| `family` | direct derivatives / inflections (same root, same head word, different form) |
| `kin` | distant cousins — similar shape AND associated meaning, but a different head word |
| `group` | synonyms / interchangeable replacements |

**The graph is symmetric.** If A.kin includes B, then B.kin
already includes A (and the same word is never in two buckets
on the same parent — family wins, then group, then kin).  This
is what the user calls "互相为kin … 强化记忆".

### `missing_cards_report.json`
Build report — vocab entries that are incomplete (no example or
no phrases yet) so we know what to author next.  Don't read this
at runtime; it's documentation.

---

## 2. The pad reading UX (unchanged)

Two-pane reading layout:

```
  ┌──────────────────────────────┬─────────────────────────┐
  │                              │                         │
  │   reading article            │   side panel            │
  │   (left pane)                │   (right pane)          │
  │                              │                         │
  │   tap any underlined word    │   compression   n.      │
  │   → side panel updates       │   压缩                  │
  │                              │                         │
  │   …unimaginable density,     │   · material compression│
  │   wherein space and time …   │     材料压缩            │
  │                              │                         │
  │                              │   (tap headword →       │
  │                              │    drawer / card opens) │
  │                              │                         │
  └──────────────────────────────┴─────────────────────────┘
```

Two clicks, two layers:

1. **Tap a word in the article** → side panel shows
   `vocab[word]` — that word's own pos / zh / first phrase.
   **Always the CLICKED word's data, never the parent's.**
   The user explicitly hates "click a → see b".

2. **Tap the headword in the side panel** (or a small "open
   card" glyph) → drawer card slides in, showing the **full
   `vocab[word]` entry PLUS the relationships** (family / kin /
   group rows, each row rendered from `vocab[memberId]`'s zh
   and first phrase).

Tapping any kin / family / group row inside the drawer →
**replace the drawer with that word's own drawer**.  The user
wanted reinforcement: if you arrived at reject from object's
kin, then opening reject's drawer should also list object in
reject's kin row — and that's already true thanks to the
symmetric graph in §1.

---

## 3. Rendering a drawer (concrete steps)

Given a word `w`:

```js
const card = vocab[w];               // its own content
const rel  = links[w] || {};         // its relationships

renderHeader(card);                  // word + pos + zh
renderPhrases(card.phrases);         // 1-3 phrases
if (card.example) renderExample(card.example);

['family', 'group', 'kin'].forEach(kind => {
  const ids = rel[kind] || [];
  if (ids.length === 0) return;
  renderSectionLabel(kind);
  ids.forEach(id => {
    const sub = vocab[id];
    if (!sub) return;               // shouldn't happen — graph is closed
    renderRow({
      word:   sub.word,
      pos:    sub.pos,
      zh:     sub.zh,
      phrase: (sub.phrases[0] && sub.phrases[0][0]) || '',
      phraseZh: (sub.phrases[0] && sub.phrases[0][1]) || '',
    });
    // row tap → openDrawer(id)
  });
});
```

Some hard rules:
- **Never** read a row's content from anywhere other than
  `vocab[id]`.  The old "nested string" lines (`'reject | v. … |
  … | …'`) are gone.
- **Never** render the same id twice in the same section (dedup
  by id before rendering).
- **Never** render the parent itself in its own family/kin/group
  (the migration already filtered these — trust it).

If `vocab[id]` is missing (shouldn't happen), skip that row.

---

## 4. Linkify on pad

For every reading article token longer than 3 chars, try to
resolve to a vocab id:

```js
function lookupVocabId(w) {
  w = (w || '').toLowerCase();
  if (w.length < 3) return null;
  if (vocab[w]) return w;
  const s = stem(w);
  if (s !== w && vocab[s]) return s;
  const np = w.replace(/^(in|un|non|dis|re|over|under|pre|sub|inter|im|ir|il)/, '');
  if (np !== w && np.length >= 4 && vocab[np]) return np;
  if (w.length >= 7) {
    for (let len = Math.min(w.length - 1, 9); len >= 5; len--) {
      for (let i = 0; i + len <= w.length; i++) {
        const sub = w.slice(i, i + len);
        if (vocab[sub]) return sub;
      }
    }
  }
  return null;
}
```

Wrap matched words with `<a class="rd-jump" data-word="…">`.
Click → `openSidePanel(vocab[matched_id])`.

Expected coverage: ~40-55 clickable words per ~400-word section.
If you're seeing fewer than 20, your linkify is missing the
fallback chain.

---

## 5. The bug the user just reported

> "logical / HER KIN
>  ecological 生态的
>  ecological niche 生态位； ecological crisis 生态危机
>  ecological 生态的
>  ecological niche 生态位； ecological crisis 生态危机
>  …(repeated 4×)"

That's a render-side dedup bug.  With the normalized data,
`links.logical.kin` is `["ecological", …]` — `ecological` once,
not four times.  If your code is reading from some legacy
nested list, you'll get duplicates.  Switch to reading from
`links.json` and the duplicates vanish.

Also: you're showing only `kin`.  Make sure you iterate `family`
+ `group` + `kin` in that order (with `<hr class="pc-rule">`
between sections — see the phone build's parchment renderer for
the visual idiom, but build from the normalized data).

---

## 6. Where the files live

```
/Sealyra/
  vocab.json                       (1.1 MB — 5878 word cards)
  links.json                       (388 KB — 5878 link entries, symmetric)
  missing_cards_report.json        (build-time report; don't ship to runtime)
```

`data.js`'s old `PARCHMENT_CARDS` is still present in the phone
build but **do not use it for pad** — it has duplicates and
nested-string fragility.  Use vocab.json + links.json.

---

## 7. Sanity checks before you commit anything

1. Tap `compression` in Chapter 1.1 → side panel shows
   `compression / n. / 压缩 / material compression / 材料压缩`.
   NOT compressive's content.
2. Open `reject`'s drawer → see `object` listed in its kin row,
   showing `object / v./n. / 反对；物体；对象 / object to a
   proposal / 反对一个提议`.
3. From inside `reject`'s drawer tap the `object` kin row →
   drawer becomes `object`'s drawer; in there `reject` shows up
   in object's kin row (the symmetric backlink).
4. No word appears twice in any single section of any drawer.

If all four are true, ship it.
