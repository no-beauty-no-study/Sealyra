/* Sealyra service worker — cache-first for images + data + scripts.
   Cache key includes the per-asset ?v= query string so a fresh push
   silently retires the old cache entry, and the second open of any
   given version is INSTANT (no re-download).  Old caches are pruned
   on activate.                                                        */
const VERSION = 'v81';
const CACHE = `sealyra-${VERSION}`;

/* v=81 — PRECACHE LIST.  Every asset the user might hit before the
   end-of-session is fetched right after install, so even brand-new
   screens (stage backgrounds, painted frames) appear instantly the
   first time the user navigates to them.  Adds maybe ~3 MB to the
   install fetch but eliminates the "blank screen for 2 seconds"
   the user kept seeing on screen change.                            */
const PRECACHE = [
  './',
  `./index.html`,
  `./styles.css?${VERSION}`,
  `./app.js?${VERSION}`,
  `./bgm.js?${VERSION}`,
  `./data.js?${VERSION}`,
  `./assets/bg-cover.jpg?${VERSION}`,
  `./assets/bg-stage.jpg?${VERSION}`,
  `./assets/bg-result.jpg?${VERSION}`,
  `./assets/bg-note.jpg?${VERSION}`,
  `./assets/banner.png?${VERSION}`,
  `./assets/3C68C8E6-B3FB-43A6-AE2C-CBDE19872718.png?${VERSION}`,
  `./assets/6794E86E-172C-4BB8-ACCB-A167D352E97B.png?${VERSION}`,
  `./assets/E993B660-7AD9-4806-AA02-4ADC58F30901.png?${VERSION}`,
  `./assets/0511DE6F-6C8F-4E5D-9742-5E5AD77DCD98.png?${VERSION}`,
  `./assets/DCE4B4FE-19E7-4404-93CF-D8A57B6B2AB6.png?${VERSION}`,
  `./assets/modal-frame.png?${VERSION}`,
  `./assets/icon-star8.png?${VERSION}`,
  `./assets/icon-bow.png?${VERSION}`,
  `./assets/icon-quill.png?${VERSION}`,
  `./assets/icon-moon.png?${VERSION}`,
  `./assets/icon-key.png?${VERSION}`,
  `./assets/icon-spark-s.png?${VERSION}`,
  `./assets/icon-spark-m.png?${VERSION}`,
  `./assets/icon-spark-l.png?${VERSION}`
];

self.addEventListener('install', (event) => {
  // Take over as soon as installed; previous SW (if any) is replaced.
  self.skipWaiting();
  // Precache all critical assets in parallel.  Don't reject the whole
  // install if a single asset 404s — log and continue.
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(PRECACHE.map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'reload' });
        if (res && res.status === 200) {
          await cache.put(url, res);
        }
      } catch {}
    }));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Prune any older cache versions.
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.endsWith('/sw.js')) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Try exact match first (matches ?v= query).
    let cached = await cache.match(req, { ignoreSearch: false });
    if (cached) return cached;
    // Fallback: try ignoring the search params.  If the user is on
    // the same VERSION but for some reason the request didn't match
    // exactly, the precached entry under the canonical URL still
    // counts.
    cached = await cache.match(req, { ignoreSearch: true });
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone()).catch(() => {});
      }
      return res;
    } catch (err) {
      throw err;
    }
  })());
});
