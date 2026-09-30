/* TACTIX BASKET — Service Worker (offline app shell· network-first για HTML) */
const CACHE = "tactix-basket-v2";
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
  const isDoc = req.mode==="navigate" || (req.destination==="document") || req.url.endsWith(".html") || req.url.endsWith("/");
  if(isDoc){
    // network-first: πάντα φρέσκια σελίδα όταν υπάρχει δίκτυο, offline → cache
    e.respondWith(
      fetch(req).then(resp=>{ try{ const cp=resp.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); }catch(_){}; return resp; })
        .catch(()=> caches.match(req).then(h=> h || caches.match("./index.html")))
    );
    return;
  }
  // υπόλοιπα assets: cache-first
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(resp=>{
      try{ const cp=resp.clone(); caches.open(CACHE).then(c=>c.put(req,cp)); }catch(_){}
      return resp;
    }).catch(()=> caches.match("./index.html")))
  );
});
