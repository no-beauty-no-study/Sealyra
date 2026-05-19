/* ============================================================
   Her Little Lexicon — app.js
   Logic ONLY. No visual styling.

   Mental model:
     • Cover is the hub. Title + Tonight's Reading + counter +
       (her note) + (the index). nothing else lives on cover.
     • Game flow is strictly linear, three stages:
         stage1: the matching   (4 pairs, 8 cards)
         stage2: the reading    (8 multiple-choice questions)
         stage3: the inscription (8 dictations)
       After each stage → result screen → "next" (pink) or
       "back to cover" (ghost). After stage3 → summary → cover.
     • Auto-advance: oracle correct + dict correct + dict-after-
       rewrite all auto-advance without a button.
     • note / index are cover-side pages, NOT in the game flow.
   ============================================================ */

/* ------------------------------------------------------------
   0. UTILITIES
   ------------------------------------------------------------ */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
// v=64 — seeded shuffle so each chapter draws the SAME content from
// the global pools.  Without this, every "Continue Reading" tap on
// the same chapter showed fresh words — the user kept saying
// "我只通关了一次但你一直在累积不同单词".  LCG keeps it tiny.       */
function seededShuffle(arr, seed) {
  let s = (seed | 0) || 1;
  const rnd = () => { s = (s * 1664525 + 1013904223) | 0; return ((s >>> 0) / 4294967296); };
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function escapeHtml(s) {
  return (s == null ? '' : String(s))
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escapeAttr(s) { return escapeHtml(s); }

function speak(text, lang = 'en-US') {
  if (!window.speechSynthesis) return Promise.resolve();
  window.speechSynthesis.cancel();
  return new Promise(resolve => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.92;
    u.pitch = 1.0;
    u.onend   = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

/* ------------------------------------------------------------
   1. SFX — one bank, named by ROLE (so re-skinning sound is one place)
   Roles:
     bling   — entering a game (Tonight's Reading tap, stage→stage)
     tap     — generic UI tap (default button, ghost button)
     pageTurn— opening a vocab card (tarot flip)
     pop     — modal appears
     right   — correct answer (oracle / dict)
     wrong   — wrong answer
     finish  — chapter finished
   ------------------------------------------------------------ */
const SFX = (() => {
  let ctx = null;
  const ensure = () => { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); return ctx; };

  function tone(freqs, gap = 0.06, dur = 0.18, type = 'sine', peak = 0.16) {
    const c = ensure();
    const t0 = c.currentTime;
    freqs.forEach((f, i) => {
      const o = c.createOscillator();
      const g = c.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f, t0 + i * gap);
      g.gain.setValueAtTime(0.0001, t0 + i * gap);
      g.gain.exponentialRampToValueAtTime(peak, t0 + i * gap + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * gap + dur);
      o.connect(g); g.connect(c.destination);
      o.start(t0 + i * gap);
      o.stop(t0 + i * gap + dur + 0.05);
    });
  }
  function noise(dur = 0.18, peak = 0.08, hp = 1800) {
    const c = ensure();
    const bufferSize = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    const src = c.createBufferSource();
    src.buffer = buf;
    const filter = c.createBiquadFilter();
    filter.type = 'highpass'; filter.frequency.value = hp;
    const g = c.createGain(); g.gain.value = peak;
    src.connect(filter); filter.connect(g); g.connect(c.destination);
    src.start(c.currentTime);
  }
  return {
    bling:   () => {
      // Ascending chime …
      tone([1175, 1568, 1976, 2349, 2794], 0.05, 0.32, 'triangle', 0.13);
      // … with a shimmer chord layered ~80ms later …
      setTimeout(() => tone([2349, 2794, 3136], 0.04, 0.22, 'sine', 0.08), 80);
      // … and a final tiny sparkle.
      setTimeout(() => tone([3520, 4186], 0.04, 0.14, 'sine', 0.05), 200);
    },
    tap:     () => tone([1050],                          0.0, 0.07, 'sine',     0.06),
    pageTurn:() => { noise(0.18, 0.06, 2200); },
    pop:     () => tone([784, 1175, 1568],               0.06, 0.22, 'triangle', 0.12),
    right:   () => tone([880, 1175, 1568],               0.05, 0.22, 'sine',     0.16),
    wrong:   () => tone([311, 207],                      0.07, 0.20, 'square',   0.06),
    finish:  () => tone([523, 659, 784, 988, 1175, 1318],0.08, 0.26, 'sine',     0.14),

    // Result-modal chimes — pick one based on the score band.
    // PERFECT: full ascending sparkle + shimmer
    scorePerfect: () => {
      tone([1175, 1568, 1976, 2349, 2794, 3136], 0.05, 0.28, 'triangle', 0.14);
      setTimeout(() => tone([2349, 2794, 3136, 3520], 0.04, 0.22, 'sine', 0.09), 90);
      setTimeout(() => tone([3520, 4186], 0.04, 0.16, 'sine', 0.06), 220);
    },
    // GOOD: warm major arpeggio
    scoreGood: () => {
      tone([784, 988, 1175, 1397], 0.06, 0.24, 'triangle', 0.13);
      setTimeout(() => tone([1568, 1976], 0.05, 0.18, 'sine', 0.08), 100);
    },
    // OK: gentle two-note chime
    scoreOk: () => tone([784, 988], 0.10, 0.32, 'sine', 0.11),
    // LOW: soft minor sigh — encouraging, never punishing
    scoreLow: () => tone([523, 622], 0.12, 0.36, 'sine', 0.09)
  };
})();

/* ------------------------------------------------------------
   2. SESSION BUILDER  (v=51 — new bundle schema)

   Each stage now draws from its OWN dedicated pool, per the
   data bundle's "11. 角色规则":
     stage 1 → MATCH_GROUPS         (4 pairs = 8 cards)
     stage 2 → SCENE_BLANK_QUESTIONS (4 reading sentences)
     stage 3 → DICTATION_QUESTIONS   (4 dictation words)

   The 8 match-game words DO NOT have to overlap with the stage-2
   or stage-3 pools — the data is curated so dictation words are
   "output" (writing-worthy) while reading words are "recognition".
   buildSession() now picks independently from each pool, no
   forced sharing of headwords.
   ------------------------------------------------------------ */
const _CARDS_ALIAS    = PARCHMENT_CARDS;     // shorthand
const TOTAL_WORDS     = Object.keys(PARCHMENT_CARDS).length;
// Quick lookup tables.
const _JUMP_LINKS     = PARCHMENT_JUMP_LINKS;
const _GROUPS_ARR     = MATCH_GROUPS;
const _DICT_ARR       = DICTATION_QUESTIONS;
const _SCENE_ARR      = SCENE_BLANK_QUESTIONS;

// Match-pair dedupe: some partners appear in multiple groups, so a
// random 4-pair draw could land the same word on both sides.  Pull
// pairs greedily, dropping any whose partner OR head is already on
// the board.
function _pickMatchPairs(n = 4, seed = 0) {
  const used = new Set();
  const out  = [];
  // v=64 — when a non-zero seed is passed, draw deterministically so
  // the same chapter always shows the same pairs.
  const pool = seed ? seededShuffle(_GROUPS_ARR, seed * 7 + 11) : shuffle(_GROUPS_ARR);
  for (const g of pool) {
    if (used.has(g.head) || used.has(g.partner)) continue;
    out.push({ head: g.head, partner: g.partner });
    used.add(g.head); used.add(g.partner);
    if (out.length === n) break;
  }
  return out;
}
function _pickSceneQuestions(n = 4, seed = 0) {
  // v=63 — user wants the 3-blank / 12-option puzzle.  Prefer
  // scenes with 3+ answers; fall back to the wider pool if there
  // aren't enough.  (315 of 356 have 2 blanks, only 21 have 3.)
  const tripled = _SCENE_ARR.filter(q => (q.answers || []).length >= 3);
  const doubled = _SCENE_ARR.filter(q => (q.answers || []).length === 2);
  const sh = seed
    ? (arr, offset) => seededShuffle(arr, seed * 13 + offset)
    : (arr) => shuffle(arr);
  const picks = sh(tripled, 3).slice(0, n);
  if (picks.length < n) {
    picks.push(...sh(doubled, 5).slice(0, n - picks.length));
  }
  return picks;
}
function _pickDictQuestions(n = 4, seed = 0) {
  // v=54 — dictation now uses SINGLE-BLANK EXAMPLE SENTENCES per
  // user.  Source = PARCHMENT_CARDS where canWrite is true (644
  // entries), AND the card has an example sentence containing the
  // headword.  Each question blanks out the headword from the
  // example so the user types it in context.  Old phrase-only
  // DICTATION_QUESTIONS path retired.
  const pool = Object.keys(PARCHMENT_CARDS).filter(w => {
    const c = PARCHMENT_CARDS[w];
    if (!c || !c.canWrite || !c.example) return false;
    // Must actually appear in the example so we can blank it.
    return new RegExp(`\\b${w}\\b`, 'i').test(c.example);
  });
  const picked = seed
    ? seededShuffle(pool, seed * 17 + 23).slice(0, n)
    : shuffle(pool).slice(0, n);
  return picked.map(w => {
    const c = PARCHMENT_CARDS[w];
    const blank_sentence = c.example.replace(
      new RegExp(`\\b${w}\\b`, 'i'),
      '______'
    );
    return {
      head: w,
      hint: (c.h || w)[0],
      blank_sentence,
      full_sentence: c.example,
      sentence_zh:   c.example_zh || '',
      answer:        w,
      role:          c.role || 'output',
      topic:         c.topic || ''
    };
  });
}

function buildSession(seed = 0) {
  // v=64 — accept an optional seed so each chapter draws stable
  // content from the global pools.  freshSession() passes
  // saved.chapter so "Continue Reading" on chapter N always shows
  // the same set of pairs / scenes / dicts.                          */
  const pairs   = _pickMatchPairs(4, seed);
  if (pairs.length < 4) return null;
  const scenes  = _pickSceneQuestions(4, seed);
  const dicts   = _pickDictQuestions(4, seed);
  const words = Array.from(new Set([
    ...pairs.flatMap(p => [p.head, p.partner]),
    ...scenes.flatMap(s => s.answers || []),
    ...dicts.map(d => d.head)
  ]));
  return { pairs, scenes, dicts, words };
}

/* ------------------------------------------------------------
   3. PERSISTED STATE
   ------------------------------------------------------------ */
const Store = {
  load() {
    try {
      return Object.assign(
        { progress: 0, learned: {}, mistakes: {}, chapter: 1 },
        JSON.parse(localStorage.getItem('hll-state') || '{}')
      );
    } catch { return { progress: 0, learned: {}, mistakes: {}, chapter: 1 }; }
  },
  save() { try { localStorage.setItem('hll-state', JSON.stringify(saved)); } catch {} }
};
const saved = Store.load();
if (!saved.chapter || saved.chapter < 1) { saved.chapter = 1; Store.save(); }
// v=63 — restart-game reset: chapter only.  Learned + mistakes are
// lifetime stats; user resets the "where am I in the storybook"
// counter, not their notebook.
function resetChapterProgress() {
  saved.chapter = 1;
  Store.save();
}
function recordMistake(word) {
  saved.mistakes[word] = (saved.mistakes[word] || 0) + 1;
  Store.save();
}
function markLearned(word) {
  saved.learned[word] = true;
  Store.save();
}

/* ------------------------------------------------------------
   4. EPHEMERAL STATE — only lives for the current Tonight's Reading
   ------------------------------------------------------------ */
const state = {
  screen: 'cover',
  session: null,                     // buildSession()
  results: {},                       // results[word] = { match, oracle, dict }
  oracleQs: [],
  oracleIdx: 0,
  dictIdx: 0
};
function freshSession() {
  // v=64 — seed = current chapter so each chapter has stable
  // content across reloads.
  state.session = buildSession(saved.chapter || 1);
  if (!state.session) {
    // fallback so the UI never crashes if data is missing.
    state.session = { pairs: [], scenes: [], dicts: [], words: Object.keys(PARCHMENT_CARDS).slice(0, 8) };
  }
  state.results = {};
  state.session.words.forEach(w => state.results[w] = { match: null, oracle: null, dict: null });
}

/* ------------------------------------------------------------
   5. ROUTER  +  background-layer driver
   ------------------------------------------------------------ */
const BG_BY_SCREEN = {
  cover: 'bg-cover',
  stage1: 'bg-stage', stage2: 'bg-stage', stage3: 'bg-stage',
  'stage1-result': 'bg-result',
  'stage2-result': 'bg-result',
  'stage3-result': 'bg-result',
  note: 'bg-note', 'note-bucket': 'bg-note', index: 'bg-note', card: 'bg-note'
};
// Only screens with real word lists are allowed to scroll the page —
// every other screen locks body overflow so the iOS bounce can't make
// the (fixed) bg-layer look like it's moving.
const SCROLLABLE_SCREENS = new Set(['index', 'note-bucket', 'stage3-result']);
function go(screenId, opts = {}) {
  // v=53 — black-curtain transition.  Two paces:
  //   · MAJOR  (cover → stage / between stages / chapter end):
  //     420 ms total — long black curtain with a centred ❦.
  //   · FAST   (game → result of same stage, side panels):
  //     220 ms total — quick black blink, no glyph.
  if (opts.instant || state.screen === screenId) return _goImmediate(screenId, opts);
  const fast = _isFastTransition(state.screen, screenId);
  // v=62 — cover-side moves (cover ↔ note ↔ index ↔ card) use
  // the soft "cover-veil" instead of the dramatic black curtain
  // so the home pool of pages feels like one continuous space.
  const coverSide = _isCoverSide(state.screen) && _isCoverSide(screenId);
  let veil = document.querySelector('.scene-veil');
  if (!veil) {
    veil = document.createElement('div');
    veil.className = 'scene-veil';
    veil.innerHTML = `<div class="scene-veil-glyph">❦</div>`;
    document.body.appendChild(veil);
  }
  veil.classList.toggle('is-fast', fast);
  veil.classList.toggle('is-cover', coverSide);
  // Hide the glyph on fast transitions.
  const glyph = veil.querySelector('.scene-veil-glyph');
  if (glyph) glyph.style.display = fast ? 'none' : '';
  requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add('is-in')));
  const inDur  = fast ? 110 : 220;
  const outDur = fast ? 110 : 240;
  setTimeout(() => {
    _goImmediate(screenId, opts);
    veil.classList.remove('is-in');
    veil.classList.add('is-out');
    setTimeout(() => { veil.classList.remove('is-out'); }, outDur);
  }, inDur);
}
function _isFastTransition(from, to) {
  // game → its own result OR result → its own game count as fast
  if (!from || !to) return false;
  const pairs = [
    ['stage1','stage1-result'], ['stage1-result','stage1'],
    ['stage2','stage2-result'], ['stage2-result','stage2'],
    ['stage3','stage3-result'], ['stage3-result','stage3'],
  ];
  return pairs.some(p => p[0] === from && p[1] === to);
}
// v=62 — cover-side screens (cover ↔ note ↔ index ↔ card) get
// a SOFTER transition: no black curtain, just a quick page-veil
// fade (the existing transitionTo idiom).  Stage navigations
// keep the dramatic black curtain.
function _isCoverSide(s) {
  return s === 'cover' || s === 'note' || s === 'note-bucket' || s === 'index' || s === 'card';
}
function _goImmediate(screenId, opts = {}) {
  state.screen = screenId;
  $$('.screen').forEach(s => s.classList.toggle('active', s.id === `screen-${screenId}`));
  window.scrollTo(0, 0);
  ['bg-cover','bg-stage','bg-result','bg-note'].forEach(c => document.body.classList.remove(c));
  document.body.classList.add(BG_BY_SCREEN[screenId] || 'bg-cover');
  document.body.classList.toggle('no-scroll', !SCROLLABLE_SCREENS.has(screenId));
  if (Screens[screenId] && Screens[screenId].onEnter) Screens[screenId].onEnter(opts);
  // v=53 — explicit per-screen BGM swap.  User reported that after
  // the connect game only 2 BGMs ever played.  Each screen now
  // GUARANTEES its pool plays even if the per-screen onEnter
  // forgot to call it.
  _ensureBGM(screenId);
}
const BGM_POOL_BY_SCREEN = {
  cover:           'home',
  note:            'home',
  'note-bucket':   'home',
  index:           'home',
  card:            'home',
  stage1:          'game',
  'stage1-result': 'result',
  stage2:          'home',
  'stage2-result': 'result',
  stage3:          'game',
  'stage3-result': 'result',
};
function _ensureBGM(screenId) {
  const pool = BGM_POOL_BY_SCREEN[screenId];
  if (!pool) return;
  try {
    if      (pool === 'home')   LanBGM.playHomeRandom({ volume: 0.42 });
    else if (pool === 'game')   LanBGM.playGameRandom({ volume: 0.40 });
    else if (pool === 'result') LanBGM.playResultRandom({ volume: 0.42 });
  } catch {}
}

