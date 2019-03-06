// 此处代码 后面相关章节会去说明
var cacheName = 'helloWorld';

console.log(self);

self.addEventListener('install', event => {
    console.log(event);
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([
      '/',
      'test.js'
    ]))
  )
})

self.addEventListener('fetch', function (event) {
    console.log(event);
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
