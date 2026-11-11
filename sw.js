// Nexus Livre: guarda o app no celular para abrir mesmo sem internet. Nunca guarda suas conversas nem chaves.
var V='nexus-livre-v3',ARQ=['./','index.html','app.js','local.js','motor.js','manifest.webmanifest','icone-192.png','icone-512.png','icone-180.png','icone-mask.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(ARQ)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==V}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);if(u.origin!==location.origin)return;
e.respondWith(fetch(r).then(function(x){if(x&&x.ok){var c=x.clone();caches.open(V).then(function(ch){ch.put(r,c)})}return x}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match('./')})}))});