/* ------------------------------------------------------------
   6. BUTTON / LINK FACTORIES — one place per category
   ------------------------------------------------------------ */
function btn(label, onClick, { variant = '', disabled = false } = {}) {
  const b = document.createElement('button');
  b.className = 'btn' + (variant ? ' ' + variant : '');
  b.textContent = label;
  if (disabled) b.disabled = true;
  b.addEventListener('click', e => { if (!b.disabled) { SFX.tap(); onClick && onClick(e); } });
  return b;
}
function backToCover(label = '← close the book') {
  const b = document.createElement('button');
  b.className = 'back-to-cover';
  b.textContent = label;
  b.addEventListener('click', () => { SFX.tap(); LanBGM.stop(); go('cover'); });
  return b;
}

/* transitionTo — gentle "page veil" navigation for cover ↔ note / index
   etc.  Drops a fixed gold-darkening veil in front of the page for ~280
   ms, swaps the screen at the midpoint, then lifts the veil.  Visually
   hides the bg-* PNG swap (each background is 2–3 MB and slow on phones)
   and gives a small ceremony to every cross-screen move.  For the more
   dramatic cover → game transition we keep the existing full fade-out. */
function transitionTo(screenId, opts = {}) {
  const dur  = opts.duration || 280;
  const veil = document.createElement('div');
  veil.className = 'page-veil';
  document.body.appendChild(veil);
  // double rAF so the browser sees the initial opacity:0 before we
  // transition to opacity:1.
  requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.add('show')));
  setTimeout(() => {
    go(screenId, opts);
    requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.remove('show')));
    setTimeout(() => veil.remove(), dur + 30);
  }, dur);
}

function lilGhost(label, onClick) {
  // Cover-side link: rendered with the unified tap-title look —
  // ❦ flanking the text + a tight gold underline + soft breath.
  // The old pink "lil-ghost" pill design is retired.
  const b = document.createElement('button');
  b.className = 'tap-title';
  b.innerHTML = `
    <span class="tt-glyph">❦</span>
    <span class="tt-text">${escapeHtml(label)}</span>
    <span class="tt-glyph">❦</span>
  `;
  b.addEventListener('click', () => { SFX.tap(); onClick && onClick(); });
  return b;
}
// 🗝 retired — the cover CTA no longer flanks itself with keys; the
// unified tap-title design carries the visual cue instead.
function mainCTA(label, onClick) {
  const a = document.createElement('button');
  a.className = 'main-cta tap-title is-cta';
  // No .cta-text class on the inner span — there are several legacy
  // .main-cta .cta-text rules in the stylesheet that force italic
  // EB-Garamond + their own colour.  The unified .tap-title look
  // requires the span to stay plain .tt-text.
  a.innerHTML = `
    <span class="tt-glyph">❦</span>
    <span class="tt-text">${escapeHtml(label)}</span>
    <span class="tt-glyph">❦</span>
  `;
  a.addEventListener('click', () => {
    if (a.classList.contains('is-engaged')) return;
    LanBGM.unlock();
    a.classList.add('is-engaged');
    SFX.bling();
    setTimeout(() => onClick && onClick(), 700);
  });
  return a;
}
// "next stage / next chapter" — text-with-rules button (no keys, no pill).
// Passing { confirm: true } wraps the click in the "are you ready" modal,
// which is how every stage→stage transition should behave so the BGM swap
// has a clean handoff moment.
// v=41 — nextDoor wears the SAME tap-title.is-cta dress as the cover's
// "Tonight's Reading" so each stage transition reads as "turning to
// the next page of the storybook".  Label: "Next Page" between stages
// of one chapter, "Next Chapter" between chapters (cover-bound).
function nextDoor(label, onClick, { confirm = false } = {}) {
  const a = document.createElement('button');
  a.className = 'next-door tap-title is-cta';
  a.innerHTML = `
    <span class="tt-glyph">❦</span>
    <span class="tt-text">${escapeHtml(label)}</span>
    <span class="tt-glyph">❦</span>
  `;
  a.addEventListener('click', () => {
    if (a.classList.contains('is-engaged')) return;
    LanBGM.unlock();
    a.classList.add('is-engaged');
    SFX.tap();
    if (confirm) {
      confirmReady(label, () => { onClick && onClick(); });
      setTimeout(() => a.classList.remove('is-engaged'), 900);
    } else {
      setTimeout(() => {
        onClick && onClick();
        a.classList.remove('is-engaged');
      }, 320);
    }
  });
  return a;
}
// Top-right "close the page" star — the universal way home.  Visible
// on every screen except the cover itself.  On in-game screens we pop
// the leave-confirm modal first so the user doesn't kill their stage
// by accident.
//
// MOUNTING: position:fixed escapes the parent's layout box but NOT its
// stacking context.  #app is z-index:1 + position:relative, which
// traps any z-index inside it below #banner-top (z:200).  So this
// function mounts the star directly to <body> and returns a sentinel
// DocumentFragment — callers can still do `el.appendChild(closeCorner(...))`
// without disturbing the body-mounted star.
function closeCorner({ confirm = false, to = 'cover', label = 'close the page' } = {}) {
  const b = document.createElement('button');
  b.className = 'close-corner corner-pin is-corner-floater';
  b.setAttribute('aria-label', label);
  b.innerHTML = '<span class="cp-x"></span>';
  b.addEventListener('click', () => {
    SFX.tap();
    const exit = () => { LanBGM.stop(); go(to); };
    if (confirm) confirmLeave(exit);
    else exit();
  });
  // Sweep any leftover star from the previous screen, then mount on body.
  document.querySelectorAll('.is-corner-floater').forEach(n => n.remove());
  document.body.appendChild(b);
  // Sentinel: callers do `el.appendChild(closeCorner(...))`; returning
  // an empty fragment makes that a no-op without breaking the pattern.
  return document.createDocumentFragment();
}
// Top-left moon button — opens the side-drawer of "her words".
// The drawer is an OVERLAY (not navigation), so no leave-confirm
// is needed — picking a word from it is the user's explicit action.
function moonCorner() {
  const b = document.createElement('button');
  b.className = 'moon-corner corner-pin';
  b.setAttribute('aria-label', 'back to cover');
  // Three-bar menu drawn in CSS via .mc-bar + two box-shadows — no
  // PNG, no unicode glyph that might tofu on iOS.
  b.innerHTML = '<span class="mc-bar"></span>';
  b.addEventListener('click', () => {
    SFX.tap();
    // From a game stage, stop game music; from the cover side, the
    // continuous home pool keeps playing thanks to LanBGM's
    // same-pool short-circuit.
    const inGame = /^stage\d/.test(state.screen || '');
    if (inGame) LanBGM.stop();
    transitionTo('cover');
  });
  return b;
}

/* ---------- SIDE DRAWER ("her words")  ----------
   Single global instance, lazy-built on first open.  Holds:
     - a counter of awakened / total words
     - a live-filter search input
     - the "still waking" list (everything not yet learned)
   Tapping any word closes the drawer and jumps to that word's card.   */
/* The sidebar drawer is gone — the user said it was ugly, the
   counter inside was stale (50 vs the real 300+ words), and they
   preferred deleting over rebuilding it.  The moon corner button
   now does what the user wanted: back to cover.                  */
// "Are you sure?" — close-the-book confirmation, shown when the user
// tries to exit a stage mid-way.  Closing forfeits the current page.
function confirmLeave(onLeave) {
  showModal({
    title: 'close the book for now?',
    body: `the page won't remember you tonight.`,
    actions: [
      { label: 'stay a little' },                                  // primary (close modal)
      { label: 'yes, leave the page', variant: 'ghost', onClick: onLeave }
    ]
  });
}

/* "are you ready" — the transition modal before each next-stage.
   Confirming triggers a deliberate moment: bling SFX + BGM swap is
   started by the caller's onReady, then we travel to the next page.
   "a little longer" simply closes the modal so the user can keep
   reviewing.                                                       */
function confirmReady(stageNameAwaits, onReady) {
  showModal({
    title:    `${stageNameAwaits} awaits`,
    body:     `have you learned what you need to?`,
    variant:  'ready',
    actions: [
      { label: `I'm ready ♡`, variant: 'primary', onClick: () => { SFX.bling(); onReady(); } },
      { label: 'a little longer', variant: 'ghost' }
    ]
  });
}

/* ------------------------------------------------------------
   7. SHARED PARTS — title strip, stage header, star sprinkles
   ------------------------------------------------------------ */
