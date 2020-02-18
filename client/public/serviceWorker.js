self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})

self.addEventListener('activate', event => {
  event.waitUntil(
    clients.claim().then(() => {
      clients.matchAll({ type: 'window' }).then(windowClients => {
        windowClients.forEach(windowClient => {
          windowClient.navigate(windowClient.url)
        })
      })
    })
  )
})