export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "frontend",
    htmlAttrs: {
      lang: "fr"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  ssr: false,
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "@nuxtjs/axios",
    "bootstrap-vue/nuxt",
    "@nuxtjs/style-resources"
  ],
  bootstrapVue: {
    icons: true,
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  styleResources: {
    scss: "@/assets/scss/_variables.scss"
  },
  axios: {
    baseURL: "http://localhost:8080"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