function titleStrip() {
  return `
    <div class="book-header">
      <h1 class="book-title">Her Little Lexicon</h1>
      <div class="book-subtitle"><span class="sp">words come softly, when she calls them</span></div>
    </div>
  `;
}
function stageHeader(stageN, name) {
  // v=63: header now shows the PERSISTED chapter counter (saved.chapter)
  // on the top line and the stage's painted name (The Matching / The
  // Reading / The Inscription) underneath, with a small "Stage N of 3"
  // chip so the user knows where they are inside the current chapter.
  return `
    <div class="frame-chapter">
      <div class="frame-chapter-text">
        <span class="fc-num">Chapter · ${saved.chapter}</span>
        <span class="fc-name">${escapeHtml(name)}</span>
        <span class="fc-stage">Stage ${stageN} of 3</span>
      </div>
    </div>
  `;
}

// scoreBlock — the user-designed "two-piece" combo for result pages:
// chapter band on top, painted score frame underneath (same asset as
// the storybook modal, used inline).  The frame already paints the
// crescent moon + bow garland; CSS positions the score inside its
// safe-zone.
function scoreBlock(chapterN, name, value, total, message) {
  return `
    ${stageHeader(chapterN, name)}
    <div class="score-frame">
      <div class="score-frame-inner">
        <div class="sf-label">Score</div>
        <div class="sf-value">${value}<small> / ${total}</small></div>
        <div class="sf-message">${escapeHtml(message || '')}</div>
      </div>
    </div>
  `;
}

// renderWordTile — compact "wine-card" tile, used on stage 2 + 3
// result pages instead of the bulky ex-card.  Visual language is
// borrowed from the multiple-choice picked-red option card so the
// chapters speak one tile vocabulary.  Tap → parchment.
function renderWordTile(word, mark) {
  const c = PARCHMENT_CARDS[word] || { h: word };
  const tile = document.createElement('button');
  // .card.card--option carries the cardstock + frame; .picked-right
  // adds the wine palette + gold halo; .is-wrong dims it so the user
  // can scan correct vs. missed at a glance.
  const state = mark === true ? 'picked-right reveal-right'
              : mark === false ? 'picked-wrong'
              : '';
  tile.className = `card card--option word-tile ${state}`.trim();
  tile.innerHTML = `
    <span class="mc-frame"></span>
    <span class="mc-text">${escapeHtml(c.h)}</span>
  `;
  tile.addEventListener('click', () => {
    SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
    showParchment(word);
  });
  return tile;
}

// v=57 — renderReviewCard: an EXPANDED study card for stage-3
// result.  Shows headword + pos.zh + example sentence + family +
// friend + kin in inline rows, no taps needed.  User scrolls down
// the result page to review every word touched in the chapter.
function renderReviewCard(word) {
  const c = PARCHMENT_CARDS[word];
  const card = document.createElement('div');
  card.className = 'review-card';
  if (!c) { card.textContent = word; return card; }
  // Reuse the same in-line linkify so jumpable words are
  // underlined inside the example sentence + collocations.
  const selfLower = (c.h || '').toLowerCase();
  const linkify = (text) => {
    if (!text) return '';
    return escapeHtml(text).replace(/\b([A-Za-z][A-Za-z'\-]+)\b/g, (m, w) => {
      const k = w.toLowerCase();
      if (k === selfLower) return m;
      if (!PARCHMENT_CARDS[k]) return m;
      return `<a class="rev-jump" data-jump="${escapeAttr(k)}">${m}</a>`;
    });
  };
  const lineRow = (variant, phrase, zh) =>
    `<div class="rev-line">
       <span class="rev-line-word">${linkify(variant)}</span>
       ${phrase ? `<span class="rev-line-phrase">${linkify(phrase)}</span>` : ''}
       <span class="rev-line-zh">${escapeHtml(zh || '')}</span>
     </div>`;

  let html = `
    <div class="rev-head">
      <span class="rev-word">${escapeHtml(c.h)}</span>
      <span class="rev-pos">${escapeHtml((c.pos || '').slice(0, 4))}.</span>
      <span class="rev-zh">${escapeHtml(c.zh || '')}</span>
    </div>`;
  if (c.example) {
    html += `<div class="rev-example">${linkify(c.example)}</div>`;
    if (c.example_zh) html += `<div class="rev-example-zh">${escapeHtml(c.example_zh)}</div>`;
  }
  if (c.family && c.family.length) {
    html += `<div class="rev-section-label">her family</div>`;
    c.family.forEach(line => {
      const [w, posZh, phrase, phraseZh] = line.split('|').map(s => s ? s.trim() : '');
      html += lineRow(w, phrase, phraseZh || posZh);
    });
  }
  if (c.friends && c.friends.length) {
    html += `<div class="rev-section-label">her friend</div>`;
    c.friends.forEach(line => {
      const [phrase, zh] = line.split('|').map(s => s ? s.trim() : '');
      html += `<div class="rev-line">
        <span class="rev-line-phrase">${linkify(phrase)}</span>
        <span class="rev-line-zh">${escapeHtml(zh || '')}</span>
      </div>`;
    });
  }
  if (c.kin && c.kin.length) {
    html += `<div class="rev-section-label">her kin</div>`;
    c.kin.forEach(line => {
      const [w, posZh, phrase, phraseZh] = line.split('|').map(s => s ? s.trim() : '');
      html += lineRow(w, phrase, phraseZh || posZh);
    });
  }
  card.innerHTML = html;
  card.querySelectorAll('.rev-jump').forEach(a => {
    a.addEventListener('click', e => {
      e.stopPropagation();
      const target = a.getAttribute('data-jump');
      if (PARCHMENT_CARDS[target]) {
        SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
        showParchment(target);
      }
    });
  });
  return card;
}

// Encouragement copy keyed to the percentage — keeps the storybook
// voice (lowercase italics, gentle).  Never punishing on low scores.
function encouragement(pct) {
  if (pct >= 0.99) return 'every page sang back ♡';
  if (pct >= 0.75) return 'beautifully read';
  if (pct >= 0.50) return 'not bad at all ~ ♡';
  if (pct >= 0.25) return 'a softer page next time';
  return 'her book waits patiently';
}

// Title plaque-only fragment.  The text lives inside an inner span
// that we position absolutely so it lands in the dome's purple band
// regardless of how tall the plaque rectangle is.
function pageTitle(name) {
  const html = escapeHtml(name).replace(/\n/g, '<br>');
  return `<div class="title-plaque"><span class="tp-text">${html}</span></div>`;
}
// Visual writing-line at the bottom of the single-word parchment.
// NOT an input — pure cue that says "copy this word once".
function copyLine() {
  return `
    <div class="copy-line">
      <span class="cl-label">copy this word softly</span>
      <span class="cl-rule"></span>
      <span class="cl-mark">✦</span>
    </div>
  `;
}
// Tap-handler for collection-page tiles: nudge the tile (~8° wobble) +
// page-turn SFX, then OPEN the parchment popup (not full-screen page).
function flipToCard(tile, word, from) {
  if (tile.classList.contains('is-flipping')) return;
  tile.classList.add('is-flipping');
  SFX.pageTurn();
  setTimeout(() => {
    tile.classList.remove('is-flipping');
    showParchment(word);
  }, 340);
}

// Parchment popup — a scroll-shaped modal that floats over the
// current page.  Text is strictly fenced inside .parchment-inner
// (sized to the cream paper's safe zone via padding on .parchment-card),
// so no glyph ever lands on a scroll roll or quill decoration.
let _activeParchment = null;
function showParchment(word) {
  if (_activeParchment) closeParchment();
  const c = PARCHMENT_CARDS[word];
  if (!c) return;

  const inNote = !!(saved.notes && saved.notes[word]);
  const veil = document.createElement('div');
  veil.className = 'parchment-veil';
  veil.innerHTML = `
    <div class="parchment-card">
      <div class="parchment-inner">
        <button class="pc-close" aria-label="fold this page">fold this page</button>
        <div class="pc-stack"></div>
        <div class="pc-copy">
          <span class="pc-copy-label">signed</span>
          <input class="pc-copy-input" type="text"
                 autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
                 placeholder="${escapeAttr(c.h)}">
          <span class="pc-copy-mark">✦</span>
        </div>
        <div class="pc-tap-hint">— tap the page —</div>
      </div>
      <!-- v=56 — note button anchored to .parchment-card directly
           so its bottom % maps to the painted star-in-circle's
           position on the asset (not the inner padded box).      -->
      <button class="pc-note-add ${inNote ? 'is-saved' : ''}" aria-label="add to her note" title="add to her note">
        <span class="pc-note-star">✦</span>
      </button>
    </div>
  `;
  const stack = veil.querySelector('.pc-stack');

  // Build the content as an array of HTML strings.  The headword
  // shows immediately; every other item starts STAGED (hidden)
  // and reveals one-by-one on tap.
  const items = [];

  items.push({ kind: 'head', html: `
    <div class="pc-head" data-sp="${escapeAttr(c.h)}">
      <button class="pc-play" aria-label="play">♪</button>
      <span class="pc-word">${escapeHtml(c.h)}</span>
      <span class="pc-pos">${escapeHtml((c.pos || '').slice(0, 4))}.</span>
      <span class="pc-zh">${escapeHtml(c.zh || '')}</span>
    </div>` });

  // v=52 — inline jump-link helper.  Wherever a word appears in the
  // parchment text AND that word exists in PARCHMENT_CARDS, render
  // it as an underlined tappable token.  Skip the headword itself
  // (don't link a page to itself).  Underline = jumpable; plain
  // text = not jumpable.  Replaces the v=51 bottom jump-link box.
  const _selfWord = (c.h || '').toLowerCase();
  function pcLinkify(text) {
    if (!text) return '';
    // First escape everything, then rewrap matched words.  We MUST do
    // this in two passes so the underline span survives escape().
    const escaped = escapeHtml(text);
    return escaped.replace(/\b([A-Za-z][A-Za-z'\-]+)\b/g, (m, w) => {
      const k = w.toLowerCase();
      if (k === _selfWord) return m;            // don't link to self
      if (!PARCHMENT_CARDS[k]) return m;        // no parchment → no link
      return `<a class="pc-jump" data-jump="${escapeAttr(k)}">${m}</a>`;
    });
  }

  if (c.family && c.family.length) {
    items.push({ kind: 'rule', html: `<hr class="pc-rule">` });
    items.push({ kind: 'label', html: `<div class="pc-section-label">her family</div>` });
    c.family.forEach(line => {
      const [w, posZh, phrase, phraseZh] = line.split('|').map(s => s ? s.trim() : '');
      const audioTarget = phrase || w;
      items.push({ kind: 'fam', html: `<div class="pc-line pc-play-row" data-sp="${escapeAttr(audioTarget)}">
        <button class="pc-play">♪</button>
        <span class="pc-line-word">${pcLinkify(w)}</span>
        ${phrase ? `<span class="pc-line-phrase">${pcLinkify(phrase)}</span>` : ''}
        <span class="pc-line-zh">${escapeHtml(phraseZh || posZh || '')}</span>
      </div>` });
    });
  }

  if ((c.friends && c.friends.length) || c.example) {
    items.push({ kind: 'rule', html: `<hr class="pc-rule">` });
    items.push({ kind: 'label', html: `<div class="pc-section-label">her friend</div>` });
    (c.friends || []).forEach(line => {
      const [phrase, zh] = line.split('|').map(s => s.trim());
      items.push({ kind: 'colloc', html: `<div class="pc-line pc-play-row" data-sp="${escapeAttr(phrase)}">
        <button class="pc-play">♪</button>
        <span class="pc-line-phrase">${pcLinkify(phrase)}</span>
        <span class="pc-line-zh">${escapeHtml(zh || '')}</span>
      </div>` });
    });
    if (c.example) {
      items.push({ kind: 'example', html: `<div class="pc-play-row pc-ex-row" data-sp="${escapeAttr(c.example)}">
        <button class="pc-play">♪</button>
        <span class="pc-play-phrase pc-ex-en">${pcLinkify(c.example)}</span>
      </div>
      ${c.example_zh ? `<div class="pc-ex-zh">${escapeHtml(c.example_zh)}</div>` : ''}` });
    }
  }

  // HER KIN — words that share the same root / morpheme.
  if (c.kin && c.kin.length) {
    items.push({ kind: 'rule', html: `<hr class="pc-rule">` });
    items.push({ kind: 'label', html: `<div class="pc-section-label">her kin</div>` });
    c.kin.forEach(line => {
      const [w, posZh, phrase, phraseZh] = line.split('|').map(s => s ? s.trim() : '');
      const audioTarget = phrase || w;
      items.push({ kind: 'kin', html: `<div class="pc-line pc-play-row" data-sp="${escapeAttr(audioTarget)}">
        <button class="pc-play">♪</button>
        <span class="pc-line-word">${pcLinkify(w)}</span>
        ${phrase ? `<span class="pc-line-phrase">${pcLinkify(phrase)}</span>` : ''}
        <span class="pc-line-zh">${escapeHtml(phraseZh || posZh || '')}</span>
      </div>` });
    });
  }

  // v=52 — bottom "↪ family pages / partner / kin pages" boxes
  // RETIRED per user.  Jump links now live inline as underlined
  // words inside the family / friend / kin / example rows above,
  // saving vertical space and reading more like a handwritten note.

  // Stage every item.  The headword reveals after the flip-in.
  // Section labels + rules reveal automatically with the next
  // content item so the user doesn't waste taps on dividers.
  const nodes = items.map((it, i) => {
    const node = document.createElement('div');
    node.className = 'pc-item is-staged pc-kind-' + it.kind;
    node.innerHTML = it.html;
    stack.appendChild(node);
    return node;
  });

  // Reveal the headword immediately and auto-play it after the
  // page-flip-in animation lands (≈ 0.55 s).
  setTimeout(() => {
    nodes[0].classList.remove('is-staged');
    nodes[0].classList.add('is-revealed');
    speak(c.h);
  }, 600);

  // Tap-to-advance.  Any tap on the parchment-card (except the close
  // button) reveals the next chunk.  A "chunk" is a content row PLUS
  // any rule + section-label that sits immediately before it, so the
  // user doesn't have to tap empty dividers separately.
  let revealIdx = 1;
  function advanceReveal() {
    if (revealIdx >= nodes.length) return false;
    // Reveal everything from revealIdx until the next "content" kind
    // (head/fam/colloc/example) inclusive.  Rules + labels are taken
    // along for the ride.
    while (revealIdx < nodes.length) {
      const it = items[revealIdx];
      nodes[revealIdx].classList.remove('is-staged');
      nodes[revealIdx].classList.add('is-revealed');
      const isContent = it.kind === 'fam' || it.kind === 'colloc' || it.kind === 'example' || it.kind === 'kin' || it.kind === 'neighbor';
      revealIdx++;
      if (isContent) break;
    }
    // Find the most recently revealed content row + play its audio.
    const lastContent = [...nodes].slice(0, revealIdx).reverse()
      .find(n => n.classList.contains('pc-kind-fam')
              || n.classList.contains('pc-kind-colloc')
              || n.classList.contains('pc-kind-example')
              || n.classList.contains('pc-kind-kin'));
    if (lastContent) {
      const sp = lastContent.getAttribute('data-sp')
              || lastContent.querySelector('[data-sp]')?.getAttribute('data-sp');
      // Mark the play row visually + play audio.
      const playRow = lastContent.querySelector('.pc-play-row') || lastContent;
      veil.querySelectorAll('.is-playing').forEach(n => n.classList.remove('is-playing'));
      playRow.classList.add('is-playing');
      if (sp) speak(sp);
    }
    SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
    // Hide the "tap the page" hint once the user starts tapping.
    veil.querySelector('.pc-tap-hint')?.classList.add('is-gone');
    // Auto-scroll the newly-revealed row into view — content past
    // the parchment safe-zone (long families + neighbor) should
    // never need a manual scroll.
    const justRevealed = nodes[revealIdx - 1];
    if (justRevealed) {
      requestAnimationFrame(() => justRevealed.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
    return revealIdx < nodes.length;
  }
  veil.querySelector('.parchment-card').addEventListener('click', e => {
    // ignore taps on close button + individual ♪ play buttons
    if (e.target.closest('.pc-close')) return;
    if (e.target.closest('.pc-play')) return;
    advanceReveal();
  });
  // v=64 — tapping the veil OUTSIDE the card closes the parchment
  // (user kept tapping the dark area expecting it to fold).
  veil.addEventListener('click', e => {
    if (e.target === veil) {
      e.stopPropagation();
      closeParchment();
    }
  });

  // Individual ♪ buttons still re-play their own audio without
  // advancing the reveal sequence.
  function wirePlay(row) {
    const sp = row.getAttribute('data-sp');
    if (!sp) return;
    const btn = row.querySelector('.pc-play');
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      veil.querySelectorAll('.is-playing').forEach(n => n.classList.remove('is-playing'));
      row.classList.add('is-playing');
      SFX.tap();
      speak(sp);
    });
  }
  veil.querySelectorAll('.pc-play-row[data-sp], .pc-head[data-sp]').forEach(wirePlay);

  // v=52 — Inline jump-link.  Any underlined word inside the
  // parchment content (.pc-jump) closes this page and opens the
  // target's parchment in its place.  Replaces the old chip-link
  // box at the parchment bottom.
  veil.querySelectorAll('.pc-jump').forEach(a => {
    a.addEventListener('click', e => {
      e.stopPropagation();
      const target = a.getAttribute('data-jump');
      if (!target || !PARCHMENT_CARDS[target]) return;
      SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
      closeParchment();
      setTimeout(() => showParchment(target), 280);
    });
  });
  // Also leave the legacy chip handler in case any future code path
  // re-emits .pc-neighbor-link buttons.
  veil.querySelectorAll('.pc-neighbor-link').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const partner = btn.getAttribute('data-partner');
      if (!partner) return;
      SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
      closeParchment();
      setTimeout(() => showParchment(partner), 280);
    });
  });

  veil.querySelector('.pc-close').addEventListener('click', e => {
    e.stopPropagation();
    closeParchment();
  });
  // v=55 — add-to-note button.  Toggle this word in saved.notes.
  // Visual flips between "empty" and "is-saved" so the user knows
  // they bookmarked it.  Doesn't close the parchment.
  const noteBtn = veil.querySelector('.pc-note-add');
  if (noteBtn) {
    noteBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (!saved.notes) saved.notes = {};
      const w = c.h;
      if (saved.notes[w]) {
        delete saved.notes[w];
        noteBtn.classList.remove('is-saved');
      } else {
        saved.notes[w] = Date.now();
        noteBtn.classList.add('is-saved');
      }
      Store.save();
      SFX.tap();
    });
  }
  // v=55 — close on ANY click outside the .parchment-card.
  // Earlier `e.target === veil` check missed taps on the padding
  // ring inside the veil (anything that bubbled from a descendant
  // that isn't the card itself).  Now we close as long as the
  // tap didn't land inside the card.
  veil.addEventListener('click', e => {
    if (e.target.closest('.parchment-card')) return;
    closeParchment();
  });
  document.addEventListener('keydown', _onParchEsc);

  document.body.appendChild(veil);
  _activeParchment = veil;
}
function closeParchment() {
  if (!_activeParchment) return;
  const v = _activeParchment;
  v.classList.add('is-leaving');
  document.removeEventListener('keydown', _onParchEsc);
  setTimeout(() => v.remove(), 260);
  _activeParchment = null;
}
function _onParchEsc(e) { if (e.key === 'Escape') closeParchment(); }

