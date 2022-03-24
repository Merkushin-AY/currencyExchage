export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'currencyExchange',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {charset: 'utf-8'},
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Oxygen&display=swap",
            },
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~assets/styles/main.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: '~plugins/VSelect.js', mode: 'client' },
        { src: '~plugins/inputMask.js', mode: 'client' },
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/style-resources'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    watchers: {
        webpack: {
            poll: true
        }
    },

    styleResources: {
        scss: '~assets/styles/vars/*.scss'
    },

    ssr: false // для более быстрой сборки. Код работает так же и в ssr моде
};
