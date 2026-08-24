const CACHE = 'agenda-shell-v3';
const SHELL = ['./index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Network-first for the app shell: always try to get the latest version
// when online, and only fall back to the cached copy when offline.
//
// {cache: 'no-store'} matters here: without it, fetch() can still be
// quietly answered by the *browser's own* HTTP cache (separate from the
// Cache Storage this service worker manages) if GitHub Pages sends
// cacheable headers, which is what was still causing stale loads even
// with a "network-first" strategy.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(e.request, {cache: 'no-store'})
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