// v=26.2 — index-style listing wrapped in the page panel (0511DE6F
// frame).  Used by both the full index and the note-bucket page so
// they share one visual.  Renders title (in the inner dome frame)
// + search input + A-Z bar + alpha-sectioned word rows.
function renderIndexLikePage(el, { title, words, backTo = 'cover', fromKey = 'index' }) {
  const groups = {};
  words.forEach(h => {
    const k = h[0].toUpperCase();
    (groups[k] = groups[k] || []).push(h);
  });
  // letters present in the word list (for the section headers below)
  const letters = Object.keys(groups).sort();
  // Always show the full A–Z so the alphabet always reads as 26
  // letters in two even rows.  Letters with no entries get a
  // muted style + no-op on click.
  const ALL_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const alphaHtml = ALL_LETTERS.map(L => {
    const has = groups[L] && groups[L].length;
    return `<a data-letter="${L}"${has ? '' : ' class="ab-disabled"'}>${L}</a>`;
  }).join('');
  el.innerHTML = `
    <div class="nav-shield"></div>
    <div class="nav-card">
      ${pageTitle(title)}
      <div class="alpha-bar">${alphaHtml}</div>
      <input class="index-search" type="text" placeholder="SEARCH WORDS…" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
    </div>
    <div class="word-list" id="word-list-${fromKey}">
      ${words.length ? '' : `<div class="note-empty">no words yet · the page is still pristine</div>`}
    </div>
  `;
  // Top-right star — the universal "back to cover" affordance.  We
  // used to also stamp a top-left moon-corner here, but the user
  // wants ONLY the right-corner star (one anchor per page).
  el.appendChild(closeCorner({ to: backTo }));

  $$('.alpha-bar a', el).forEach(a => {
    a.addEventListener('click', () => {
      const L = a.getAttribute('data-letter');
      const target = $(`#letter-${L}-${fromKey}`, el);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const body = $(`#word-list-${fromKey}`, el);
  letters.forEach(L => {
    body.insertAdjacentHTML('beforeend',
      `<div class="alpha-section-title" id="letter-${L}-${fromKey}">${L}</div>`);
    groups[L].forEach(h => {
      const c = PARCHMENT_CARDS[h];
      const row = document.createElement('div');
      row.className = 'word-row';
      row.dataset.word = c.h.toLowerCase();
      row.dataset.zh = (c.zh || '').toLowerCase();
      row.innerHTML = `
        <span class="wr-word">${escapeHtml(c.h)}</span>
        <span class="wr-pos">${escapeHtml(c.pos || '')}</span>
        <span class="wr-leader" aria-hidden="true"></span>
        <span class="wr-zh">${escapeHtml(c.zh || '')}</span>
      `;
      row.addEventListener('click', () => flipToCard(row, h, fromKey));
      body.appendChild(row);
    });
  });

  $('.index-search', el).addEventListener('input', e => {
    const q = (e.target.value || '').toLowerCase().trim();
    $$('.word-row', el).forEach(row => {
      const hit = !q ||
        row.dataset.word.includes(q) ||
        row.dataset.zh.includes(q);
      row.style.display = hit ? '' : 'none';
    });
    $$('.alpha-section-title', el).forEach(h => {
      let n = h.nextElementSibling, alive = false;
      while (n && !n.classList.contains('alpha-section-title')) {
        if (n.style.display !== 'none') { alive = true; break; }
        n = n.nextElementSibling;
      }
      h.style.display = alive ? '' : 'none';
    });
  });
}

function sprinkleStars(container, count = 18) {
  if (!container || container.querySelector('.deco-stars')) return;
  const wrap = document.createElement('div');
  wrap.className = 'deco-stars';
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 's';
    // No text content — the sparkle is the PNG background.  Sizing the
    // box (not the font) is what actually makes the image visible.
    const sz = 8 + Math.floor(Math.random() * 12);    // 8–19 px
    s.style.top    = (Math.random() * 92) + '%';
    s.style.left   = (Math.random() * 96) + '%';
    s.style.width  = sz + 'px';
    s.style.height = sz + 'px';
    s.style.animationDelay = (Math.random() * 4) + 's';
    wrap.appendChild(s);
  }
  container.prepend(wrap);
}

/* ------------------------------------------------------------
   8. VOCAB CARD ("ex-card") renderer
   Shared by stage results, note, index detail view.
   classes here mirror the old aesthetic but are reusable.
   ------------------------------------------------------------ */
/* renderExCard — the study card, with the v21 progressive-reveal
   mechanic.  Initial view shows only what doesn't spoil the lesson:
   the headword, the family heads (with their pos+chinese), and the
   "her friend" / example sections as veiled placeholders.  Tapping
   a piece reveals it AND auto-plays its audio once — the forced
   learning beat.  The per-segment ♪ buttons replay without touching
   the reveal state.                                                   */
function renderExCard(headWord, mark = null, { rewrite = false, withControls = true } = {}) {
  const c = PARCHMENT_CARDS[headWord];
  if (!c) {
    const x = document.createElement('div');
    x.className = 'ex-card';
    x.textContent = headWord;
    return x;
  }
  const box = document.createElement('div');
  box.className = 'ex-card'
    + (mark === true ? ' is-correct' : mark === false ? ' is-wrong' : '');

  // The reveal queue — items unfold in order on each tap of the card.
  // Tap anywhere on .ex-card (except on a ♪ button / neighbour link /
  // close pill / input) → shift the first item out, drop its is-veiled
  // class, speak its audio.
  const queue = [];

  if (withControls) {
    box.insertAdjacentHTML('beforeend', `<button class="ex-card-close">close the page</button>`);
    box.querySelector('.ex-card-close').addEventListener('click', e => {
      e.stopPropagation();
      SFX.tap();
      const from = (state._cardFrom && state._cardFrom !== 'card') ? state._cardFrom : 'cover';
      go(from);
    });
  }

  /* HEAD — always visible.  Headword + chinese on one row. */
  const head = document.createElement('div');
  head.className = 'ex-head';
  head.innerHTML = `
    <button class="ex-speak ex-speak-head" data-sp="${escapeAttr(c.h)}" aria-label="play">♪</button>
    <span class="ex-headword">${escapeHtml(c.h)}</span>
    <span class="ex-pos">${escapeHtml((c.pos || '').slice(0, 3))}.</span>
    <span class="ex-headword-zh">${escapeHtml(c.zh || '')}</span>
  `;
  box.appendChild(head);

  /* HER FAMILY — heads always visible, each collocation is its own
     queued reveal.                                                   */
  if (c.family && c.family.length) {
    const fam = document.createElement('div');
    fam.className = 'ex-section ex-family';
    fam.innerHTML = `<div class="ex-label">her family</div>`;
    c.family.forEach(line => {
      const [w, pos, ex, ezh] = line.split('|').map(s => s.trim());
      const row = document.createElement('div');
      row.className = 'fam-row';
      row.innerHTML = `
        <div class="fam-head">
          <span class="fam-word">${escapeHtml(w)}</span>
          <span class="fam-pos">${escapeHtml(pos)}</span>
        </div>
        <div class="fam-reveal is-veiled">
          <button class="ex-speak" data-sp="${escapeAttr(ex || '')}" aria-label="play">♪</button>
          <span class="fam-ex">${escapeHtml(ex || '')}</span>
          <span class="fam-ex-zh">${escapeHtml(ezh || '')}</span>
        </div>
      `;
      fam.appendChild(row);
      if (ex) queue.push({ el: row.querySelector('.fam-reveal'), audio: ex });
    });
    box.appendChild(fam);
  }

  const div1 = document.createElement('div');
  div1.className = 'ex-divider';
  box.appendChild(div1);

  /* HER FRIEND — section label always visible, every collocation row
     is queued individually so each tap reveals + speaks ONE colloc.  */
  if (c.friends && c.friends.length) {
    const fr = document.createElement('div');
    fr.className = 'ex-section ex-friend';
    fr.innerHTML = `<div class="ex-label">her friend</div>`;
    c.friends.forEach(line => {
      const [phrase, zh] = line.split('|').map(s => s.trim());
      const row = document.createElement('div');
      row.className = 'colloc-row is-veiled';
      row.innerHTML = `
        <button class="ex-speak" data-sp="${escapeAttr(phrase)}" aria-label="play">♪</button>
        <span class="colloc-en">${escapeHtml(phrase)}</span>
        <span class="colloc-zh">${escapeHtml(zh || '')}</span>
      `;
      fr.appendChild(row);
      queue.push({ el: row, audio: phrase });
    });
    box.appendChild(fr);
  }

  const div2 = document.createElement('div');
  div2.className = 'ex-divider';
  box.appendChild(div2);

  /* EXAMPLE — the full sentence sits at the end of the queue.        */
  if (c.example) {
    const ex = document.createElement('div');
    ex.className = 'ex-section ex-example is-veiled';
    ex.innerHTML = `
      <button class="ex-speak" data-sp="${escapeAttr(c.example)}" aria-label="play">♪</button>
      <div class="ex-example-text">
        <div class="ex-example-en">${escapeHtml(c.example)}</div>
        <div class="ex-example-zh">${escapeHtml(c.example_zh || '')}</div>
      </div>
    `;
    box.appendChild(ex);
    queue.push({ el: ex, audio: c.example });
  }

  /* HER NEIGHBOR — first synonym from PARCHMENT_JUMP_LINKS (v=51).
     ex-card is the legacy stand-alone study card; we only show
     the first synonym so the card stays compact.                 */
  const _jumpsForEx = PARCHMENT_JUMP_LINKS[headWord] || {};
  const _firstPartner = (_jumpsForEx.synonym_links || []).find(w => PARCHMENT_CARDS[w]);
  if (_firstPartner) {
    const nb = document.createElement('div');
    nb.className = 'ex-section ex-neighbor';
    nb.innerHTML = `<span class="ex-label">her neighbor</span>
                    <button class="ex-neighbor-link">${escapeHtml(_firstPartner)}</button>`;
    nb.querySelector('.ex-neighbor-link').addEventListener('click', e => {
      e.stopPropagation();
      SFX.pageTurn();
      go('card', { word: _firstPartner, from: state.screen === 'card' ? (state._cardFrom || 'cover') : state.screen });
    });
    box.appendChild(nb);
  }

  if (rewrite) {
    const rw = document.createElement('div');
    rw.className = 'ex-rewrite';
    rw.innerHTML = `<div class="ex-rewrite-label">copy once</div>
                    <input type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${escapeAttr(c.h)}">`;
    box.appendChild(rw);
  }

  /* The tap hint — visible while the queue still has items. */
  const tapHint = document.createElement('div');
  tapHint.className = 'ex-tap-hint';
  tapHint.textContent = '— tap to reveal more —';
  box.appendChild(tapHint);
  if (queue.length === 0) tapHint.style.display = 'none';

  if (withControls) {
    box.insertAdjacentHTML('beforeend', `<button class="ex-card-fold">fold this page</button>`);
    box.querySelector('.ex-card-fold').addEventListener('click', e => {
      e.stopPropagation();
      SFX.tap();
      // Re-veil every reveal target AND rebuild the queue from scratch.
      queue.length = 0;
      box.querySelectorAll('.fam-reveal').forEach((rv, i) => {
        rv.classList.add('is-veiled');
        const audio = rv.querySelector('.fam-ex')?.textContent || '';
        if (audio) queue.push({ el: rv, audio });
      });
      box.querySelectorAll('.colloc-row').forEach(row => {
        row.classList.add('is-veiled');
        const audio = row.querySelector('.colloc-en')?.textContent || '';
        queue.push({ el: row, audio });
      });
      const exNode = box.querySelector('.ex-example');
      if (exNode) {
        exNode.classList.add('is-veiled');
        const audio = exNode.querySelector('.ex-example-en')?.textContent || '';
        queue.push({ el: exNode, audio });
      }
      tapHint.textContent = '— tap to reveal more —';
      tapHint.style.display = '';
      tapHint.style.opacity = '';
    });
  }

  /* Per-segment ♪ play buttons replay one piece of audio without
     touching the reveal queue.  e.stopPropagation prevents the
     card-wide click from also firing on the same tap.                */
  box.querySelectorAll('.ex-speak').forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();
      const sp = b.getAttribute('data-sp');
      if (sp) speak(sp);
    });
  });

  /* THE CARD-WIDE LINEAR REVEAL — tap anywhere on .ex-card and the
     next item in the queue unfolds with its audio.                   */
  box.addEventListener('click', e => {
    if (e.target.closest('.ex-speak, .ex-neighbor-link, .ex-card-close, .ex-card-fold, .ex-rewrite, input, button')) return;
    if (queue.length === 0) return;
    const next = queue.shift();
    next.el.classList.remove('is-veiled');
    SFX.pageTurn();
    if (next.audio) speak(next.audio);
    if (queue.length === 0) {
      tapHint.textContent = '— page complete —';
      tapHint.style.opacity = '.45';
    }
  });

  return box;
}

