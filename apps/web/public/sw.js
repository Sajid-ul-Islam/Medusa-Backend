// BookHub Progressive Web App Service Worker
const CACHE_NAME = "bookhub-cache-v1";
const OFFLINE_URL = "/";

const STATIC_ASSETS = [
  "/",
  "/books",
  "/publishers",
  "/cart",
  "/manifest.json",
  "/icons/icon-192x192.svg",
  "/icons/icon-512x512.svg",
];

// 1. Install event: pre-cache static essentials
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Activate event: clean up stale caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch event: Stale-While-Revalidate caching strategy
self.addEventListener("fetch", (event) => {
  // Only intercept GET requests
  if (event.request.method !== "GET") return;

  // Don't cache backend API calls directly so fresh prices/data are always fetched
  if (
    event.request.url.includes("/api/") ||
    event.request.url.includes("onrender.com") ||
    event.request.url.includes("supabase.co")
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is for a web page, return offline fallback or cached page
          if (event.request.headers.get("accept")?.includes("text/html")) {
            return caches.match(OFFLINE_URL);
          }
        });

      return cachedResponse || fetchPromise;
    })
  );
});
