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
  // v=78 — band-pass noise helper for organic paper/cloth sounds.
  // type: 'bandpass' with a fixed centre + Q; envelope shapes
  // attack + release so the burst feels like a physical event
  // (paper, ink, fabric) rather than a digital tap.
  function bandNoise({ dur = 0.20, peak = 0.06, center = 1200, q = 1.2, attack = 0.01, release = 0.18 }) {
    const c = ensure();
    const bufferSize = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1);
    const src = c.createBufferSource();
    src.buffer = buf;
    const filter = c.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = center;
    filter.Q.value = q;
    const g = c.createGain();
    const t0 = c.currentTime;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0001), t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + release);
    src.connect(filter); filter.connect(g); g.connect(c.destination);
    src.start(t0);
  }
  return {
    bling:   () => {
      tone([1175, 1568, 1976, 2349, 2794], 0.05, 0.32, 'triangle', 0.13);
      setTimeout(() => tone([2349, 2794, 3136], 0.04, 0.22, 'sine', 0.08), 80);
      setTimeout(() => tone([3520, 4186], 0.04, 0.14, 'sine', 0.05), 200);
    },
    tap:     () => tone([1050],                          0.0, 0.07, 'sine',     0.06),
    // v=78 — cardFlip: short "thwack" of card paper.  A quick mid-high
    // noise burst (the snap of the card's edge) layered with a low
    // thump (the card landing flat).  Replaces the bare SFX.tap that
    // was being used for option card picks.
    cardFlip: () => {
      bandNoise({ dur: 0.10, peak: 0.10, center: 2400, q: 0.9, attack: 0.003, release: 0.09 });
      setTimeout(() => bandNoise({ dur: 0.12, peak: 0.06, center: 420, q: 2.0, attack: 0.004, release: 0.11 }), 25);
    },
    // v=78 — pageTurn: rebuilt to read as a book page being turned.
    // A soft mid-low rustle (paper) followed 60 ms later by a quieter
    // high-mid whisper (the page settling).  Far gentler than the
    // bare highpass noise the user described as "抽了我一巴掌".
    pageTurn:() => {
      bandNoise({ dur: 0.32, peak: 0.07, center: 800,  q: 1.0, attack: 0.012, release: 0.30 });
      setTimeout(() => bandNoise({ dur: 0.22, peak: 0.045, center: 2200, q: 1.4, attack: 0.008, release: 0.20 }), 60);
    },
    // v=78 — inkScratch: soft pencil-on-paper scratching, used when
    // a parchment row reveals.  Mid-frequency band noise with a
    // very gentle envelope; quiet enough to layer under TTS.
    inkScratch: () => {
      bandNoise({ dur: 0.38, peak: 0.035, center: 1400, q: 0.7, attack: 0.020, release: 0.36 });
    },
    pop:     () => tone([784, 1175, 1568],               0.06, 0.22, 'triangle', 0.12),
    right:   () => tone([880, 1175, 1568],               0.05, 0.22, 'sine',     0.16),
    wrong:   () => tone([311, 207],                      0.07, 0.20, 'square',   0.06),
    finish:  () => tone([523, 659, 784, 988, 1175, 1318],0.08, 0.26, 'sine',     0.14),

    // Result-modal chimes — pick one based on the score band.
    scorePerfect: () => {
      tone([1175, 1568, 1976, 2349, 2794, 3136], 0.05, 0.28, 'triangle', 0.14);
      setTimeout(() => tone([2349, 2794, 3136, 3520], 0.04, 0.22, 'sine', 0.09), 90);
      setTimeout(() => tone([3520, 4186], 0.04, 0.16, 'sine', 0.06), 220);
    },
    scoreGood: () => {
      tone([784, 988, 1175, 1397], 0.06, 0.24, 'triangle', 0.13);
      setTimeout(() => tone([1568, 1976], 0.05, 0.18, 'sine', 0.08), 100);
    },
    scoreOk: () => tone([784, 988], 0.10, 0.32, 'sine', 0.11),
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
// v=65 — themed chapters from VOCAB_ALL_QUESTIONS_CLASSIFIED_CHAPTERS.
// 212 hand-built chapters; each carries match_group_ids,
// reading_question_ids (string ids), and dictation_question_ids
// (format "DICT_N" → DICTATION_QUESTIONS[N]).                       */
const _CHAPTER_PLAN   = (typeof CHAPTER_PLAN !== 'undefined') ? CHAPTER_PLAN : [];
const _SCENE_BY_ID = (() => {
  const m = {};
  _SCENE_ARR.forEach(q => { if (q.id) m[q.id] = q; });
  return m;
})();

function _chapterFor(chapterN) {
  if (!_CHAPTER_PLAN.length) return null;
  // Chapters are 1-indexed for the user; clamp + wrap.
  const idx = Math.max(0, (chapterN | 0) - 1) % _CHAPTER_PLAN.length;
  return _CHAPTER_PLAN[idx];
}

// v=65 — chapter-driven pickers (4 pairs / scenes / dicts each).
// If the chapter plan is missing or short, fall back to the random
// seeded pickers below so the UI never crashes.
function _pickMatchPairs(n = 4, seed = 0) {
  const ch = _chapterFor(seed);
  if (ch && ch.match_group_ids && ch.match_group_ids.length) {
    const used = new Set();
    const out  = [];
    for (const gid of ch.match_group_ids) {
      const g = _GROUPS_ARR[gid];
      if (!g) continue;
      if (used.has(g.head) || used.has(g.partner)) continue;
      out.push({ head: g.head, partner: g.partner });
      used.add(g.head); used.add(g.partner);
      if (out.length === n) break;
    }
    if (out.length === n) return out;
  }
  // Fallback — seeded random.
  const used = new Set();
  const out  = [];
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
  const ch = _chapterFor(seed);
  if (ch && ch.reading_question_ids && ch.reading_question_ids.length) {
    const picks = ch.reading_question_ids.map(id => _SCENE_BY_ID[id]).filter(Boolean);
    if (picks.length) {
      // Chapter may carry fewer than n reading questions (some are short);
      // pad with seeded-random extras so the user always gets n scenes.
      if (picks.length < n) {
        const extras = seededShuffle(_SCENE_ARR, seed * 13 + 5)
          .filter(s => !picks.includes(s))
          .slice(0, n - picks.length);
        picks.push(...extras);
      }
      return picks.slice(0, n);
    }
  }
  // Fallback — seeded random over the full pool.
  return seededShuffle(_SCENE_ARR, seed * 13 + 5).slice(0, n);
}
function _pickDictQuestions(n = 4, seed = 0) {
  // v=65 — chapter-driven.  Each chapter lists DICT_N tokens which
  // are 0-based indices into DICTATION_QUESTIONS.  We use the head
  // of each entry, then build the same single-blank example
  // sentence (from PARCHMENT_CARDS.example) the user wanted in
  // v=54.  This way the WORD comes from the curated chapter plan
  // but the prompt is still a contextual sentence.                  */
  const buildFromHead = (word) => {
    const c = PARCHMENT_CARDS[word];
    if (!c) return null;
    const ex = c.example || '';
    if (!ex || !new RegExp(`\\b${word}\\b`, 'i').test(ex)) {
      // No usable example — fall back to a phrase-style prompt.
      const dq = _DICT_ARR.find(d => d.head === word);
      const prompt = dq && dq.prompt ? dq.prompt : word;
      return {
        head: word,
        hint: word[0],
        blank_sentence: prompt.replace(new RegExp(`\\b${word}\\b`, 'i'), '______') || '______',
        full_sentence: prompt,
        sentence_zh:   dq && dq.prompt_zh ? dq.prompt_zh : (c.zh || ''),
        answer:        word,
        role:          c.role || 'output',
        topic:         c.topic || ''
      };
    }
    return {
      head: word,
      hint: word[0],
      blank_sentence: ex.replace(new RegExp(`\\b${word}\\b`, 'i'), '______'),
      full_sentence: ex,
      sentence_zh:   c.example_zh || '',
      answer:        word,
      role:          c.role || 'output',
      topic:         c.topic || ''
    };
  };
  const ch = _chapterFor(seed);
  if (ch && ch.dictation_question_ids && ch.dictation_question_ids.length) {
    const heads = ch.dictation_question_ids
      .map(tok => {
        const m = /^DICT_(\d+)$/.exec(tok);
        if (!m) return null;
        const idx = parseInt(m[1], 10);
        const d = _DICT_ARR[idx];
        return d ? d.head : null;
      })
      .filter(Boolean);
    const out = heads.map(buildFromHead).filter(Boolean);
    if (out.length >= n) return out.slice(0, n);
    if (out.length) {
      // Pad with seeded random heads.
      const extras = seededShuffle(Object.keys(PARCHMENT_CARDS).filter(w => {
        const c = PARCHMENT_CARDS[w];
        return c && c.canWrite && c.example && new RegExp(`\\b${w}\\b`, 'i').test(c.example);
      }), seed * 17 + 23)
        .filter(w => !out.some(o => o.head === w))
        .slice(0, n - out.length)
        .map(buildFromHead)
        .filter(Boolean);
      out.push(...extras);
      return out.slice(0, n);
    }
  }
  // Fallback — seeded random over the canWrite + has-example pool.
  const pool = Object.keys(PARCHMENT_CARDS).filter(w => {
    const c = PARCHMENT_CARDS[w];
    return c && c.canWrite && c.example && new RegExp(`\\b${w}\\b`, 'i').test(c.example);
  });
  return seededShuffle(pool, seed * 17 + 23).slice(0, n).map(buildFromHead).filter(Boolean);
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
        { progress: 0, learned: {}, mistakes: {}, chapter: 1, stage: 1 },
        JSON.parse(localStorage.getItem('hll-state') || '{}')
      );
    } catch { return { progress: 0, learned: {}, mistakes: {}, chapter: 1 }; }
  },
  save() { try { localStorage.setItem('hll-state', JSON.stringify(saved)); } catch {} }
};
const saved = Store.load();
if (!saved.chapter || saved.chapter < 1) { saved.chapter = 1; Store.save(); }
if (!saved.stage   || saved.stage   < 1 || saved.stage > 3) { saved.stage = 1; Store.save(); }
// v=63 — restart-game reset: chapter only.  Learned + mistakes are
// lifetime stats; user resets the "where am I in the storybook"
// counter, not their notebook.
function resetChapterProgress() {
  saved.chapter = 1;
  saved.stage   = 1;
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
    state.session = { pairs: [], scenes: [], dicts: [], words: Object.keys(PARCHMENT_CARDS).slice(0, 8) };
  }
  // v=78 — question ORDER is randomised each play.  Same chapter
  // still draws the same SET of scenes/dicts (seeded buildSession),
  // but the order they appear in differs every time the user taps
  // Continue Reading, so memorising "Q1=X, Q2=B" no longer works.
  state.session.scenes = shuffle(state.session.scenes);
  state.session.dicts  = shuffle(state.session.dicts);
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
  note: 'bg-note', 'note-bucket': 'bg-note', index: 'bg-note', card: 'bg-note',
  'chapter-catalog': 'bg-note'
};
// Only screens with real word lists are allowed to scroll the page —
// every other screen locks body overflow so the iOS bounce can't make
// the (fixed) bg-layer look like it's moving.
const SCROLLABLE_SCREENS = new Set(['index', 'note', 'note-bucket', 'stage3-result', 'chapter-catalog']);
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
  return s === 'cover' || s === 'note' || s === 'note-bucket' || s === 'index' || s === 'card' || s === 'chapter-catalog';
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
  'chapter-catalog': 'home',
  stage1:          'game',
  'stage1-result': 'result',
  stage2:          'home',
  'stage2-result': 'result',
  stage3:          'game',
  'stage3-result': 'result',
};
// v=66 — BGM continuity by SCREEN GROUP, not by pool.  Earlier the
// LanBGM same-pool guard meant cover + stage2 + note all kept the
// SAME home-pool track running, so the user heard the same melody
// across very different contexts.  Now we tag each screen with a
// "bgm group"; same-group nav (cover↔note↔index) keeps the music
// alive, but crossing into a new group (stage 2 reading, stage 3
// dictation, etc.) FORCES a new track even when the pool is the
// same — we call LanBGM.stop() before playing so the guard releases.
const BGM_GROUP_BY_SCREEN = {
  cover:           'home-side',
  note:            'home-side',
  'note-bucket':   'home-side',
  index:           'home-side',
  card:            'home-side',
  'chapter-catalog': 'home-side',
  stage1:          'stage1',
  'stage1-result': 'stage1-result',
  stage2:          'stage2',
  'stage2-result': 'stage2-result',
  stage3:          'stage3',
  'stage3-result': 'stage3-result',
};
let _lastBgmGroup = null;
function _ensureBGM(screenId) {
  const pool  = BGM_POOL_BY_SCREEN[screenId];
  const group = BGM_GROUP_BY_SCREEN[screenId];
  if (!pool) return;
  if (group && group === _lastBgmGroup) return;     // same group → keep
  _lastBgmGroup = group;
  try {
    // v=77 — explicit stop() retired (it was leaving the audio
    // graph in a half-torn-down state for the user's device,
    // killing game BGM).  Force:true on playRandom bypasses the
    // same-pool guard and play() handles the timer swap cleanly.
    const opts = { force: true };
    if      (pool === 'home')   LanBGM.playHomeRandom({ ...opts, volume: 0.42 });
    else if (pool === 'game')   LanBGM.playGameRandom({ ...opts, volume: 0.40 });
    else if (pool === 'result') LanBGM.playResultRandom({ ...opts, volume: 0.42 });
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
  // v=71: shows just "Chapter · N · <name>".  The "Stage N of 3"
  // chip retired per user — it overflowed the painted band frame.
  return `
    <div class="frame-chapter">
      <div class="frame-chapter-text">
        <span class="fc-num">Chapter · ${saved.chapter}</span>
        <span class="fc-name">${escapeHtml(name)}</span>
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
  // v=66 — semantic siblings (group): one compact line of words.
  if (c.group && c.group.length) {
    const words = c.group.map(line => (line || '').split('|')[0].trim()).filter(Boolean);
    if (words.length) {
      html += `<div class="rev-section-label">her group</div>`;
      html += `<div class="rev-line rev-group-line">${
        words.map(w => linkify(w)).join('<span class="rev-group-sep">·</span>')
      }</div>`;
    }
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
      <!-- v=75 — "tap the page" hint anchored to the painted scroll-
           roll above the inner content, OUTSIDE the scrolling area so
           it stays visible while the user scrolls long entries.
           The old "fold this page" button retired per user — it
           scrolled with content and felt out of place.              -->
      <div class="pc-tap-hint pc-tap-hint--fixed">— tap the page —</div>
      <div class="parchment-inner">
        <div class="pc-stack"></div>
        <div class="pc-copy">
          <span class="pc-copy-label">signed</span>
          <input class="pc-copy-input" type="text"
                 autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
                 placeholder="${escapeAttr(c.h)}">
          <span class="pc-copy-mark">✦</span>
        </div>
      </div>
      <!-- v=56 — note button anchored to .parchment-card directly
           so its bottom % maps to the painted star-in-circle's
           position on the asset (not the inner padded box).      -->
      <button class="pc-note-add ${inNote ? 'is-saved' : ''}" aria-label="add to her note" title="add to her note">
        <svg class="pc-note-key" viewBox="0 0 32 14" width="40" height="18" aria-hidden="true">
          <!-- skeleton key: bow (ring) on the left + shaft + two teeth -->
          <circle cx="5" cy="7" r="3.8" fill="none" stroke="currentColor" stroke-width="1.8"/>
          <circle cx="5" cy="7" r="1.3" fill="currentColor"/>
          <line x1="8.8" y1="7" x2="29" y2="7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="22" y1="7"  x2="22" y2="12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="26" y1="7"  x2="26" y2="11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <span class="pc-note-key-fallback" aria-hidden="true">🗝</span>
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
      // v=75 — back to ROW-BY-ROW reveal (long words kept breaking the
      // single-row idea anyway), with EVERY row getting its own ♪
      // play button + audio so a freshly-revealed line is always
      // spoken.  Heading row = the family word + its meaning;
      // example row = the collocation + its zh.
      items.push({ kind: 'fam', html: `<div class="pc-row pc-play-row" data-sp="${escapeAttr(w)}">
        <button class="pc-play">♪</button>
        <span class="pc-line-word">${pcLinkify(w)}</span>
        <span class="pc-line-word-zh">${escapeHtml(posZh || '')}</span>
      </div>` });
      if (phrase) {
        items.push({ kind: 'fam-ph', html: `<div class="pc-row pc-row--phrase pc-play-row" data-sp="${escapeAttr(phrase)}">
          <button class="pc-play">♪</button>
          <span class="pc-line-phrase">${pcLinkify(phrase)}</span>
          <span class="pc-line-zh">${escapeHtml(phraseZh || '')}</span>
        </div>` });
      }
    });
  }

  if ((c.friends && c.friends.length) || c.example) {
    items.push({ kind: 'rule', html: `<hr class="pc-rule">` });
    items.push({ kind: 'label', html: `<div class="pc-section-label">her friend</div>` });
    (c.friends || []).forEach(line => {
      const [phrase, zh] = line.split('|').map(s => s.trim());
      items.push({ kind: 'colloc', html: `<div class="pc-row pc-row--phrase pc-play-row" data-sp="${escapeAttr(phrase)}">
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

  // HER KIN — same row-by-row pattern.  Each kin entry has TWO
  // phrases (joined by " / " in the JSON), each becoming its own
  // tap-to-reveal row with audio.
  if (c.kin && c.kin.length) {
    items.push({ kind: 'rule', html: `<hr class="pc-rule">` });
    items.push({ kind: 'label', html: `<div class="pc-section-label">her kin</div>` });
    c.kin.forEach(line => {
      const [w, posZh, phraseBlob, phraseZhBlob] = line.split('|').map(s => s ? s.trim() : '');
      const phraseList   = (phraseBlob   || '').split(/\s*\/\s*/).filter(Boolean);
      const phraseZhList = (phraseZhBlob || '').split(/\s*[；;\/]\s*/).filter(Boolean);
      items.push({ kind: 'kin', html: `<div class="pc-row pc-play-row" data-sp="${escapeAttr(w)}">
        <button class="pc-play">♪</button>
        <span class="pc-line-word">${pcLinkify(w)}</span>
        <span class="pc-line-word-zh">${escapeHtml(posZh || '')}</span>
      </div>` });
      phraseList.forEach((ph, idx) => {
        const zh = phraseZhList[idx] || '';
        items.push({ kind: 'kin-ph', html: `<div class="pc-row pc-row--phrase pc-play-row" data-sp="${escapeAttr(ph)}">
          <button class="pc-play">♪</button>
          <span class="pc-line-phrase">${pcLinkify(ph)}</span>
          <span class="pc-line-zh">${escapeHtml(zh)}</span>
        </div>` });
      });
    });
  }

  // v=75 — HER GROUP: semantic siblings.  Now ROW-BY-ROW like family
  // /kin so the user can hear each group word pronounced when it
  // reveals.  Each entry follows the same pipe layout; we read the
  // word + its zh on row 1 and the phrase (if any) on row 2.
  if (c.group && c.group.length) {
    items.push({ kind: 'rule', html: `<hr class="pc-rule">` });
    items.push({ kind: 'label', html: `<div class="pc-section-label">her group</div>` });
    c.group.forEach(line => {
      const [w, posZh, phrase, phraseZh] = line.split('|').map(s => s ? s.trim() : '');
      if (!w) return;
      items.push({ kind: 'group', html: `<div class="pc-row pc-play-row" data-sp="${escapeAttr(w)}">
        <button class="pc-play">♪</button>
        <span class="pc-line-word">${pcLinkify(w)}</span>
        <span class="pc-line-word-zh">${escapeHtml(posZh || '')}</span>
      </div>` });
      if (phrase) {
        items.push({ kind: 'group-ph', html: `<div class="pc-row pc-row--phrase pc-play-row" data-sp="${escapeAttr(phrase)}">
          <button class="pc-play">♪</button>
          <span class="pc-line-phrase">${pcLinkify(phrase)}</span>
          <span class="pc-line-zh">${escapeHtml(phraseZh || '')}</span>
        </div>` });
      }
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
  // v=75 — reveal kinds that play audio on reveal.  Every "content"
  // row (family / kin / phrase / colloc / group / example) is in
  // here so every tap speaks the line that just appeared.
  const SPEAKING_KINDS = new Set([
    'fam', 'fam-ph', 'kin', 'kin-ph', 'colloc', 'example',
    'group', 'group-ph', 'neighbor'
  ]);
  function advanceReveal() {
    if (revealIdx >= nodes.length) return false;
    // Reveal everything from revealIdx until the next "content" kind
    // (a row with audio) inclusive.  Rules + labels are taken along
    // for the ride.
    while (revealIdx < nodes.length) {
      const it = items[revealIdx];
      nodes[revealIdx].classList.remove('is-staged');
      nodes[revealIdx].classList.add('is-revealed');
      const isContent = SPEAKING_KINDS.has(it.kind);
      revealIdx++;
      if (isContent) break;
    }
    // Most recently revealed content row → play its audio.
    const lastContent = [...nodes].slice(0, revealIdx).reverse()
      .find(n => Array.from(n.classList).some(cls =>
        cls.startsWith('pc-kind-') && SPEAKING_KINDS.has(cls.slice('pc-kind-'.length))
      ));
    if (lastContent) {
      const sp = lastContent.getAttribute('data-sp')
              || lastContent.querySelector('[data-sp]')?.getAttribute('data-sp');
      const playRow = lastContent.querySelector('.pc-play-row') || lastContent;
      veil.querySelectorAll('.is-playing').forEach(n => n.classList.remove('is-playing'));
      playRow.classList.add('is-playing');
      if (sp) speak(sp);
    }
    // v=78 — parchment reveal now uses the soft ink-scratch sound
    // (pencil on paper) so the reveal feels like writing rather than
    // a generic page-turn.
    (SFX.inkScratch ? SFX.inkScratch : SFX.tap)();
    veil.querySelector('.pc-tap-hint')?.classList.add('is-gone');
    const justRevealed = nodes[revealIdx - 1];
    if (justRevealed) {
      requestAnimationFrame(() => justRevealed.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    }
    return revealIdx < nodes.length;
  }
  // v=72 — tap routing on parchment:
  //   · ANY tap on the .parchment-inner advances the reveal
  //     (this is where the actual readable content lives)
  //   · taps on .pc-close / .pc-play / .pc-note-add stay scoped
  //   · taps on the CARD's transparent padding (= visible scroll
  //     edge / blank margin) CLOSE the parchment, because that's
  //     the natural "fold this page" gesture the user expects
  //   · taps on the veil (outside the card entirely) also close
  veil.querySelector('.parchment-card').addEventListener('click', e => {
    if (e.target.closest('.pc-close, .pc-play, .pc-note-add')) return;
    if (e.target.closest('.parchment-inner')) {
      advanceReveal();
    } else {
      // tap landed in the card's transparent padding band — close
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

  // v=75 — .pc-close button removed; close happens via tap on the
  // veil/padding (handled above).  The querySelector guard keeps
  // legacy code paths safe.
  const _legacyClose = veil.querySelector('.pc-close');
  if (_legacyClose) _legacyClose.addEventListener('click', e => {
    e.stopPropagation();
    closeParchment();
  });
  // v=78 — parchment copy field doubles as a self-dictation box.
  // Compare what the user types (lowercase) against the headword;
  // when it matches, glow the input gold + play a small sparkle so
  // the muscle-memory practice gets a tactile reward.  User: "写对
  // 了之后字体发光一下".
  const copyInput = veil.querySelector('.pc-copy-input');
  if (copyInput) {
    const target = (c.h || '').toLowerCase();
    let _matched = false;
    copyInput.addEventListener('input', () => {
      const v = (copyInput.value || '').trim().toLowerCase();
      if (v === target && !_matched) {
        _matched = true;
        copyInput.classList.add('is-correct');
        try { SFX.scoreOk && SFX.scoreOk(); } catch {}
      } else if (v !== target && _matched) {
        _matched = false;
        copyInput.classList.remove('is-correct');
      }
    });
  }
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

// v=70 — index now groups words by THEMED CHAPTER instead of
// first letter (user: "按照首字母分的没有规律 我们是按照主题分的").
// Each word is filed under the FIRST chapter that introduces it;
// orphans (cards never used by any chapter) get an "unsorted" bin
// at the bottom.  Search still filters across every row.          */
function _resolveChapterWords(ch) {
  const set = new Set();
  (ch.match_group_ids || []).forEach(gid => {
    const g = MATCH_GROUPS[gid];
    if (!g) return;
    if (g.head)    set.add(g.head);
    if (g.partner) set.add(g.partner);
  });
  (ch.reading_question_ids || []).forEach(rid => {
    const q = _SCENE_BY_ID[rid];
    if (q && q.answers) q.answers.forEach(w => set.add(w));
  });
  (ch.dictation_question_ids || []).forEach(tok => {
    const m = /^DICT_(\d+)$/.exec(tok);
    if (!m) return;
    const d = _DICT_ARR[+m[1]];
    if (d && d.head) set.add(d.head);
  });
  return Array.from(set);
}
let _wordChapterCache = null;
function _wordToChapterMap() {
  if (_wordChapterCache) return _wordChapterCache;
  _wordChapterCache = new Map();
  _CHAPTER_PLAN.forEach((ch, idx) => {
    _resolveChapterWords(ch).forEach(w => {
      if (!_wordChapterCache.has(w)) {
        _wordChapterCache.set(w, { idx, theme: ch.theme });
      }
    });
  });
  return _wordChapterCache;
}

function renderIndexLikePage(el, { title, words, backTo = 'cover', fromKey = 'index' }) {
  // Group by FIRST LETTER (A–Z) — the index is "the index", a
  // straight A-to-Z dictionary lookup.  Chapter-based browsing
  // lives on the SEPARATE chapter-catalog screen (cover-side).
  const groups = {};
  words.forEach(h => {
    const k = h[0].toUpperCase();
    (groups[k] = groups[k] || []).push(h);
  });
  const letters = Object.keys(groups).sort();
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
      if (!c) return;
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

      // Continue Reading — picks up at the LAST unfinished stage
      // within the current chapter.  saved.stage tracks the highest
      // stage the user has reached (1, 2, or 3); on cover entry we
      // resume at that stage so a passed stage 1 + stage 2 lands
      // the user directly on the dictation.  User: "Tonight Reading
      // 不是继续游戏吗 — 应该从默写继续开始".
      const resumeStage = saved.stage && saved.stage >= 1 && saved.stage <= 3 ? saved.stage : 1;
      const ctaLabel = resumeStage > 1 ? `Continue · Stage ${resumeStage}` : 'Continue Reading';
      $('#cover-cta-slot', el).appendChild(mainCTA(ctaLabel, () => {
        LanBGM.unlock();
        const fade = document.createElement('div');
        fade.className = 'fade-out';
        document.body.appendChild(fade);
        requestAnimationFrame(() => fade.classList.add('show'));
        setTimeout(() => {
          freshSession();
          go('stage' + resumeStage);
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

      // v=71 — "Chapter Catalog" link under the Restart Game pill.
      // Opens the themed-chapter list so the user can jump into a
      // weak chapter (or any chapter) without going through the
      // sequential "Continue Reading" path.
      const catalog = document.createElement('button');
      catalog.className = 'cover-restart-btn cover-catalog-btn';
      catalog.innerHTML = `<span class="cr-glyph">❦</span><span class="cr-text">Chapter Catalog</span><span class="cr-chapter">${_CHAPTER_PLAN.length} chapters</span>`;
      catalog.addEventListener('click', () => {
        SFX.tap();
        go('chapter-catalog');
      });
      $('#cover-restart-slot', el).appendChild(catalog);

      // v=70 — route through go() so the cover-side soft veil
      // (the gentler purple wash) actually fires, instead of the
      // legacy transitionTo() which dropped its own dark page-veil
      // and bypassed the cover-side detection in go().
      $('#cover-links', el).appendChild(lilGhost('Her Note',  () => go('note')));
      $('#cover-links', el).appendChild(lilGhost('The Index', () => go('index')));
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
          (SFX.cardFlip ? SFX.cardFlip : SFX.tap)();
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
        // v=77 — passed stage 1 → unlock stage 2 (saved.stage = 2)
        // so a mid-chapter exit resumes on the right stage.
        if ((saved.stage || 1) < 2) { saved.stage = 2; Store.save(); }
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
        // v=77 — colour BOTH body and text by pair-N (the TRUE pair
        // id), so each correctly-belonging pair shares ONE colour
        // across left + right.  User: "用左边一列的字体颜色来让右
        // 列的正确对应卡牌整成相应的颜色".  Wrong pairs get a
        // visible ✗ mark in the corner instead of relying on colour
        // mismatch to read "wrong" (which was confusing when blue
        // body had orange text).                                  */
        tile.className = `card card--match ${sideClass} tag-${r.pairId} pair-${r.pairId} ${state}`;
        const wrongMark = r.correct ? '' : '<span class="pair-mark pair-mark-wrong">✗</span>';
        tile.innerHTML = `
          <span class="mc-frame"></span>
          <span class="mc-text">${escapeHtml(r.text)}</span>
          ${flourish}
          ${wrongMark}
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
      const el = $('#screen-stage2');
      state.sceneIdx        = 0;
      state.sceneFills      = [];          // user's pick per blank
      state.sceneActive     = -1;          // -1 = no blank selected yet
      state.scenePerBlank   = null;        // [[4],[4],...] candidates per blank
      state.sceneGraded     = false;
      el.innerHTML = `
        ${stageHeader(2, 'The Reading')}
        <div class="oracle-stage" id="oracle-stage"></div>
      `;
      el.appendChild(closeCorner({ to: 'cover' }));
      drawQ();

      function currentQ() { return state.session.scenes[state.sceneIdx]; }

      // v=65 — Per-blank option group.  For each answer pick 3 same-
      // first-letter distractors from PARCHMENT_CARDS.  Only the
      // ACTIVE blank's 4 candidates are visible at a time; clicking
      // another blank swaps the option strip.                       */
      function buildOptionsFor(q) {
        // v=78 — distractors are RANDOM across all PARCHMENT_CARDS
        // (NOT same-first-letter).  User: "我知道这个单词的意思
        // 一下就知道该选哪个 完全没有学习意义".  Same first letter
        // collapsed the puzzle to "pick the longer one I recognise"
        // — random distractors restore the lexical-comprehension
        // test.  Pool is fully randomised each call too.
        const answers = (q.answers || []).slice();
        const taken = new Set(answers);
        const fullPool = Object.keys(PARCHMENT_CARDS).filter(w => w && !taken.has(w));
        return answers.map(ans => {
          // Each blank gets 3 fresh distractors from the global pool.
          const distractors = [];
          const local = shuffle(fullPool);
          for (const w of local) {
            if (taken.has(w)) continue;
            distractors.push(w);
            taken.add(w);
            if (distractors.length === 3) break;
          }
          while (distractors.length < 3 && (q.options || []).length) {
            const cand = q.options.find(o => !taken.has(o) && o !== ans);
            if (!cand) break;
            taken.add(cand);
            distractors.push(cand);
          }
          return shuffle([ans, ...distractors]);
        });
      }

      function drawQ() {
        const stage = $('#oracle-stage', el);
        const q = currentQ();
        const total = state.session.scenes.length;
        state.scenePerBlank    = buildOptionsFor(q);
        state.sceneFills       = new Array(q.blank_count || q.answers.length).fill(null);
        // v=65 — start with the first blank active so the user sees
        // the 4-card option strip immediately; tapping another
        // blank swaps the strip.
        state.sceneActive      = 0;
        state.sceneGraded      = false;
        stage.innerHTML = `
          <div class="q-progress">${String(state.sceneIdx + 1).padStart(2, '0')} · ${String(total).padStart(2, '0')}</div>
          <div class="q-card">
            <span class="q-corner q-corner-tl">✦</span>
            <span class="q-corner q-corner-tr">✦</span>
            <span class="q-corner q-corner-bl">✦</span>
            <span class="q-corner q-corner-br">✦</span>
            <div class="q-zh" id="q-zh-host">${escapeHtml(q.sentence_zh || '')}</div>
            <div class="q-sentence q-sentence-blanks" id="q-sentence-host">${renderBlankSentence(q)}</div>
            <img class="q-bow q-bow-inside" src="assets/icon-bow.png?v=31" alt="" aria-hidden="true">
          </div>
          <div class="q-hint" id="q-hint">— pick the word that fits this blank —</div>
          <div class="oracle-options" id="oracle-options"></div>
        `;
        wireSlots();
        renderOptionsForActive();
      }

      function renderBlankSentence(q) {
        let slotIdx = 0;
        return escapeHtml(q.blank_sentence).replace(/_{3,}/g, () => {
          const i = slotIdx++;
          const filled  = state.sceneFills[i];
          const active  = (i === state.sceneActive);
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

      // v=79 — event delegation on the sentence host.  ONE click
      // listener on the parent instead of N listeners per slot
      // re-bound on every render — eliminates the re-bind cost +
      // the layout thrash that caused stage 2 to stutter on click.
      function wireSlots() {
        const host = $('#q-sentence-host', el);
        if (!host || host._sealyraSlotsWired) return;
        host._sealyraSlotsWired = true;
        host.addEventListener('click', (ev) => {
          const slot = ev.target.closest('.q-slot');
          if (!slot || !host.contains(slot)) return;
          ev.stopPropagation();
          const i = +slot.getAttribute('data-slot');
          SFX.tap();
          state.sceneActive = i;
          host.innerHTML = renderBlankSentence(currentQ());
          renderOptionsForActive();
        });
      }

      // v=79 — event-delegated option clicks.  Wire ONCE on the host,
      // then renderOptionsForActive just rebuilds child DOM without
      // having to re-add listeners per render.  Heavy-gradient cards
      // (8 fibre dots + sheen + base) were re-binding 4 click
      // listeners on every blank switch — the cause of the stage-2
      // stutter the user kept feeling.
      function ensureOptionsHostWired() {
        const host = $('#oracle-options', el);
        if (!host || host._sealyraOptsWired) return;
        host._sealyraOptsWired = true;
        host.addEventListener('click', (ev) => {
          const btn = ev.target.closest('.card--option');
          if (!btn || !host.contains(btn)) return;
          onOptionClick(ev, btn.dataset.word, btn);
        });
      }
      function renderOptionsForActive() {
        const host = $('#oracle-options', el);
        const hint = $('#q-hint', el);
        host.innerHTML = '';
        ensureOptionsHostWired();
        if (state.sceneActive < 0 || !state.scenePerBlank) {
          if (hint) hint.textContent = state.sceneGraded
            ? '— tap a blank to review its choices · tap the bow when done —'
            : '— tap a blank to see its choices —';
          return;
        }
        if (hint) hint.textContent = state.sceneGraded
          ? '— tap any card to read its page —'
          : '— pick the word that fits this blank —';
        const q = currentQ();
        const answers = q.answers || [];
        const group = state.scenePerBlank[state.sceneActive] || [];
        const userPickHere = state.sceneFills[state.sceneActive];
        // Build with DocumentFragment so the browser layouts ONCE
        // (instead of 4 times on appendChild).
        const frag = document.createDocumentFragment();
        group.forEach(word => {
          let cls = 'card card--option';
          if (state.sceneGraded) {
            const isCorrectForThis = answers[state.sceneActive] === word;
            const isUserPickHere   = userPickHere === word;
            if (isCorrectForThis) cls += ' reveal-right';
            else if (isUserPickHere) cls += ' picked-wrong';
            cls += ' is-readable';
          } else if (userPickHere === word) {
            cls += ' is-current-pick';
          }
          const b = document.createElement('button');
          b.className = cls;
          b.innerHTML = `<span class="mc-frame"></span><span class="mc-text">${escapeHtml(word)}</span>`;
          b.dataset.word = word;
          frag.appendChild(b);
        });
        host.appendChild(frag);
      }

      function onOptionClick(ev, word, btn) {
        ev.stopPropagation();
        if (state.sceneGraded) {
          if (!PARCHMENT_CARDS[word]) return;
          SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
          showParchment(word);
          return;
        }
        if (state.sceneActive < 0) return;
        const i = state.sceneActive;
        btn.classList.add('is-flipping');
        (SFX.cardFlip ? SFX.cardFlip : SFX.tap)();
        setTimeout(() => {
          state.sceneFills[i] = word;
          // Advance active marker to next empty slot, or stay.
          let next = state.sceneFills.indexOf(null);
          if (next < 0) next = -1;   // all filled → no active blank
          state.sceneActive = next;
          $('#q-sentence-host').innerHTML = renderBlankSentence(currentQ());
          wireSlots();
          renderOptionsForActive();
          if (!state.sceneFills.includes(null)) {
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
        try { speak(q.full_sentence); } catch {}
        // Repaint: q-card keeps user's picks (no auto-fill).  Add
        // .is-graded so CSS reveals the zh hint above the top rule.
        state.sceneActive = -1;
        const card = $('.q-card', el);
        if (card) card.classList.add('is-graded');
        $('#q-sentence-host').innerHTML = renderBlankSentence(q);
        wireSlots();
        renderOptionsForActive();
        armBowAdvance();
      }

      let _advanced = false;
      function armBowAdvance() {
        // v=72 — bind on the q-card itself (with target check).  The
        // bare bow <img> sometimes wasn't catching taps reliably.
        // _advanced guard prevents double-fire if both the bow and
        // the card-level listener trigger.
        const bow = $('.q-bow.q-bow-inside', el);
        if (bow) bow.classList.add('is-tappable');
        const card = $('.q-card', el);
        if (card) {
          card.addEventListener('click', (ev) => {
            if (!state.sceneGraded) return;
            if (ev.target.closest('.q-slot, .card--option')) return;
            advance(ev);
          });
        }
      }

      function advance(ev) {
        if (_advanced) return;
        _advanced = true;
        if (ev) ev.stopPropagation();
        SFX.pageTurn ? SFX.pageTurn() : SFX.tap();
        state.sceneIdx++;
        _advanced = false;
        if (state.sceneIdx >= state.session.scenes.length) go('stage2-result');
        else drawQ();
      }
    }
  },

  /* ---------- STAGE 2 RESULT ---------- */
  'stage2-result': {
    onEnter() {
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
        // v=77 — passed stage 2 → unlock stage 3 (saved.stage = 3).
        if ((saved.stage || 1) < 3) { saved.stage = 3; Store.save(); }
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
        saved.stage   = 1;   // v=77 — new chapter starts at stage 1
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
     v=66 — simplified per user.  One bucket only: words mistaken
     THREE or more times ("haunting words" / "重点关注错题").  Each
     word renders as the same expanded review card the stage-3
     result uses, so users browse the full study UI inline.  No
     soft-slip bucket, no separate detail page.                   */
  note: {
    onEnter() {
      const el = $('#screen-note');
      const m = saved.mistakes || {};
      // Haunting = mistaken 3+ times, AND has a parchment card.
      const haunting = Object.entries(m)
        .filter(([w, c]) => c >= 3 && PARCHMENT_CARDS[w])
        .sort((a, b) => b[1] - a[1])                  // most-mistaken first
        .map(([w]) => w);
      // Saved keys (her note bookmarks).
      const bookmarked = Object.keys(saved.notes || {})
        .filter(w => PARCHMENT_CARDS[w])
        .sort();

      el.innerHTML = `
        <div class="note-page">
          ${pageTitle('Her Little Note')}
          <div class="note-sub">— words that haunted her thrice or more —</div>
          <div class="note-haunt-stack"></div>
          ${bookmarked.length ? `
            <div class="note-sub note-sub--keys">— and the ones she keyed away —</div>
            <div class="note-keys-stack"></div>
          ` : ''}
          ${(!haunting.length && !bookmarked.length) ? `
            <div class="note-empty">her notebook is still untouched.</div>
          ` : ''}
        </div>
      `;
      el.appendChild(closeCorner());

      const hStack = $('.note-haunt-stack', el);
      haunting.forEach(w => {
        const card = renderReviewCard(w);
        const badge = document.createElement('span');
        badge.className = 'note-mistake-badge';
        badge.textContent = `× ${m[w]}`;
        card.prepend(badge);
        hStack.appendChild(card);
      });
      const kStack = $('.note-keys-stack', el);
      if (kStack) bookmarked.forEach(w => kStack.appendChild(renderReviewCard(w)));
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

  /* ---------- CHAPTER CATALOG (cover-side) ----------
     v=71 — every themed chapter listed with mistake-count badges
     pulled from saved.mistakes, so the user can spot weak chapters
     and jump straight into one for re-play.  Tapping a row sets
     saved.chapter, freshens the session, and routes into stage 1.  */
  'chapter-catalog': {
    onEnter() {
      const el = $('#screen-chapter-catalog');
      const m = saved.mistakes || {};
      // Per-chapter mistake count (sum of mistakes on its words).
      const stats = _CHAPTER_PLAN.map((ch, idx) => {
        const words = _resolveChapterWords(ch);
        const mistakes = words.reduce((sum, w) => sum + (m[w] || 0), 0);
        const weak = mistakes >= 3;
        return { idx, ch, words, mistakes, weak };
      });
      // Sort: weak chapters first (most mistaken), then sequential.
      const weakList   = stats.filter(s => s.weak).sort((a, b) => b.mistakes - a.mistakes);
      const restList   = stats.filter(s => !s.weak);

      el.innerHTML = `
        <div class="catalog-page">
          ${pageTitle('Chapter Catalog')}
          <div class="catalog-sub">— ${stats.length} chapters · current: ${saved.chapter || 1} —</div>
          ${weakList.length ? `
            <div class="catalog-section-title">weak chapters · revisit</div>
            <div class="catalog-stack" id="cat-weak"></div>
          ` : ''}
          <div class="catalog-section-title">all chapters</div>
          <div class="catalog-stack" id="cat-all"></div>
        </div>
      `;
      el.appendChild(closeCorner({ to: 'cover' }));

      const renderRow = (host, s) => {
        const row = document.createElement('button');
        row.className = 'catalog-row' + (s.weak ? ' is-weak' : '') + (s.idx + 1 === saved.chapter ? ' is-current' : '');
        const themeLabel = s.ch.theme || `Chapter ${s.idx + 1}`;
        row.innerHTML = `
          <span class="cat-num">chapter ${s.idx + 1}</span>
          <span class="cat-leader" aria-hidden="true"></span>
          <span class="cat-theme">${escapeHtml(themeLabel)}</span>
          ${s.mistakes > 0 ? `<span class="cat-mistakes">× ${s.mistakes}</span>` : ''}
        `;
        row.addEventListener('click', () => {
          SFX.tap();
          showModal({
            title: themeLabel,
            body: `Start chapter ${s.idx + 1}?  Your current chapter mark is ${saved.chapter || 1}.`,
            actions: [
              { label: 'cancel',     variant: 'ghost', onClick: () => {} },
              { label: 'play',       variant: '',     onClick: () => {
                saved.chapter = s.idx + 1;
                Store.save();
                freshSession();
                go('stage1');
              }}
            ]
          });
        });
        host.appendChild(row);
      };

      const weakHost = $('#cat-weak', el);
      if (weakHost) weakList.forEach(s => renderRow(weakHost, s));
      const allHost = $('#cat-all', el);
      stats.forEach(s => renderRow(allHost, s));
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
    // v=71 — unlock + play DIRECTLY here.  We used to route through
    // _ensureBGM behind a gate, but the gate left BGM silent.  Now:
    //   1. Synchronously unlock the AudioContext (must be inside
    //      the gesture handler for iOS to honour it).
    //   2. Reset _lastBgmGroup so the next _ensureBGM call (any
    //      screen change) is treated as a group change.
    //   3. Kick the first track explicitly so BGM is audible from
    //      the very first cover render.
    // v=74 — initial cover render schedules notes against a still-
    // suspended AudioContext.  By the time the user finally taps,
    // 3–5 schedule ticks have accumulated step++ + queued oscillators
    // at t≈0.05, which all fire AT ONCE on resume (a chord blast).
    // Fix: synchronously unlock → STOP (clears stale timer + step)
    // → play fresh.  Track now restarts from melody[0].
    try { LanBGM.unlock(); } catch {}
    try { LanBGM.stop();   } catch {}
    _lastBgmGroup = null;
    try { LanBGM.playHomeRandom({ force: true, volume: 0.42 }); } catch {}
    _lastBgmGroup = BGM_GROUP_BY_SCREEN[state.screen || 'cover'] || 'home-side';
  };
  intro.addEventListener('touchend', onFirstTap, { passive: false });
  intro.addEventListener('click',    onFirstTap);
  document.addEventListener('click', swallowFollowUp, true);
});
