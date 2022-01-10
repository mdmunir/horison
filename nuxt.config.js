const DEPLOY_PATH = process.env.NODE_ENV === "development" ? '/' : process.env.DEPLOY_PATH;

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Horison',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${DEPLOY_PATH}favicon.ico` },
      { rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/fontawesome-free/css/all.min.css` },
      { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
//      { rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css` },
      { rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/icheck-bootstrap/icheck-bootstrap.min.css` },
//      { rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/jqvmap/jqvmap.min.css` },
      { rel: 'stylesheet', href: `${DEPLOY_PATH}dist/css/adminlte.min.css` },
      { rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/overlayScrollbars/css/OverlayScrollbars.min.css` },
      { rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/daterangepicker/daterangepicker.css` },
//      { rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/summernote/summernote-bs4.css` },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700' }
    ],
    script: [
      { src: `${DEPLOY_PATH}plugins/jquery/jquery.min.js`, body: true },
      { src: `${DEPLOY_PATH}plugins/jquery-ui/jquery-ui.min.js`, body: true },
      { src: `${DEPLOY_PATH}plugins/bootstrap/js/bootstrap.bundle.min.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/chart.js/Chart.min.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/sparklines/sparkline.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/jqvmap/jquery.vmap.min.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/jqvmap/maps/jquery.vmap.usa.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/jquery-knob/jquery.knob.min.js`, body: true },
      { src: `${DEPLOY_PATH}plugins/moment/moment.min.js`, body: true },
      { src: `${DEPLOY_PATH}plugins/daterangepicker/daterangepicker.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/summernote/summernote-bs4.min.js`, body: true },
//      { src: `${DEPLOY_PATH}plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js`, body: true },
      { src: `${DEPLOY_PATH}dist/js/adminlte.js`, body: true }
    ],
    bodyAttrs: {
      class: 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    { path: '~/components/adminlte/', prefix: 'lte' },
    { path: '~/components/app/', prefix: 'a' },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  router: {
    base: DEPLOY_PATH,
    mode: 'hash',
  } 
}
