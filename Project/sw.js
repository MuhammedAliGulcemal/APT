const CACHE_NAME = "static_cache"
const STATIC_ASSETS = [
    '/Project/Sprite/0.png',
    '/Project/Sprite/1.png',
    '/Project/Sprite/2.png',
    '/Project/Sprite/3.png',
    '/Project/Sprite/4.png',
    '/Project/Sprite/background.png',
    '/Project/Sprite/chest.png',
    '/Project/Sprite/dirt.png',
    '/Project/Sprite/door.png',
    '/Project/Sprite/key.png',
    '/Project/Sprite/stone.png',
    '/Project/project.html',
    '/Project/project.js',
    '/Project/styles.css'
] 
async function preCache(){
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}
self.addEventListener("install", event => {
    console.log("[SW] installed");
    self.skipWaiting();
    event.waitUntil(preCache())
} );

async function cleanupCache(){
    const keys = await caches.keys();
    const keysToDelete = keys.map(key => {
        if(key !== CACHE_NAME){
            return caches.delete(key);
        }
    });
    return Promise.all(keysToDelete);
}

self.addEventListener("activate", event => {
    console.log("[SW] activated");
    event.waitUntil(cleanupCache());
} );

async function fetchAssets(event){
    try{
        const response = await fetch(event.request);
        return response;
    }catch(err){
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }
}

self.addEventListener("fetch", event => {
    console.log("[SW] fetched");
    event.respondWith(fetchAssets(event));
} );