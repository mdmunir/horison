const options = {"workboxURL":"https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js","importScripts":["/horison/dist/precache.js"],"config":{"debug":false},"cacheOptions":{"cacheId":"horison-prod","directoryIndex":"/","revision":"20xoFVw7UPEp"},"clientsClaim":true,"skipWaiting":true,"cleanupOutdatedCaches":true,"offlineAnalytics":false,"preCaching":[{"revision":"20xoFVw7UPEp","url":"/horison/"},{"revision":"20xoFVw7UPEp","url":"/horison/?"},{"revision":null,"url":"https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700"},{"revision":null,"url":"/horison/plugins/fontawesome-free/css/all.min.css"},{"revision":null,"url":"https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"},{"revision":null,"url":"/horison/plugins/icheck-bootstrap/icheck-bootstrap.min.css"},{"revision":null,"url":"/horison/plugins/select2/css/select2.min.css"},{"revision":null,"url":"/horison/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"},{"revision":null,"url":"/horison/dist/css/adminlte.min.css"},{"revision":null,"url":"/horison/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"},{"revision":null,"url":"/horison/plugins/jquery/jquery.min.js"},{"revision":null,"url":"/horison/plugins/bootstrap/js/bootstrap.bundle.min.js"},{"revision":null,"url":"/horison/plugins/select2/js/select2.full.min.js"},{"revision":null,"url":"/horison/plugins/moment/moment.min.js"},{"revision":null,"url":"/horison/plugins/moment/locales.min.js"},{"revision":null,"url":"/horison/dist/js/adminlte.js"}],"runtimeCaching":[{"urlPattern":"https://fonts.googleapis.com/.*","handler":"CacheFirst","method":"GET","strategyOptions":{"cacheableResponse":{"statuses":[0,200]}},"strategyPlugins":[]},{"urlPattern":"https://fonts.gstatic.com/.*","handler":"CacheFirst","method":"GET","strategyOptions":{"cacheableResponse":{"statuses":[0,200]}},"strategyPlugins":[]},{"urlPattern":{},"handler":"CacheFirst","method":"GET","strategyOptions":{"cacheableResponse":{"statuses":[0,200]}},"strategyPlugins":[]},{"urlPattern":"/horison/_nuxt/","handler":"CacheFirst","method":"GET","strategyPlugins":[]},{"urlPattern":"/horison/","handler":"NetworkFirst","method":"GET","strategyPlugins":[]}],"offlinePage":null,"pagesURLPattern":"/horison/","offlineStrategy":"NetworkFirst"}

importScripts(...[options.workboxURL, ...options.importScripts])

initWorkbox(workbox, options)
workboxExtensions(workbox, options)
precacheAssets(workbox, options)
cachingExtensions(workbox, options)
runtimeCaching(workbox, options)
offlinePage(workbox, options)
routingExtensions(workbox, options)

function getProp(obj, prop) {
  return prop.split('.').reduce((p, c) => p[c], obj)
}

function initWorkbox(workbox, options) {
  if (options.config) {
    // Set workbox config
    workbox.setConfig(options.config)
  }

  if (options.cacheNames) {
    // Set workbox cache names
    workbox.core.setCacheNameDetails(options.cacheNames)
  }

  if (options.clientsClaim) {
    // Start controlling any existing clients as soon as it activates
    workbox.core.clientsClaim()
  }

  if (options.skipWaiting) {
    workbox.core.skipWaiting()
  }

  if (options.cleanupOutdatedCaches) {
    workbox.precaching.cleanupOutdatedCaches()
  }

  if (options.offlineAnalytics) {
    // Enable offline Google Analytics tracking
    workbox.googleAnalytics.initialize()
  }
}

function precacheAssets(workbox, options) {
  if (options.preCaching.length) {
    workbox.precaching.precacheAndRoute(options.preCaching, options.cacheOptions)
  }
}


function runtimeCaching(workbox, options) {
  const requestInterceptor = {
    requestWillFetch({ request }) {
      if (request.cache === 'only-if-cached' && request.mode === 'no-cors') {
        return new Request(request.url, { ...request, cache: 'default', mode: 'no-cors' })
      }
      return request
    },
    fetchDidFail(ctx) {
      ctx.error.message =
        '[workbox] Network request for ' + ctx.request.url + ' threw an error: ' + ctx.error.message
      console.error(ctx.error, 'Details:', ctx)
    },
    handlerDidError(ctx) {
      ctx.error.message =
        `[workbox] Network handler threw an error: ` + ctx.error.message
      console.error(ctx.error, 'Details:', ctx)
      return null
    }
  }

  for (const entry of options.runtimeCaching) {
    const urlPattern = new RegExp(entry.urlPattern)
    const method = entry.method || 'GET'

    const plugins = (entry.strategyPlugins || [])
      .map(p => new (getProp(workbox, p.use))(...p.config))

    plugins.unshift(requestInterceptor)

    const strategyOptions = { ...entry.strategyOptions, plugins }

    const strategy = new workbox.strategies[entry.handler](strategyOptions)

    workbox.routing.registerRoute(urlPattern, strategy, method)
  }
}

function offlinePage(workbox, options) {
  if (options.offlinePage) {
    // Register router handler for offlinePage
    workbox.routing.registerRoute(new RegExp(options.pagesURLPattern), ({ request, event }) => {
      const strategy = new workbox.strategies[options.offlineStrategy]
      return strategy
        .handle({ request, event })
        .catch(() => caches.match(options.offlinePage))
    })
  }
}

function workboxExtensions(workbox, options) {
  
}

function cachingExtensions(workbox, options) {
  
}

function routingExtensions(workbox, options) {
  
}