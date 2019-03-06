// 此处代码 后面相关章节会去说明
var cacheName = 'helloWorld';


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([
      '/',
    ]))
  )
})

self.addEventListener('fetch', function (event) {
  console.log('fetch',event);
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  )
})