/* ------------------------------------------------------------
   9. ORACLE QUESTION BUILDER — Chinese options
   ------------------------------------------------------------ */
function buildOracleQuestion(word) {
  const c = PARCHMENT_CARDS[word];
  const sentence = c.example || c.h;
  // Cloze: keep the first letter, blank the rest.  "abrupt" → "a______"
  const first  = c.h[0];
  // Use non-breaking spaces, not literal underscores — the CSS
  // border-bottom on .q-blank draws the single clean line.  The
  // old version emitted "a______" which clashed with the
  // border-bottom and read as two stacked underlines.
  const blanks = ' '.repeat(Math.max(5, c.h.length - 1));
  const blanked = `${first}${blanks}`;
  const sentenceHL = sentence.replace(
    new RegExp(`\\b${c.h}\\b`, 'i'),
    `<em class="q-blank">${blanked}</em>`
  );
  // 3 distractors that ALSO start with the same letter — the lesson
  // is "tell apart the words that share the first letter".
  const sameLetter = Object.keys(PARCHMENT_CARDS).filter(k =>
    k !== word && k[0].toLowerCase() === first.toLowerCase()
  );
  const wrongs = [];
  while (wrongs.length < 3 && sameLetter.length) {
    const cand = rand(sameLetter);
    if (!wrongs.includes(cand)) wrongs.push(cand);
  }
  // Fall back to random heads if there aren't 3 same-letter siblings.
  if (wrongs.length < 3) {
    const fallback = Object.keys(PARCHMENT_CARDS).filter(k => k !== word && !wrongs.includes(k));
    while (wrongs.length < 3 && fallback.length) {
      const cand = rand(fallback);
      if (!wrongs.includes(cand)) wrongs.push(cand);
    }
  }
  const options = shuffle([word, ...wrongs]);
  return { word, sentencePlain: sentence, sentenceHL, options, correctIdx: options.indexOf(word) };
}

/* ------------------------------------------------------------
   10. MODAL
   ------------------------------------------------------------ */
function showModal({ title, body = '', score = null, actions = [], variant = '' }) {
  const veil = $('#modal');
  const cls = 'modal-card' + (variant ? ` is-${variant}` : '');
  // v=37 modal — uses the painted PNG frame (modal-frame.png).  The
  // moon ornament + pink bow + gold floral borders are all baked
  // into the asset, so the markup is just the text content +
  // actions; the CSS sizes the container to the frame's aspect.
  veil.innerHTML = `
    <div class="${cls}">
      <div class="modal-inner">
        <div class="modal-title">${escapeHtml(title)}</div>
        ${body  ? `<div class="modal-body">${escapeHtml(body)}</div>` : ''}
        ${score ? `<div class="modal-score">${score.value}<small> / ${score.total}</small></div>` : ''}
        <div class="modal-actions"></div>
      </div>
    </div>
  `;
  const ar = $('.modal-actions', veil);
  actions.forEach(a => {
    ar.appendChild(btn(a.label, () => { hideModal(); a.onClick && a.onClick(); }, { variant: a.variant || '' }));
  });
  // Score-aware entrance chime — perfect / good / so-so / low.  Falls
  // back to the old "pop" if no score is supplied (leave-confirm modals).
  if (score && typeof score.value === 'number' && typeof score.total === 'number') {
    const pct = score.value / Math.max(1, score.total);
    if      (pct >= 0.99) SFX.scorePerfect();
    else if (pct >= 0.75) SFX.scoreGood();
    else if (pct >= 0.40) SFX.scoreOk();
    else                  SFX.scoreLow();
  } else {
    SFX.pop();
  }
  veil.classList.add('show');
}
function hideModal() { $('#modal').classList.remove('show'); }

/* ============================================================
   11. SCREENS
   ============================================================ */
