const CACHE_NAME = "project"
const STATIC_ASSETS = [
    './',
    './project.html',
    './project.js',
    './styles.css'
] 
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => {
                return cache.addAll(STATIC_ASSETS);
            }
        )
    )
});

self.addEventListener("fetch", e => {
    console.log(`getir from ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})
