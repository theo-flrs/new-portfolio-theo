// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  app: {
    head: {
      title: "Théo Florès",
    },
  },
  modules: [
    '@vueuse/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.scss"],

  runtimeConfig: {
    public: {
      wpUri: process.env.WP_URI,
    },
  },
});
