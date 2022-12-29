const CACHE_NAME = "static_cache"
const STATIC_ASSETS = [
    'APT/Project/Sprite/0.png',
    'APT/Project/Sprite/1.png',
    'APT/Project/Sprite/2.png',
    'APT/Project/Sprite/3.png',
    'APT/Project/Sprite/4.png',
    'APT/Project/Sprite/background.png',
    'APT/Project/Sprite/chest.png',
    'APT/Project/Sprite/dirt.png',
    'APT/Project/Sprite/door.png',
    'APT/Project/Sprite/key.png',
    'APT/Project/Sprite/stone.png',
    'APT/Project/project.html',
    'APT/Project/project.js',
    'APT/Project/styles.css'
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