// Service Worker for PWA and Offline Support
const CACHE_NAME = 'ai-passport-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/shared/css/styles.css',
  '/shared/js/quiz-system.js',
  '/shared/js/page-navigation.js',
  '/shared/js/keyboard-shortcuts.js',
  '/shared/js/learning-tracker.js',
  '/shared/js/home-page.js',
  '/shared/js/pikmin-walk.js',
  '/shared/js/config/characters.js',
  '/shared/js/config/character-messages-bundle.js',
  '/shared/js/character-system.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Activate event - Clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});