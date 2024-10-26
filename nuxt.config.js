const DEPLOY_PATH = process.env.DEPLOY_PATH || '';

const m = {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Horison',
        meta: [
            { charset: 'UTF-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: `${DEPLOY_PATH}/favicon.ico` },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700' },
            { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
        ],
        script: [
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
        '@/libs/main.js',
        '@/plugins/format.js',
        '@/plugins/message.js',
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
                `${DEPLOY_PATH}/dist/precache.js`,
            ],
            runtimeCaching: [
                {
                    urlPattern: 'https://fonts.googleapis.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
                },
                {
                    urlPattern: 'https://fonts.gstatic.com/.*',
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
                },
                {
                    urlPattern: /\.(eot|svg|ttf|woff|woff2)$/,
                    handler: 'cacheFirst',
                    method: 'GET',
                    strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
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
        base: DEPLOY_PATH + '/',
        mode: 'hash',
    }
}

const precaches = [{ url: DEPLOY_PATH + '/?' }];
const revision = null;

m.head.link.forEach(link => {
    if (link.rel == 'stylesheet') {
        precaches.push({ url: link.href, revision });
    }
});
m.head.script.forEach(script => {
    if (script.src) {
        precaches.push({ url: script.src, revision });
    }
});
m.pwa.workbox.preCaching = precaches;

export default m;
