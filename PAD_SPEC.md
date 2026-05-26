# Pad / Tablet UX — spec for the pad-side build

Hi — this is the design intent for the **iPad reading mode**.
The phone build (current repo) does NOT match what we want on
pad.  Read this end-to-end before changing code; the data model
already has everything we need, but the lookup logic on pad is
doing the wrong thing.

---

## 1. The user's mental model on pad

A two-pane reading layout:

```
  ┌──────────────────────────────┬─────────────────────────┐
  │                              │                         │
  │   reading article            │   side panel            │
  │   (left pane)                │   (right pane)          │
  │                              │                         │
  │   tap any underlined word    │   "compression"  n.     │
  │   → side panel updates       │   压缩                  │
  │                              │                         │
  │   …unimaginable density,     │   · material compression│
  │   wherein space and time …   │     材料压缩            │
  │                              │                         │
  │                              │   (tap word again →     │
  │                              │    drawer card opens)   │
  │                              │                         │
  └──────────────────────────────┴─────────────────────────┘
```

Two clicks, two layers:

1. **Click the word in the article**:
   → the right pane shows **THE CLICKED WORD ITSELF** — its
   pos, its Chinese gloss, and its two example collocations.
   The right pane is "what does THIS word mean and how does it
   collocate".
   **The right pane is NOT the parent card.**  The user wants
   to learn `ecological` when they tapped `ecological`, not
   `logic`.  If you show them `logic` they get confused: "I
   tapped a and you opened b — I can't remember any of this".

2. **Click the word at the top of the right pane** (or a "more"
   button):
   → an over-page drawer opens with the **full family card**
   (the parent — `logic` in our example).  This is where the
   user goes when they want to see the whole word-family /
   cousins / sentence example.

That's the entire pad reading model.

---

## 2. Why pad currently feels empty

The phone build's `linkify` does:

```
reading word →  rev[word] || rev[stem(word)] || rev[strip-prefix(word)]
              || rev[stem(strip-prefix(word))] || longest-5+-substring-head
```

…and routes the click STRAIGHT to the parent head's parchment.
That's the wrong UX on pad — for pad you don't want to *route*,
you want to *resolve to the clicked word's own info* and only
*name the parent* for the drawer.

On pad the side-panel needs:

```
reading word →  WORD_MINI_INDEX[word]   // small struct, see §3
              ↓ if missing
              →  WORD_MINI_INDEX[stem/strip/substring fallback]
              ↓ both miss
              →  word is NOT clickable (skip linkifying it)
```

The fallback chain is the same as phone, but the **payload** is
different:

| Phone | Pad side panel |
|---|---|
| Open parent's full parchment card | Show the resolved entry: word + pos + zh + collocations |
| Drawer / new screen flow | Stays in the side pane; lightweight |

---

## 3. Data — already shipped in `data.js`

`PARCHMENT_CARDS` is keyed by **parent head** (the family elder).
The full entry shape:

```js
{
  h: 'compressive',
  pos: 'adj.',
  zh: '压缩的；可压缩的',
  partner: 'tensile',          // single synonym (used as group)
  example: 'Engineers test compressive strength of concrete daily.',
  example_zh: '工程师每天测试混凝土的抗压强度。',
  family: [
    'compression | n. 压缩 | material compression | 材料压缩',
    'compressed  | adj. 压缩的 | compressed file / compressed data | 压缩文件；压缩数据',
    …
  ],
  kin: [
    'impression  | n. 印象；压痕 | first impression / deep impression | 第一印象；深刻印象',
    …
  ],
  friends: [
    'compressive strength | 抗压强度',
    …
  ],
  topic: 'Engineering',
  // … plus internal fields not used on pad
}
```

The format of each family / kin line is:

```
<word> | <pos> + <zh-gloss> | <collocation(s) joined by " / "> | <zh-collocation(s) joined by ";">
```

So `compression`'s record is *embedded inside* `compressive`'s
card.  THAT line `'compression | n. 压缩 | material compression
| 材料压缩'` is the mini-entry you display in the right pane when
the user taps "compression".

### How many words are reachable?

In the current data:

```
own heads (parent cards)    : 1945
family entries              : 2688
kin entries                 : 2527
distinct word FORMS         : 5563
```

If pad reading shows only 30-50 clickable words per chapter, you
are *under-using* this data by an order of magnitude.

---

## 4. Build a WORD_MINI_INDEX

Construct this **once** at app boot, then look up at O(1).

