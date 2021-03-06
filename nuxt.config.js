const DEPLOY_PATH = process.env.NODE_ENV === "development" ? '/' : (process.env.DEPLOY_PATH || '/horison/');

const m = {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Horison',
        meta: [
            {charset: 'UTF-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''},
            {name: 'format-detection', content: 'telephone=no'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: `${DEPLOY_PATH}favicon.ico`},
            {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700'},
            {rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/fontawesome-free/css/all.min.css`},
            {rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'},
            {rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/icheck-bootstrap/icheck-bootstrap.min.css`},
            {rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/select2/css/select2.min.css`},
            {rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css`},
            {rel: 'stylesheet', href: `${DEPLOY_PATH}dist/css/adminlte.min.css`},
            {rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/overlayScrollbars/css/OverlayScrollbars.min.css`},
            //{rel: 'stylesheet', href: `${DEPLOY_PATH}plugins/daterangepicker/daterangepicker.css`},
        ],
        script: [
            {src: `${DEPLOY_PATH}plugins/jquery/jquery.min.js`, body: true},
            //{src: `${DEPLOY_PATH}plugins/jquery-ui/jquery-ui.min.js`, body: true},
            {src: `${DEPLOY_PATH}plugins/bootstrap/js/bootstrap.bundle.min.js`, body: true},
            {src: `${DEPLOY_PATH}plugins/select2/js/select2.full.min.js`, body: true},
//            {src: `${DEPLOY_PATH}plugins/moment/moment.min.js`, body: true},
//            {src: `${DEPLOY_PATH}plugins/moment/locales.min.js`, body: true},
            {src: `${DEPLOY_PATH}dist/js/adminlte.js`, body: true},
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', body:true},
        ],
        bodyAttrs: {
            class: 'hold-transition sidebar-mini layout-fixed layout-navbar-fixedx layout-footer-fixed'
        }
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/sanitize.js',
        '@/plugins/format.js',
        '@/plugins/message.js',
        '@/plugins/sw-update.js',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: [
        '~/components',
        {path: '~/components/adminlte/', prefix: 'lte'},
        {path: '~/components/app/', prefix: 'a'},
        {path: '~/components/app/se', prefix: 'se'},
    ],

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        //'@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        'portal-vue/nuxt',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: '/',
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            name: 'Horison',
            short_name: 'Horison',
            lang: 'en',
            display: 'standalone',
            start_url: DEPLOY_PATH,
        },
        workbox: {
            importScripts: [
                `${DEPLOY_PATH}dist/precache.js`,
            ],
            runtimeCaching: [
                {
                    urlPattern: 'https://fonts.googleapis.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
                },
                {
                    urlPattern: 'https://fonts.gstatic.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
                },
                {
                    urlPattern: /\.(eot|svg|ttf|woff|woff2)$/,
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
                },
            ]
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

const precaches = [{url: DEPLOY_PATH + '?'}];
const revision = null;

m.head.link.forEach(link => {
    if (link.rel == 'stylesheet') {
        precaches.push({url: link.href, revision});
    }
});
m.head.script.forEach(script => {
    if (script.src) {
        precaches.push({url: script.src, revision});
    }
});
m.pwa.workbox.preCaching = precaches;

export default m;