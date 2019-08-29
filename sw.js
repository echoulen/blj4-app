importScripts('/blj4-app/assets/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/blj4-app/assets/0f1082d2223ac5fcfee6.js",
    "revision": "fc15b1a1f73368e8ad12e7b82d44018b"
  },
  {
    "url": "/blj4-app/assets/17b7f6f5b810a781a2c3.js",
    "revision": "e7a55eba61809b46839079d85be18c63"
  },
  {
    "url": "/blj4-app/assets/35add01d4422f674dcac.js",
    "revision": "e3356976d8e9fdb4a255260ec1084e6c"
  },
  {
    "url": "/blj4-app/assets/809555f735ccc7096021.js",
    "revision": "1a364950bc4efefb4771c5d6bc4de29a"
  },
  {
    "url": "/blj4-app/assets/e1d05b8d212f6b31767c.js",
    "revision": "29c8695cf2ba03546f400fb7ac1ebb14"
  },
  {
    "url": "/blj4-app/assets/ef76e1ed3bb6cf228a96.js",
    "revision": "1cb9e5426cb7d29ac4038dae985fb682"
  }
], {
  "cacheId": "blj4-app",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/blj4-app/assets/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/blj4-app/.*'), workbox.strategies.networkFirst({}), 'GET')