```js
// For each card head and each line of its .family / .kin arrays,
// produce one mini-entry keyed by the lead word.  When a word
// appears in multiple parents (e.g. "polish" in 3 cards), keep
// only the first occurrence (deterministic — iterate in card-
// alphabetical order).

const WORD_MINI_INDEX = (function buildMiniIndex() {
  const out = Object.create(null);
  function setOnce(word, entry) {
    const k = (word || '').toLowerCase().replace(/[^a-z'\-]/g, '');
    if (!k || out[k]) return;
    out[k] = entry;
  }
  // Pass 1 — own heads
  Object.entries(PARCHMENT_CARDS).forEach(([h, c]) => {
    setOnce(h, {
      word: h,
      pos: c.pos || '',
      zh: c.zh || '',
      parent: h,                 // the word IS its own parent
      collocations: (c.friends || []).map(L => {
        const [phrase, zh] = L.split('|').map(s => (s || '').trim());
        return { phrase, zh };
      }),
    });
  });
  // Pass 2 — family / kin entries (don't overwrite heads from pass 1)
  Object.entries(PARCHMENT_CARDS).forEach(([h, c]) => {
    [...(c.family || []), ...(c.kin || [])].forEach(L => {
      const [w, posZh, phrases, zhs] = L.split('|').map(s => (s || '').trim());
      if (!w) return;
      // posZh is e.g. "n. 压缩" — split on first whitespace.
      const m = posZh.match(/^(\S+?)\.?\s+(.+)$/);
      const pos = m ? m[1] + '.' : '';
      const zh  = m ? m[2]       : posZh;
      const phraseList   = (phrases || '').split(/\s*\/\s*/).filter(Boolean);
      const phraseZhList = (zhs     || '').split(/\s*[；;\/]\s*/).filter(Boolean);
      const collocations = phraseList.map((p, i) => ({
        phrase: p,
        zh: phraseZhList[i] || ''
      }));
      setOnce(w, { word: w, pos, zh, parent: h, collocations });
    });
  });
  return out;
})();
```

That gives you ~5500 entries to draw from.

---

## 5. Linkify on pad

Same fallback chain you'd use on phone, but you resolve to an
entry, not a parent:

```js
function lookupMini(w) {
  w = (w || '').toLowerCase();
  if (w.length < 3) return null;
  if (WORD_MINI_INDEX[w]) return WORD_MINI_INDEX[w];
  // morphological fallbacks (use the same stem / prefix-strip /
  // substring helpers the phone build already has):
  const s = stem(w);
  if (s !== w && WORD_MINI_INDEX[s]) return WORD_MINI_INDEX[s];
  const np = w.replace(/^(in|un|non|dis|re|over|under|pre|sub|inter|im|ir|il)/, '');
  if (np !== w && WORD_MINI_INDEX[np]) return WORD_MINI_INDEX[np];
  // longest 5+ char substring of w that is itself an index key
  if (w.length >= 7) {
    for (let len = Math.min(w.length - 1, 9); len >= 5; len--) {
      for (let i = 0; i + len <= w.length; i++) {
        const sub = w.slice(i, i + len);
        if (WORD_MINI_INDEX[sub]) return WORD_MINI_INDEX[sub];
      }
    }
  }
  return null;
}
```

`linkify(text)` then replaces matched words with
`<a class="rd-jump" data-word="…">…</a>`.

The click handler updates the right pane with the resolved entry
(NOT a route change, NOT a new screen).

The CSS for `.rd-jump` should be a subtle underline / ink —
nothing loud.

---

## 6. The drawer / parent card

Tapping the headword in the right pane (or a small "open card"
glyph) opens the family card — that's where you reuse the
existing `showParchment(entry.parent)` from `app.js`.  The pad's
drawer should slide in from the right (or overlay), NOT replace
the article — the user should be able to dismiss it and continue
reading.

---

## 7. What to verify, concretely

Open Chapter 1.1 "The First Light" on pad and count the
clickable words.  You should be seeing approximately:

- ~40-55 underlined / clickable words per ~400-word section.
- Tapping `compression` → right pane shows "compression | n. 压缩 | material compression | 材料压缩", with `compressive` named small at the top as the parent.
- Tapping the right-pane head `compressive` (or the open-card glyph) → drawer with the full parchment.

If you're seeing fewer than 20 clickable words, your linkify is
either:
- Only looking up direct heads in PARCHMENT_CARDS (skipping the
  family / kin entries), or
- Skipping the morphological fallback chain.

Fix the index build first; the rest follows.

---

## 8. Why this matters

User explicitly said:
> 我在pad端运行的逻辑是这样的
> 点击单词 右列出现该单词的翻译和词组（注意 是该单词）
> 不然我每次点a出现b 也有点记不住
> 然后再点击右列简单翻译单词 弹出抽屉词卡
> 词卡是主词家族

Translation, for the record:
> On pad my flow is:
> Click a word → the right column shows THAT word's translation
> and collocation (note: THAT word itself).  Otherwise every
> click jumps from a to b and I can't memorise anything.
> Then tap the right-pane's simple-translation word → a drawer
> opens with the family card (the parent's family).

That's the spec.  Implement it.
