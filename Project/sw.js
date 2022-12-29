const CACHE_NAME = "project"
const STATIC_ASSETS = [
    '/APT/Pictures/192M.png',
    '/APT/Pictures/512M.png',
    '/APT/Pictures/M.png',
    '/APT/Project/Sprite/0.png',
    '/APT/Project/Sprite/1.png',
    '/APT/Project/Sprite/2.png',
    '/APT/Project/Sprite/3.png',
    '/APT/Project/Sprite/4.png',
    '/APT/Project/Sprite/background.png',
    '/APT/Project/Sprite/chest.png',
    '/APT/Project/Sprite/dirt.png',
    '/APT/Project/Sprite/door.png',
    '/APT/Project/Sprite/key.png',
    '/APT/Project/Sprite/stone.png',
    '/APT/Project/project.html',
    '/APT/Project/project.js',
    '/APT/Project/joystick.js',
    '/APT/Project/styles.css'
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
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})
