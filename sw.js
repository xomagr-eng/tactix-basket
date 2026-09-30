/* TACTIX BASKET — Service Worker (offline-first app shell) */
const CACHE = "tactix-basket-v1";
const ASSETS = [
  "./", "./index.html",
  "./js/data.js", "./js/court.js", "./js/app.js",
  "./manifest.json", "./icon.svg"
];
self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate", e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", e=>{
  const req=e.request;
  if(req.method!=="GET") return;
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(resp=>{
      try{ const cp=resp.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); }catch(_){}
      return resp;
    }).catch(()=> caches.match("./index.html")))
  );
});
