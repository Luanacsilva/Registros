// frontend/service.worker.js

const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/pwa.manifest',
  '/forgot-password.html',
  '/reset-password.html'
];

// Instalação do Service Worker e cache dos recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Recuperação dos recursos do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Retorna o recurso do cache
        }
        return fetch(event.request); // Faz a requisição à rede se não estiver no cache
      })
  );
});

// Atualização do Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('mediothec-cache').then((cache) => {
      return cache.addAll([
        './index.html',
        './style.css',
        './app.js',
        './manifest.json',
        './pages/admin.html',
        './pages/classes.html',
        './pages/forgot-password.html',
        './pages/profile.html',
        './pages/reset-password.html'
        // Adicione outros arquivos necessários para o cache
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
