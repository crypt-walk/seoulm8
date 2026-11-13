const C="seoulm8-v6";const F=["./","index.html","manifest.json","icon-180.png","icon-512.png","fsi.js","dict.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:"reload"})))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
function fresh(req){return new Promise((res,rej)=>{const t=setTimeout(()=>rej(new Error("timeout")),3500);fetch(req,{cache:"no-store"}).then(r=>{clearTimeout(t);if(r&&r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(req,cp));res(r);}else rej(new Error("bad"));},e=>{clearTimeout(t);rej(e);});});}
self.addEventListener("fetch",e=>{const q=e.request;if(q.method!=="GET")return;const u=new URL(q.url);if(u.origin!==location.origin)return;
const core=q.mode==="navigate"||/(\/|index\.html|fsi\.js|sw\.js)$/.test(u.pathname);
if(core){e.respondWith(fresh(q).catch(()=>caches.match(q,{ignoreSearch:true}).then(r=>r||caches.match("index.html"))));}
else{e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q)));}});
