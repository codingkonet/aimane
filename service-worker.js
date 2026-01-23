
const CACHE_NAME = 'koinclick-v2-cache';
const OFFLINE_URL = 'index.html';

// Critical assets needed for the app to start
const CRITICAL_ASSETS = [
  './',
  'index.html',
  'index.tsx',
  'manifest.json',
  'https://cdn.tailwindcss.com'
];

// Optional assets that shouldn't break installation if missing
const OPTIONAL_ASSETS = [
  'favicon.svg',
  'https://esm.sh/recharts@^3.6.0',
  'https://esm.sh/react@^19.2.3',
  'https://esm.sh/react-dom@^19.2.3'
];

// Install: Cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Installing and caching assets');
      
      // We wrap critical assets in a promise that must succeed
      const criticalPromise = cache.addAll(CRITICAL_ASSETS);
      
      // Optional assets are cached individually so they don't break the build
      const optionalPromises = OPTIONAL_ASSETS.map(url => 
        cache.add(url).catch(err => console.warn(`[SW] Could not cache optional asset: ${url}`))
      );

      return Promise.all([criticalPromise, ...optionalPromises]);
    })
  );
  self.skipWaiting();
});

// Activate: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first falling back to cache
self.addEventListener('fetch', (event) => {
  // Navigation requests (user clicking links or typing URL)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Generic assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        // Cache successful responses for future offline use
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for missing images
        if (event.request.destination === 'image') {
          return caches.match('favicon.svg');
        }
      });
    })
  );
});