/* Sealyra service worker — cache-first for images + data + scripts.
   Cache key includes the per-asset ?v= query string so a fresh push
   silently retires the old cache entry, and the second open of any
   given version is INSTANT (no re-download).  Old caches are pruned
   on activate.                                                        */
const CACHE = 'sealyra-v74';

self.addEventListener('install', (event) => {
  // Take over as soon as installed; previous SW (if any) is replaced.
  self.skipWaiting();
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
  // Only handle GETs.
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Only handle same-origin requests; let the browser handle external
  // (font CDN, etc.).
  if (url.origin !== self.location.origin) return;
  // Skip the service worker file itself.
  if (url.pathname.endsWith('/sw.js')) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: false });
    if (cached) return cached;
    try {
      const res = await fetch(req);
      // Only cache successful, basic responses (not opaque cross-origin).
      if (res && res.status === 200 && res.type === 'basic') {
        cache.put(req, res.clone());
      }
      return res;
    } catch (err) {
      // Network failed and no cache — bubble the error.
      throw err;
    }
  })());
});
