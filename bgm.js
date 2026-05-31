/* v=110 — Lan BGM (mp3 player).
   Replaces the old Web Audio synth.  Plays the 14 mp3 tracks in
   assets/ per the user's pool config:

     cover         3 random   (cover / note / index / catalog)
     stage0        5 random   (stage 0 reading + quiz)
     stage1_game   fixed       1 track
     stage1_result fixed       1 track
     stage2_game   fixed       1 track
     stage2_result fixed       1 track
     stage3_game   fixed       1 track
     stage3_result fixed       1 track

   Public surface (kept compatible with app.js's existing callers):
     LanBGM.playForPool(poolName, opts)
     LanBGM.stop()
     LanBGM.playHomeRandom(opts)
     LanBGM.playGameRandom(opts)
     LanBGM.playResultRandom(opts)
     LanBGM.setVolume(v)
*/
(function () {
  const ASSET_BASE = 'assets/';
  const POOLS = {
    cover: {
      mode: 'random',
      tracks: [
        'bgm_demo_01_rabbit_key_at_midnight_v2_refined.mp3',
        'bgm_demo_04_moon_door_lullaby_v2_refined.mp3',
        'bgm_demo_11_garden_of_keys_v2_refined.mp3',
      ],
    },
    stage0: {
      mode: 'random',
      tracks: [
        'bgm_demo_02_ink_mice_in_the_margin_v2_refined.mp3',
        'bgm_demo_06_silver_book_spiral_v2_refined.mp3',
        'bgm_demo_08_velvet_lanterns_and_lace_v2_refined.mp3',
        'bgm_demo_12_mirror_lake_minuet_v2_refined.mp3',
        'bgm_demo_14_sleeping_ink_butterfly_v2_refined.mp3',
      ],
    },
    stage1_game:   { mode: 'fixed', track: 'bgm_demo_05_crooked_teacup_waltz_v2_refined.mp3' },
    stage1_result: { mode: 'fixed', track: 'bgm_demo_13_little_crown_corridor_v2_refined.mp3' },
    stage2_game:   { mode: 'fixed', track: 'bgm_demo_07_velvet_rabbit_staircase_v2_refined.mp3' },
    stage2_result: { mode: 'fixed', track: 'bgm_demo_09_ink_cat_clockwork_v2_refined.mp3' },
    stage3_game:   { mode: 'fixed', track: 'bgm_demo_03_inscription_under_moonlight_v2_refined.mp3' },
    stage3_result: { mode: 'fixed', track: 'bgm_demo_10_hush_before_inscription_v2_refined.mp3' },
  };

  let _audio = null;
  let _currentPool = null;
  let _currentTrack = null;
  let _volume = 0.42;
  let _fading = null;

  function _track(name) { return ASSET_BASE + name + '?v=110'; }
  function _pick(pool) {
    if (pool.mode === 'fixed') return pool.track;
    const ts = pool.tracks || [];
    if (ts.length === 0) return null;
    if (ts.length > 1 && _currentTrack) {
      const filtered = ts.filter(t => t !== _currentTrack);
      return filtered[Math.floor(Math.random() * filtered.length)];
    }
    return ts[Math.floor(Math.random() * ts.length)];
  }
  function _ensureAudio() {
    if (_audio) return _audio;
    _audio = new Audio();
    _audio.loop = true;
    _audio.preload = 'auto';
    _audio.volume = _volume;
    _audio.addEventListener('error', () => {});
    return _audio;
  }
  function _fadeTo(target, ms, done) {
    if (_fading) { clearInterval(_fading); _fading = null; }
    if (!_audio) { if (done) done(); return; }
    const start = _audio.volume;
    const steps = Math.max(1, Math.floor(ms / 40));
    let i = 0;
    _fading = setInterval(() => {
      i++;
      const t = i / steps;
      _audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
      if (i >= steps) { clearInterval(_fading); _fading = null; if (done) done(); }
    }, 40);
  }

  function stop() {
    if (!_audio) return;
    _fadeTo(0, 220, () => {
      try { _audio.pause(); } catch {}
      _audio.src = '';
      _currentPool = null;
      _currentTrack = null;
    });
  }

  function setVolume(v) {
    _volume = Math.max(0, Math.min(1, v));
    if (_audio && !_fading) _audio.volume = _volume;
  }

  function playForPool(poolName, opts = {}) {
    const pool = POOLS[poolName];
    if (!pool) return;
    if (!opts.force && _currentPool === poolName && _audio && !_audio.paused) return;
    const trackName = _pick(pool);
    if (!trackName) return;
    const url = _track(trackName);

    const a = _ensureAudio();
    const targetVol = typeof opts.volume === 'number' ? opts.volume : _volume;
    _volume = targetVol;

    const begin = () => {
      a.src = url;
      a.currentTime = 0;
      a.volume = 0;
      const p = a.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
      _fadeTo(targetVol, 600);
      _currentPool = poolName;
      _currentTrack = trackName;
    };
    if (_audio.src && !_audio.paused) {
      _fadeTo(0, 240, () => { try { a.pause(); } catch {}; begin(); });
    } else {
      begin();
    }
  }

  function playHomeRandom(opts)   { return playForPool('cover', opts); }
  function playGameRandom(opts)   { return playForPool((opts && opts.pool) || 'stage1_game',   opts); }
  function playResultRandom(opts) { return playForPool((opts && opts.pool) || 'stage1_result', opts); }

  // v=110 — unlock() restored.  Called from inside user-gesture
  // handlers (cover CTA, etc.) so the <audio> element is flagged
  // as user-activated for iOS / autoplay-blocked browsers.  Plays
  // a 1-frame silent buffer then immediately pauses, which is the
  // standard mp3 unlock dance.                                     */
  let _unlocked = false;
  function unlock() {
    if (_unlocked) return;
    const a = _ensureAudio();
    try {
      const wasMuted = a.muted;
      a.muted = true;
      // 1-second silent mp3 (base64), ~270 bytes
      a.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjQ1LjEwMAAAAAAAAAAAAAAA//tQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAACAAACcAACAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf//////////////////////////////////////////AAAAOUxBTUUzLjEwMAGqAAAAAC4AABRGJANcaAAAegAAAnA=';
      const p = a.play();
      const after = () => { try { a.pause(); a.src = ''; a.muted = wasMuted; } catch {}; _unlocked = true; };
      if (p && typeof p.then === 'function') p.then(after).catch(after);
      else after();
    } catch { _unlocked = true; }
  }

  window.LanBGM = {
    playForPool, stop, setVolume, unlock,
    playHomeRandom, playGameRandom, playResultRandom,
    play: playForPool,
  };
})();
