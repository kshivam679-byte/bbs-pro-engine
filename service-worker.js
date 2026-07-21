const CACHE_NAME = 'bbs-engine-cache-v2';
const urlsToCache = [
  './',
  'index.html',
  'privacy.html',
  'manifest.json'
];

// Service Worker Install karna aur files ko cache me save karna
self.addEventListener('install', event => {
  self.skipWaiting(); // Naye Service Worker ko turant activate karega
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Purane Cache ko Delete karna
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
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
