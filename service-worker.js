
const CACHE_NAME = 'koinclick-v1-cache';
const OFFLINE_URL = '/index.html';

const urlsToCache = [
  '/',
  '/index.html',
  '/vite.svg',
  '/manifest.json',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',

  // Core scripts
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/translations.ts',
  '/hooks/useLocalStorage.ts',
  '/context/LanguageContext.tsx',
  '/utils/formatting.ts',
  '/utils/currencyConverter.ts',

  // Components
  '/components/Header.tsx',
  '/components/SummaryCard.tsx',
  '/components/BudgetTracker.tsx',
  '/components/TransactionForm.tsx',
  '/components/TransactionList.tsx',
  '/components/BudgetChart.tsx',
  '/components/TransactionFilter.tsx',
  '/components/CurrencyConverter.tsx',
  '/components/ThemeToggle.tsx',
  '/components/Footer.tsx',
  '/components/PWAInstaller.tsx',

  // Pages
  '/pages/DashboardPage.tsx',
  '/pages/HomePage.tsx',
  '/pages/LoginPage.tsx',
  '/pages/RegisterPage.tsx',
  '/pages/AdminDashboardPage.tsx',
  '/pages/BlogPage.tsx',
  '/pages/CreateArticlePage.tsx',
  '/pages/ArticleDetailPage.tsx',

  // External libraries
  'https://cdn.tailwindcss.com',
  'https://esm.sh/recharts@^3.6.0',
  'https://esm.sh/react@^19.2.3',
  'https://esm.sh/react-dom@^19.2.3'
];

// Install: Cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(urlsToCache);
    })
  );
  // Force the waiting service worker to become the active service worker.
  self.skipWaiting();
});

// Activate: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all open clients immediately.
  self.clients.claim();
});

// Fetch: Network first, then cache, with offline fallback
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Don't cache if not a success or if it's an external API that shouldn't be cached
        if (!fetchResponse || fetchResponse.status !== 200) {
          return fetchResponse;
        }
        
        // Clone the response to store in cache
        const responseToCache = fetchResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return fetchResponse;
      });
    }).catch(() => {
      // Fallback for images or other assets if they fail
      if (event.request.destination === 'image') {
        return caches.match('/assets/icons/icon-192x192.png');
      }
    })
  );
});
