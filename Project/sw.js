const CACHE_NAME = "project"
const STATIC_ASSETS = [
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