const Screens = {

  /* ---------- COVER (the hub) ----------
     Plain reveal — content is visible immediately.  BGM unlocks on
     the FIRST real click on the page (the "Tonight's Reading" tap or
     either of the cover-side links), which is the Safari-safe spot
     to do it.  The moon-corner button isn't shown here because the
     cover IS the hub; the two cover-side links live in the layout.  */
  cover: {
    onEnter() {
      const el = $('#screen-cover');
      el.innerHTML = '';

      // v=63 — chapter counter persists across sessions.  The CTA
      // is always "Continue Reading" — it picks up at whatever
      // chapter the user last left unfinished.  A first-time player
      // sees Chapter · 1.  Under the title we show a small italic
      // "Restart Game" link (replacing the old "X of N awakened"
      // counter), which resets the chapter counter back to 1.
      const stage = document.createElement('div');
      stage.className = 'cover-stage';
      stage.innerHTML = `
        <div class="cover-mid">
          <div id="cover-cta-slot"></div>
          <div class="cover-restart" id="cover-restart-slot"></div>
        </div>
        <div class="cover-bottom">
          <div class="lil-row" id="cover-links"></div>
        </div>
      `;
      el.appendChild(stage);

      // Continue Reading — unlocks audio + starts (or resumes) at the
      // current chapter.  Each completed run-through stage1→2→3 bumps
      // saved.chapter by one, so re-opening the page lands here on
      // the next unfinished chapter.
      const ctaLabel = 'Continue Reading';
      $('#cover-cta-slot', el).appendChild(mainCTA(ctaLabel, () => {
        LanBGM.unlock();
        const fade = document.createElement('div');
        fade.className = 'fade-out';
        document.body.appendChild(fade);
        requestAnimationFrame(() => fade.classList.add('show'));
        setTimeout(() => { LanBGM.stop(); }, 800);
        setTimeout(() => {
          freshSession();
          go('stage1');
          setTimeout(() => fade.remove(), 700);
          fade.classList.remove('show');
        }, 1000);
      }));

      // v=63 — small italic "Restart Game · Chapter N" link.  Tap →
      // confirm modal → reset chapter counter to 1.  Sits where
      // the lifetime "X of N awakened" line used to.
      const restart = document.createElement('button');
      restart.className = 'cover-restart-btn';
      restart.innerHTML = `<span class="cr-glyph">❦</span><span class="cr-text">Restart Game</span><span class="cr-chapter">Chapter · ${saved.chapter}</span>`;
      restart.addEventListener('click', () => {
        SFX.tap();
        showModal({
          title: 'Restart from Chapter One?',
          body: `Your notebook of learned words will stay. Only the chapter mark resets.`,
          actions: [
            { label: 'keep reading', variant: 'ghost', onClick: () => {} },
            { label: 'restart',       variant: '',     onClick: () => {
              resetChapterProgress();
              go('cover');
            }}
          ]
        });
      });
      $('#cover-restart-slot', el).appendChild(restart);
      // her note / the index sit in the cover's "home" pool.  The
      // smart-play inside LanBGM no-ops when the same pool is already
      // running, so the music continues uninterrupted as the user
      // hops between cover ↔ note ↔ index.
      $('#cover-links', el).appendChild(lilGhost('Her Note',  () => {
        LanBGM.unlock();
        LanBGM.playHomeRandom({ volume: 0.42 });
        transitionTo('note');
      }));
      $('#cover-links', el).appendChild(lilGhost('The Index', () => {
        LanBGM.unlock();
        LanBGM.playHomeRandom({ volume: 0.42 });
        transitionTo('index');
      }));

      // Try to start the home-pool BGM the moment the cover renders.
      // Most browsers gate audio until a user gesture; LanBGM.unlock()
      // here is a no-op without one.  Fall back to a one-shot listener
      // that arms the next click/touch to unlock + play.  The cover's
      // mainCTA already does its own unlock, so the listener mostly
      // catches users who tap the page background or a cover-link
      // first.
      LanBGM.playHomeRandom({ volume: 0.42 });
      const armUnlock = () => {
        LanBGM.unlock();
        LanBGM.playHomeRandom({ volume: 0.42 });
        document.removeEventListener('click',    armUnlock, true);
        document.removeEventListener('touchend', armUnlock, true);
      };
      document.addEventListener('click',    armUnlock, { capture: true, once: true });
      document.addEventListener('touchend', armUnlock, { capture: true, once: true });
    }
  },

  /* ---------- STAGE 1 — the matching ----------
     Layout is 4 rows × 2 columns.  The left column holds the four
     heads (in random order within the column) and the right column
     holds the four partners (also shuffled within their column).
     A "pair" can only be ONE left + ONE right of the same tag.
     If the user dyes a left card while the current tag already has
     a left card, the previous left is cleared — same with right.
     This rule is what the user asked for: 左+右 only.            */
  stage1: {
    onEnter() {
      LanBGM.playGameRandom({ volume: 0.40 });
      const el = $('#screen-stage1');
      const s = state.session;
      const pairs = s.pairs;
      // Build two shuffled columns, then interleave into row-major order:
      // shuffled[0] = row0-LEFT, [1] = row0-RIGHT, [2] = row1-LEFT, ...
      const leftCol  = shuffle(pairs.map((p, i) => ({ text: p.head,    pairId: i, side: 'L' })));
      const rightCol = shuffle(pairs.map((p, i) => ({ text: p.partner, pairId: i, side: 'R' })));
      const shuffled = [];
      for (let r = 0; r < pairs.length; r++) {
        shuffled.push(leftCol[r]);
        shuffled.push(rightCol[r]);
      }
      const tagOf = new Array(shuffled.length).fill(null);
      // (No "currentTag" — each click picks its tag fresh from the
      // actual board state so undo + re-pick can't strand orphans.)

      // Layout order:
      //   chapter title  →  confirm CTA (reachable, glowing)
      //                  →  hint line   →  4×2 grid
      // Putting the confirm button up top means thumb can reach it
      // on a mobile browser without scrolling past the URL bar.
      el.innerHTML = `
        ${stageHeader(1, 'The Matching')}
        <div class="match-actions"></div>
        <div class="q-progress">tap one on the left, one on the right · four pairs</div>
        <div class="match-grid"></div>
      `;

      // top-left moon is the "back to cover" affordance; the right
      // X was removed at the user's request — it crowded the right
      // column visually and felt redundant.
      el.appendChild(closeCorner({ to: 'cover' }));

      const grid = $('.match-grid', el);
      shuffled.forEach((c, idx) => {
        const card = document.createElement('div');
        card.className = 'card card--match' + (c.side === 'L' ? ' is-left' : ' is-right');
        // mc-frame is the inner gold rule (playing-card double border);
        // mc-text holds the word so z-index keeps it above the frame.
        card.innerHTML = `<span class="mc-frame"></span><span class="mc-text">${escapeHtml(c.text)}</span>`;
        card.addEventListener('click', () => paint(idx));
        grid.appendChild(card);
      });

      const actions = $('.match-actions', el);
      actions.appendChild(nextDoor('confirm', () => submit()));

      function repaint() {
        $$('.card--match', grid).forEach((node, i) => {
          for (let k = 0; k < 4; k++) node.classList.remove('tag-' + k);
          if (tagOf[i] !== null) node.classList.add('tag-' + tagOf[i]);
        });
      }
      // Paint every card EXCEPT the one being flipped — useful when
      // the click also cleared orphan cards on the other side, since
      // we want their visual state to update INSTANTLY (not wait the
      // 160 ms until the flip midpoint).  Without this, the orphan
      // looks like it's still selected for 160 ms after every click. */
      function repaintExcept(skipIdx) {
        $$('.card--match', grid).forEach((node, i) => {
          if (i === skipIdx) return;
          for (let k = 0; k < 4; k++) node.classList.remove('tag-' + k);
          if (tagOf[i] !== null) node.classList.add('tag-' + tagOf[i]);
        });
      }
      function paintSingle(node, i) {
        for (let k = 0; k < 4; k++) node.classList.remove('tag-' + k);
        if (tagOf[i] !== null) node.classList.add('tag-' + tagOf[i]);
      }

      function paint(idx) {
        const side = shuffled[idx].side;
        const node = grid.children[idx];
        // Ignore taps during the ~320ms flip animation so a quick
        // double-tap doesn't queue two state changes.
        if (node && node.classList.contains('is-flipping')) return;

        // tapping an already-tagged card clears it
        if (tagOf[idx] !== null) {
          tagOf[idx] = null;
          // orphan on the other side now has no partner — but we don't
          // auto-clear it here.  user might want to repair.  the next
          // same-side click will sweep orphans away (see below).
          flipReveal(node, () => paintSingle(node, idx));
          SFX.tap();
          return;
        }

        // Before we tag anything new, clear any ORPHAN selection on this
        // same side — a card tagged with a colour whose partner on the
        // other side hasn't been chosen yet.  This enforces the rule
        // "each side may hold at most one in-progress selection."  Cards
        // that are already paired (their tag exists on the other side)
        // are left alone.
        for (let i = 0; i < tagOf.length; i++) {
          if (i === idx || tagOf[i] === null) continue;
          if (shuffled[i].side !== side) continue;
          const hasPartner = tagOf.some((v, j) =>
            j !== i && v === tagOf[i] && shuffled[j].side !== side);
          if (!hasPartner) tagOf[i] = null;
        }

        // Pick the colour for THIS click:
        //  · if a lonely card on the other side is waiting for a partner,
        //    finish that pair (use its tag)
        //  · otherwise start a new pair with the lowest unused colour.
        let assignTag = null;
        for (let t = 0; t < 4; t++) {
          const sameSide  = tagOf.filter((v, i) => v === t && shuffled[i].side === side).length;
          const otherSide = tagOf.filter((v, i) => v === t && shuffled[i].side !== side).length;
          if (sameSide === 0 && otherSide === 1) { assignTag = t; break; }
        }
        if (assignTag === null) {
          for (let t = 0; t < 4; t++) {
            if (tagOf.filter(v => v === t).length === 0) { assignTag = t; break; }
          }
        }
        if (assignTag === null) return;   // all 4 colours fully booked

        tagOf[idx] = assignTag;
        // Repaint OTHER cards instantly (so orphan cleanup is visible
        // immediately), then flip the clicked card and update its own
        // class at the flip midpoint.
        repaintExcept(idx);
        flipReveal(node, () => paintSingle(node, idx));
        SFX.tap();
      }

      // Run a 320ms Y-axis card flip on `node`.  The DOM update
      // (adds/removes .tag-N classes) fires at the 50% midpoint —
      // exactly when rotateY is at 90° and the card is edge-on,
      // invisible — so the new face emerges as the card rotates back.
      function flipReveal(node, updateNow) {
        if (!node) { updateNow(); return; }
        node.classList.add('is-flipping');
        setTimeout(updateNow, 160);
        setTimeout(() => node.classList.remove('is-flipping'), 320);
      }

      function submit() {
        if (tagOf.some(t => t === null)) {
          showModal({ title: 'colour every card first', actions: [{ label: 'okay' }] });
          return;
        }
        let correct = 0;
        const cardResult = new Array(shuffled.length).fill(false);
        for (let t = 0; t < 4; t++) {
          const idxs = tagOf.map((v, i) => v === t ? i : -1).filter(i => i >= 0);
          if (idxs.length !== 2) continue;
          const [a, b] = idxs;
          if (shuffled[a].pairId === shuffled[b].pairId) {
            correct++;
            cardResult[a] = true; cardResult[b] = true;
          }
        }
        // Persist the L-side outcome for the chapter summary / mistakes.
        shuffled.forEach((c, i) => {
          if (c.side !== 'L') return;
          if (cardResult[i]) state.results[c.text].match = true;
          else { state.results[c.text].match = false; recordMistake(c.text); }
        });
        // Persist the full 8-tile result for the dedicated result page —
        // we want to replay each card in the same colour the user dyed
        // it, with a ✓ / ✗ on whether its pair was correct.
        state.session.matchResult = shuffled.map((c, i) => ({
          text: c.text, pairId: c.pairId, tag: tagOf[i], correct: cardResult[i], side: c.side
        }));
        showModal({
          title: 'pages flipped',
          score: { value: correct, total: 4 },
          actions: [{ label: 'see results', onClick: () => go('stage1-result') }]
        });
      }
    }
  },

  /* ---------- STAGE 1 RESULT ----------
     What it is NOT: a stack of full study cards.
     What it IS: an echo of the matching board the user just finished.
     Each of the 8 tiles keeps the colour the user painted it (tag-0
     ..tag-3), gets a ✓ if its pair turned out right or ✗ if not, and
     becomes a doorway to that word's study card on tap.               */
  'stage1-result': {
    onEnter() {
      LanBGM.playResultRandom({ volume: 0.42 });
      const el = $('#screen-stage1-result');
      const result = state.session.matchResult || [];
      const correctPairs = new Set(result.filter(r => r.correct).map(r => r.pairId)).size;

      // v=39 result-page layout per user sketch — chapter band as a
      // small sash on top, then the painted score frame (same asset
      // as the modal so the storybook keeps speaking one voice),
      // then the doorway button, then the grid.  scoreBlock() builds
      // the reusable chapter+frame combo so the three result pages
      // (and any future "two-piece" pages) share one component.
      el.innerHTML = `
        ${scoreBlock(1, 'The Matching', correctPairs, 4, encouragement(correctPairs / 4))}
        <div class="match-actions"></div>
        <div class="match-result-hint">— touch any word to read its page —</div>
        <div class="match-result-grid"></div>
      `;

      el.appendChild(closeCorner({ to: 'cover' }));
      // v=64 — only PERFECT (4/4 pairs) lets the user move on to
      // stage 2.  Otherwise show "Try Again" which redraws stage 1
      // with a fresh shuffle of the same chapter's pairs.
      if (correctPairs >= 4) {
        $('.match-actions', el).appendChild(nextDoor('Next Page', () => go('stage2'), { confirm: true }));
      } else {
        $('.match-actions', el).appendChild(nextDoor('Try Again', () => {
          // Reset match results, keep session intact (same pairs).
          state.session.matchResult = null;
          state.session.pairs.forEach(p => {
            if (state.results[p.head])    state.results[p.head].match    = null;
            if (state.results[p.partner]) state.results[p.partner].match = null;
          });
          go('stage1');
        }));
      }

      const grid = $('.match-result-grid', el);
      result.forEach(r => {
        const tile = document.createElement('button');
        const sideClass = r.side === 'L' ? 'is-left' : 'is-right';
        const state = r.correct ? 'is-correct' : 'is-wrong';
        const flourish = r.correct ? '<span class="pair-mark">❦</span>' : '';
        // v=55 — each tile now carries TWO colour signals:
        //   tag-N  → body fill, the colour the user DYED it during
        //            the game (their guess)
        //   pair-N → text colour, the colour of its TRUE PARTNER
        //            (pairId).  On correct pairs the two match,
        //            text reads cleanly; on wrong pairs the
        //            mismatched text colour reveals "this card
        //            actually belonged to a different pair".
        tile.className = `card card--match ${sideClass} tag-${r.tag} pair-${r.pairId} ${state}`;
        tile.innerHTML = `
          <span class="mc-frame"></span>
          <span class="mc-text">${escapeHtml(r.text)}</span>
          ${flourish}
        `;
        tile.addEventListener('click', () => flipToCard(tile, r.text, 'stage1-result'));
        grid.appendChild(tile);
      });
    }
  },

  /* ---------- STAGE 2 — the reading ---------- */
  /* ---------- STAGE 2 — multi-blank scene reading (v=52)
     Each question is a long contextual sentence with N blanks.
     Slots are BOXES, not underlines (so they're easier to tap to
     re-edit).  One slot is "active" at any time (glowing gold);
     tapping an option fills the active slot and auto-advances the
     active marker.  Tapping a previous slot makes it active again
     so the user can change their answer.  Once every slot is
     filled, the next blank-area tap grades + reveals.            */
  stage2: {
    onEnter() {
      LanBGM.playHomeRandom({ volume: 0.38 });
      const el = $('#screen-stage2');
      state.sceneIdx        = 0;
      state.sceneFills      = [];          // user's pick per blank
      state.sceneActive     = 0;           // active blank index
      state.sceneOptions    = null;        // flat 12 (shuffled)
      state.scenePerBlank   = null;        // [[4],[4],[4]] candidates per blank
      state.sceneGraded     = false;
      state.sceneReviewBlank = -1;         // currently-highlighted blank (review)
      el.innerHTML = `
        ${stageHeader(2, 'The Reading')}
        <div class="oracle-stage" id="oracle-stage"></div>
      `;
      el.appendChild(closeCorner({ to: 'cover' }));
      drawQ();

      function currentQ() { return state.session.scenes[state.sceneIdx]; }

      // v=63 — 3 blanks + 12 options.  For each answer we build a
      // 4-card group sharing the answer's first letter (3 random
      // PARCHMENT_CARDS distractors + the answer).  The flat 12 is
      // shuffled.  scenePerBlank lets us "filter back" to the
      // candidates for blank i during the review step.
      function buildOptionsFor(q) {
        const answers = (q.answers || []).slice();
        const taken = new Set(answers);
        const perBlank = answers.map(ans => {
          const letter = (ans[0] || '').toLowerCase();
          const pool = Object.keys(PARCHMENT_CARDS).filter(w => {
            if (!w) return false;
            if (w[0].toLowerCase() !== letter) return false;
            if (taken.has(w)) return false;
            return true;
          });
          const distractors = shuffle(pool).slice(0, 3);
          distractors.forEach(d => taken.add(d));
          return shuffle([ans, ...distractors]);
        });
        // If a group came back short (rare — letter pool tiny), pad
        // with anything from q.options that isn't already used.
        perBlank.forEach((grp, i) => {
          while (grp.length < 4 && (q.options || []).length) {
            const cand = q.options.find(o => !taken.has(o));
            if (!cand) break;
            taken.add(cand);
            grp.push(cand);
          }
        });
        return {
          perBlank,
          flat: shuffle(perBlank.flat())
        };
      }

      function drawQ() {
        const stage = $('#oracle-stage', el);
        const q = currentQ();
        const total = state.session.scenes.length;
        const built = buildOptionsFor(q);
        state.sceneFills       = new Array(q.blank_count || q.answers.length).fill(null);
        state.sceneActive      = 0;
        state.scenePerBlank    = built.perBlank;
        state.sceneOptions     = built.flat;
        state.sceneGraded      = false;
        state.sceneReviewBlank = -1;
        stage.innerHTML = `
          <div class="q-progress">${String(state.sceneIdx + 1).padStart(2, '0')} · ${String(total).padStart(2, '0')}</div>
          <div class="q-card">
            <span class="q-corner q-corner-tl">✦</span>
            <span class="q-corner q-corner-tr">✦</span>
            <span class="q-corner q-corner-bl">✦</span>
            <span class="q-corner q-corner-br">✦</span>
            <div class="q-sentence q-sentence-blanks" id="q-sentence-host">${renderBlankSentence(q)}</div>
            <img class="q-bow q-bow-inside" src="assets/icon-bow.png?v=31" alt="" aria-hidden="true">
          </div>
          <div class="oracle-options is-grid-12"></div>
        `;
        wireSlots();
        renderOptions();
      }

      function renderBlankSentence(q) {
        let slotIdx = 0;
        return escapeHtml(q.blank_sentence).replace(/_{3,}/g, () => {
          const i = slotIdx++;
          const filled  = state.sceneFills[i];
          const active  = (i === state.sceneActive && !state.sceneGraded)
                       || (state.sceneGraded && i === state.sceneReviewBlank);
          const ans     = (currentQ().answers || [])[i];
          let cls = 'q-slot' + (filled ? ' is-filled' : '') + (active ? ' is-active' : '');
          if (state.sceneGraded) {
            const right = (filled || '').toLowerCase() === (ans || '').toLowerCase();
            cls += right ? ' is-right' : ' is-wrong';
          }
          const inner = filled ? escapeHtml(filled) : '<span class="q-slot-tail">&nbsp;</span>';
          return `<span class="${cls}" data-slot="${i}">${inner}</span>`;
        });
      }

      function wireSlots() {
        $$('.q-slot', el).forEach(slot => {
          slot.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const i = +slot.getAttribute('data-slot');
            if (state.sceneGraded) {
              // v=63 review — clicking a blank highlights the 4
              // candidates that belonged to that blank.  Each card
              // jumps to parchment when tapped.
              state.sceneReviewBlank = i;
              SFX.tap();
              $('#q-sentence-host').innerHTML = renderBlankSentence(currentQ());
              wireSlots();
              renderOptions();
              return;
            }
            state.sceneActive = i;
            SFX.tap();
            $('#q-sentence-host').innerHTML = renderBlankSentence(currentQ());
            wireSlots();
          });
        });
      }

      function renderOptions() {
        const opts = $('.oracle-options', el);
        opts.innerHTML = '';
        const q = currentQ();
        const answers = q.answers || [];
        (state.sceneOptions || []).forEach(word => {
          const usedAt = state.sceneFills.indexOf(word);   // -1 if not picked
          const isPick = usedAt >= 0;
          const isCorrect = answers.includes(word);
          const inReviewBlank = state.sceneGraded
            && state.sceneReviewBlank >= 0
            && (state.scenePerBlank[state.sceneReviewBlank] || []).includes(word);
          let cls = 'card card--option';
          if (state.sceneGraded) {
            if (isPick && (state.sceneFills.indexOf(word) >= 0)
                && answers[state.sceneFills.indexOf(word)].toLowerCase() === word.toLowerCase()) {
              cls += ' picked-right reveal-right';
            } else if (isPick) {
              cls += ' picked-wrong';
            }
            // After grading every CORRECT card glows gold (whether or
            // not the user picked it) so the user can see "the right
            // ones" at a glance — and tap any to open parchment.
            if (isCorrect && !cls.includes('reveal-right')) cls += ' reveal-right';
            cls += ' is-readable';
            if (inReviewBlank) cls += ' is-review-highlight';
          } else if (isPick) {
            cls += ' picked-wrong';   // wine-card while waiting
          }
          const b = document.createElement('button');
          b.className = cls;
          b.innerHTML = `<span class="mc-frame"></span><span class="mc-text">${escapeHtml(word)}</span>`;
          b.dataset.word = word;
          b.addEventListener('click', (ev) => onOptionClick(ev, word, b));
          opts.appendChild(b);
        });
      }

      function onOptionClick(ev, word, btn) {
        ev.stopPropagation();
        if (state.sceneGraded) {
          if (!PARCHMENT_CARDS[word]) return;
          SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
          showParchment(word);
          return;
        }
        // pick: ignore if already used in any blank
        if (state.sceneFills.includes(word)) return;
        const i = state.sceneActive;
        if (i < 0 || i >= state.sceneFills.length) return;
        // Card-flip animation, then fill blank.
        btn.classList.add('is-flipping');
        SFX.tap();
        setTimeout(() => {
          state.sceneFills[i] = word;
          // Advance active marker to next empty slot, or stay.
          let next = state.sceneFills.indexOf(null);
          if (next < 0) next = i;
          state.sceneActive = next;
          $('#q-sentence-host').innerHTML = renderBlankSentence(currentQ());
          wireSlots();
          renderOptions();
          if (!state.sceneFills.includes(null)) {
            // All blanks filled → grade after a small breath.
            setTimeout(grade, 320);
          }
        }, 160);
      }

      function grade() {
        state.sceneGraded = true;
        const q = currentQ();
        let allRight = true;
        q.answers.forEach((ans, i) => {
          if ((state.sceneFills[i] || '').toLowerCase() === ans.toLowerCase()) {
            if (PARCHMENT_CARDS[ans]) state.results[ans] = state.results[ans] || { match:null, oracle:null, dict:null };
            if (state.results[ans]) state.results[ans].oracle = true;
          } else {
            if (!state.results[ans]) state.results[ans] = { match:null, oracle:null, dict:null };
            state.results[ans].oracle = false;
            recordMistake(ans);
            allRight = false;
          }
        });
        if (allRight) SFX.right(); else SFX.wrong();
        // v=63 — auto-PLAY full sentence audio for context.
        try { speak(q.full_sentence); } catch {}
        // Repaint: q-card keeps user's picks (no auto-fill of the
        // truth), option cards reveal right/wrong via glow + wine.
        $('#q-sentence-host').innerHTML = renderBlankSentence(q);
        wireSlots();
        renderOptions();
        armBowAdvance();
      }

      function armBowAdvance() {
        // v=63 — bow becomes the "next question" affordance.  User
        // can roam (tap blanks to review, tap option cards to open
        // parchment) until they tap the bow.
        const bow = $('.q-bow.q-bow-inside', el);
        if (!bow) return;
        bow.classList.add('is-tappable');
        bow.addEventListener('click', advance, { once: true });
      }

      function advance(ev) {
        if (ev) ev.stopPropagation();
        SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
        state.sceneIdx++;
        if (state.sceneIdx >= state.session.scenes.length) go('stage2-result');
        else drawQ();
      }
    }
  },

  /* ---------- STAGE 2 RESULT ---------- */
  'stage2-result': {
    onEnter() {
      LanBGM.playResultRandom({ volume: 0.42 });
      const el = $('#screen-stage2-result');
      // v=52 — replaced word-tile grid with EXAMPLE SENTENCES.  Each
      // scene's full_sentence + Chinese gloss is shown; jumpable
      // words inside the sentence are underlined → tap to open
      // that word's parchment.  Per user: "结算页面修改成例句，
      // 也就是可以被跳转至单词的例句".
      const sceneAnswers = state.session.scenes.flatMap(s => s.answers || []);
      const total = sceneAnswers.length || 1;
      const right = sceneAnswers.filter(w => state.results[w] && state.results[w].oracle).length;
      el.innerHTML = `
        ${scoreBlock(2, 'The Reading', right, total, encouragement(right / total))}
        <div class="match-actions"></div>
        <div class="match-result-hint">— touch any underlined word to read its page —</div>
        <div class="scene-result-list"></div>
      `;

      el.appendChild(closeCorner({ to: 'cover' }));
      // v=64 — same gate as stage 1: only PERFECT lets the user
      // advance.  Otherwise show "Try Again" which replays stage 2
      // with the same scene questions.
      if (right >= total && total > 0) {
        $('.match-actions', el).appendChild(nextDoor('Next Page', () => go('stage3'), { confirm: true }));
      } else {
        $('.match-actions', el).appendChild(nextDoor('Try Again', () => {
          state.session.scenes.forEach(s => (s.answers || []).forEach(w => {
            if (state.results[w]) state.results[w].oracle = null;
          }));
          go('stage2');
        }));
      }
      const list = $('.scene-result-list', el);
      state.session.scenes.forEach(s => {
        const row = document.createElement('div');
        row.className = 'scene-result-row';
        let en = escapeHtml(s.full_sentence);
        (s.clickable_words || []).forEach(w => {
          if (!PARCHMENT_CARDS[w]) return;
          en = en.replace(new RegExp(`\\b${w}\\b`, 'gi'),
            `<a class="scene-jump" data-word="${escapeAttr(w)}">${w}</a>`);
        });
        row.innerHTML = `
          <div class="scene-result-en">${en}</div>
          <div class="scene-result-zh">${escapeHtml(s.sentence_zh)}</div>
        `;
        row.querySelectorAll('.scene-jump').forEach(a => {
          a.addEventListener('click', e => {
            e.stopPropagation();
            const w = a.getAttribute('data-word');
            if (PARCHMENT_CARDS[w]) {
              SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
              showParchment(w);
            }
          });
        });
        list.appendChild(row);
      });
    }
  },

  /* ---------- STAGE 3 — the inscription ---------- */
  stage3: {
    onEnter() {
      LanBGM.playGameRandom({ volume: 0.40 });
      const el = $('#screen-stage3');
      state.dictIdx = 0;
      el.innerHTML = `
        ${stageHeader(3, 'The Inscription')}
        <div class="dict-stage" id="dict-stage"></div>
      `;

      // top-left moon is the "back to cover" affordance; the right
      // X was removed at the user's request — it crowded the right
      // column visually and felt redundant.
      el.appendChild(closeCorner({ to: 'cover' }));
      drawQ();

      function drawQ() {
        const stage = $('#dict-stage', el);
        const q = state.session.dicts[state.dictIdx];
        // v=54 — dict prompt is now a full SENTENCE with a single
        // ______ blank where the headword sat.  We render the blank
        // as a slot span (first letter + ruled tail) inside the
        // sentence, just like stage 2's multi-blank slots but with
        // only one.                                                 */
        const slot = `<span class="dict-blank"><span class="dict-blank-first">${escapeHtml(q.answer[0])}</span><span class="dict-blank-tail"></span></span>`;
        const masked = q.blank_sentence.replace(/_{3,}/, slot);
        stage.innerHTML = `
          <div class="q-progress">${String(state.dictIdx + 1).padStart(2, '0')} · ${String(state.session.dicts.length).padStart(2, '0')}</div>
          <div class="q-card">
            <span class="q-corner q-corner-tl">✦</span>
            <span class="q-corner q-corner-tr">✦</span>
            <span class="q-corner q-corner-bl">✦</span>
            <span class="q-corner q-corner-br">✦</span>
            <div class="dict-zh-hint">${escapeHtml(q.sentence_zh)}</div>
            <div class="dict-prompt">${masked}</div>
            <img class="q-bow q-bow-inside" src="assets/icon-bow.png?v=31" alt="" aria-hidden="true">
          </div>
          <div class="dict-answer">
            <input class="dict-slot" id="dict-input"
                   autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
                   placeholder="trace the inscription\u2026">
            <button class="dict-quill" id="dict-quill" aria-label="sign your answer">
              <img src="assets/icon-quill.png?v=25" alt="">
            </button>
          </div>
          <div class="dict-feedback" id="dict-feedback"></div>
        `;
        const input = $('#dict-input', stage);
        $('#dict-quill', stage).addEventListener('click', () => check());
        input.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
        setTimeout(() => input.focus(), 50);
      }

      function advance() {
        state.dictIdx++;
        if (state.dictIdx >= state.session.dicts.length) go('stage3-result');
        else drawQ();
      }

      function check() {
        const stage = $('#dict-stage', el);
        const q = state.session.dicts[state.dictIdx];
        const input = $('#dict-input', stage);
        const feedback = $('#dict-feedback', stage);
        const guess = (input.value || '').trim().toLowerCase();
        if (!guess) return;
        if (guess === q.answer.toLowerCase()) {
          // right on the first try → flash visible feedback, then advance.
          state.results[q.head].dict = true;
          input.disabled = true;
          input.classList.add('is-right');
          feedback.innerHTML = '<em>✦ inscribed</em>';
          feedback.className = 'dict-feedback is-right';
          SFX.right();
          speak(q.answer).then(() => setTimeout(advance, 700));
        } else {
          // wrong — reveal the answer in the blank, clear input,
          // ask user to copy it.  Score still counts as wrong.
          state.results[q.head].dict = false;
          recordMistake(q.head);
          SFX.wrong();
          input.value = '';
          input.classList.add('is-wrong');
          // Replace the blank inside the prompt with the real letters
          const reveal = `<span class="dict-blank is-revealed">${escapeHtml(q.answer)}</span>`;
          const revealed = q.blank_sentence.replace(/_{3,}/, reveal);
          stage.querySelector('.dict-prompt').innerHTML = revealed;
          feedback.innerHTML = '<em>write it once more</em>';
          feedback.className = 'dict-feedback is-wrong';
          input.focus();
          input.addEventListener('input', () => {
            input.classList.remove('is-wrong');
            if (input.value.trim().toLowerCase() === q.answer.toLowerCase()) {
              input.disabled = true;
              input.classList.add('is-right');
              feedback.textContent = '';
              SFX.right();
              speak(q.answer).then(() => setTimeout(advance, 350));
            }
          });
        }
      }
    }
  },


  /* ---------- STAGE 3 RESULT  +  SUMMARY (end of session) ---------- */
  'stage3-result': {
    onEnter() {
      LanBGM.playResultRandom({ volume: 0.42 });
      SFX.finish();
      // v=64 — bump chapter ONLY when stage 3 was passed perfectly
      // (every dict right on the first try).  Otherwise the user
      // re-plays this chapter.  Words are still marked learned —
      // exposure counts even if the user needed a hint.
      state.session.words.forEach(w => { markLearned(w); });
      saved.progress = Math.min(saved.progress + state.session.words.length, TOTAL_WORDS);
      const _dictsPerfect = state.session.dicts
        .every(d => state.results[d.head] && state.results[d.head].dict === true);
      if (_dictsPerfect) {
        saved.chapter = (saved.chapter || 1) + 1;
      }
      Store.save();

      const el = $('#screen-stage3-result');
      // v=51 — total = match-correct (4 pairs) + scene-correct (per
      // blank) + dict-correct (per dict question).  Denominator is
      // the sum of available slots across the three stages.
      const pairsTotal  = state.session.pairs.length;
      const sceneAnswers = state.session.scenes.flatMap(s => s.answers || []);
      const sceneTotal   = sceneAnswers.length;
      const dictsTotal   = state.session.dicts.length;
      const grandTotal   = pairsTotal + sceneTotal + dictsTotal;
      // correctness per slot
      const matchRight = state.session.pairs
        .filter(p => state.results[p.head] && state.results[p.head].match).length;
      const sceneRight = sceneAnswers
        .filter(w => state.results[w] && state.results[w].oracle).length;
      const dictRight  = state.session.dicts
        .filter(d => state.results[d.head] && state.results[d.head].dict).length;
      const totalCorrect = matchRight + sceneRight + dictRight;
      el.innerHTML = `
        ${scoreBlock(3, 'The Inscription', totalCorrect, grandTotal, encouragement(totalCorrect / grandTotal))}
        <div class="match-actions"></div>
        <div class="match-result-hint">— three pages, all her words · scroll down to review —</div>
        <div class="review-stack"></div>
      `;

      el.appendChild(closeCorner({ to: 'cover' }));

      // v=64 — gate: only PERFECT stage-3 lets the user close the
      // chapter.  Otherwise "Try Again" replays stage 3 (chapter
      // counter did NOT advance above, so the same chapter content
      // returns when Continue Reading is tapped again).
      if (_dictsPerfect) {
        $('.match-actions', el).appendChild(nextDoor('Next Chapter', () => { LanBGM.stop(); go('cover'); }, { confirm: true }));
      } else {
        $('.match-actions', el).appendChild(nextDoor('Try Again', () => {
          state.session.dicts.forEach(d => {
            if (state.results[d.head]) state.results[d.head].dict = null;
          });
          go('stage3');
        }));
      }

      // v=57 — EXPANDED review cards per user: stage-3 result is
      // the END-OF-CHAPTER review.  Show every unique word touched
      // across all three stages, each with its full parchment-style
      // content inlined (no tap needed — just scroll).
      const stack = $('.review-stack', el);
      const wordsSeen = Array.from(new Set(state.session.words.filter(w => PARCHMENT_CARDS[w])));
      wordsSeen.forEach(w => stack.appendChild(renderReviewCard(w)));
    }
  },

  /* ---------- NOTE hub (cover-side, NOT in game flow) ----------
     v=26.2 — page panel (0511DE6F frame) wraps the inner dome title
     + 2 horizontal bucket buttons.  Clicking a bucket lands on
     screen-note-bucket which now reuses the index list format.    */
  note: {
    onEnter() {
      const el = $('#screen-note');
      const m = saved.mistakes;
      const entries = Object.entries(m);
      const soft  = entries.filter(([_, c]) => c >= 1 && c <= 2).map(([w]) => w);
      const haunt = entries.filter(([_, c]) => c >= 3).map(([w]) => w);
      el.innerHTML = `
        <div class="nav-card">
          ${pageTitle('Her Little Note')}
          <div class="nav-card-body">
            <div class="counter-row">
              <button class="bucket-card" data-bucket="soft"  ${soft.length  ? '' : 'disabled'}>
                <div class="bk-hint">words that slipped once</div>
                <div class="bk-value">${soft.length}</div>
                <div class="bk-label">soft slips</div>
              </button>
              <button class="bucket-card" data-bucket="haunt" ${haunt.length ? '' : 'disabled'}>
                <div class="bk-hint">words that return</div>
                <div class="bk-value">${haunt.length}</div>
                <div class="bk-label">haunting words</div>
              </button>
            </div>
          </div>
        </div>
      `;
      // Top-right star — single corner anchor per page.
      el.appendChild(closeCorner());

      $$('.bucket-card', el).forEach(b => b.addEventListener('click', () => {
        if (b.disabled) return;
        SFX.tap();
        go('note-bucket', { bucket: b.dataset.bucket });
      }));
    }
  },

  /* ---------- NOTE BUCKET — index-style filtered list -----------
     v=26.2 — user simplification: bucket page now reuses the same
     panel/search/A-Z/list UI as the index, just with the bucket's
     filtered word set.  One layout instead of a separate grid. */
  'note-bucket': {
    onEnter({ bucket } = {}) {
      const m = saved.mistakes;
      const words = Object.entries(m)
        .filter(([_, c]) => bucket === 'haunt' ? c >= 3 : (c >= 1 && c <= 2))
        .map(([w]) => w)
        .filter(w => PARCHMENT_CARDS[w])
        .sort();
      const title = bucket === 'haunt' ? 'Haunting Words' : 'Soft Slips';
      renderIndexLikePage($('#screen-note-bucket'),
        { title, words, backTo: 'note', fromKey: 'note-bucket' });
    }
  },

  /* ---------- INDEX (cover-side, A-Z) ----------
     v=26.2 — same panel UI as note-bucket via renderIndexLikePage. */
  index: {
    onEnter() {
      const heads = Object.keys(PARCHMENT_CARDS).sort();
      renderIndexLikePage($('#screen-index'),
        { title: 'The Index', words: heads, backTo: 'cover', fromKey: 'index' });
    }
  },

  /* ---------- CARD detail — the single-page parchment ----------
     v=26 — full-screen study page, .ex-card gets the .is-parchment
     skin (cream E993B660 scroll background, dark-sepia text) plus
     a copy-line at the bottom.  Reveal mechanic (tap-to-show next
     audio phrase) stays exactly as before. */
  card: {
    onEnter(opts) {
      const el = $('#screen-card');
      const word = opts.word;
      const from = opts.from || 'cover';
      state._cardFrom = from;
      el.innerHTML = `<div class="card-host"></div>`;
      el.appendChild(closeCorner({ to: from }));
      const card = renderExCard(word, null, { withControls: true });
      card.classList.add('is-parchment', 'is-entering');
      card.insertAdjacentHTML('beforeend', copyLine());
      $('.card-host', el).appendChild(card);
      // strip the entrance class once the fade+scale animation finishes
      setTimeout(() => card.classList.remove('is-entering'), 620);
    }
  }
};

