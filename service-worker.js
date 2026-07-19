const CACHE_NAME = 'bbs-engine-cache-v1';
const urlsToCache = [
  'index.html',
  'privacy.html',
  'manifest.json'
];

// Service Worker Install karna aur files ko cache me save karna
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Offline hone par cache se files load karna
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Cache se return karo
        }
        return fetch(event.request); // Internet se load karo
      })
  );
});
