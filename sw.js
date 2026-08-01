const CACHE_NAME = 'rajem-pos-v3';
const APP_SHELL = [
  '/rajem/',
  '/rajem/index.html',
  '/rajem/manifest.json',
  '/rajem/icon-192.png',
  '/rajem/icon-512.png'
];

// 1. INSTALL: Save all files
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// 2. ACTIVATE: Clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// 3. FETCH: Serve from cache when offline
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});