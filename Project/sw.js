const CACHE_NAME = "project"
/*const STATIC_ASSETS = [
    './',
    './Sprite/0.png',
    './Sprite/1.png',
    './Sprite/2.png',
    './Sprite/3.png',
    './Sprite/4.png',
    './Sprite/background.png',
    './Sprite/chest.png',
    './Sprite/dirt.png',
    './Sprite/door.png',
    './Sprite/key.png',
    './Sprite/stone.png',
    './project.html',
    './project.js',
    './styles.css'
] */
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => {
                return cache.add("./project.html");
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
