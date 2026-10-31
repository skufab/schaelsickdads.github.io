// Service Worker nur für die Startseite.
// Er gilt technisch für die ganze Domain, fasst aber nur die Dateien unten an.
// Alles andere (/walking-dads/, /hammer-deals/, /geschichte/ ...) geht ungefiltert ans Netz.
const CACHE = 'dads-start-v1';
const SHELL = ['/', '/index.html', '/logo.png', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];
const DATA = ['/tools.json', '/termine.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const p = url.pathname;

  // Termine und Tools: erst Netz (damit Änderungen sofort da sind), sonst Cache
  if (DATA.includes(p)) {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // Startseite und ihre Dateien: erst Cache, im Hintergrund auffrischen
  if (SHELL.includes(p)) {
    e.respondWith(
      caches.match(req, { ignoreSearch: true }).then((hit) => {
        const net = fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
  }
  // alles andere: kein respondWith, der Browser lädt ganz normal
});