/* ============================================================
   12. BOOTSTRAP
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // v=55 — TAP-TO-BEGIN intro screen.  Mobile browsers (and most
  // desktop policies) require a user gesture before audio can
  // play.  We show a fullscreen black veil with a centred italic
  // "tap to open the book" line; the first tap anywhere unlocks
  // BGM, plays the home pool, removes the veil, and renders the
  // cover.
  _goImmediate('cover');                       // pre-render behind the veil
  const intro = document.createElement('div');
  intro.className = 'intro-veil';
  intro.innerHTML = `
    <div class="intro-glyph">❦</div>
    <div class="intro-text">tap to open the book</div>
    <div class="intro-sub">tap anywhere</div>
  `;
  document.body.appendChild(intro);
  // v=64 — the tap that DISMISSES the intro veil must not also fire
  // the cover's Continue Reading button.  On touch devices, touchend
  // turns into a synthetic click ~300 ms later, by which time the
  // veil has already gone pointer-events: none and the click lands
  // on whatever sits behind it (the CTA).  Two fixes:
  //   1. preventDefault on touchend suppresses the synthetic click.
  //   2. A short "swallow" window after the dismiss eats any stray
  //      click that still slips through (Safari is generous).      */
  let _introConsumed = false;
  let _swallowUntil = 0;
  const swallowFollowUp = (e) => {
    if (Date.now() < _swallowUntil) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      document.removeEventListener('click', swallowFollowUp, true);
    }
  };
  const onFirstTap = (e) => {
    if (_introConsumed) return;
    _introConsumed = true;
    _swallowUntil = Date.now() + 450;
    if (e && e.preventDefault)  e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    intro.classList.add('is-out');
    setTimeout(() => intro.remove(), 520);
    try { LanBGM.unlock(); } catch {}
    try { LanBGM.playHomeRandom({ volume: 0.42 }); } catch {}
  };
  intro.addEventListener('touchend', onFirstTap, { passive: false });
  intro.addEventListener('click',    onFirstTap);
  document.addEventListener('click', swallowFollowUp, true);
});
