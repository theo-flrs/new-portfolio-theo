// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: "Théo Florès",
    },
  },
  modules: ["@vueuse/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/scss/main.scss"],

  runtimeConfig: {
    public: {
      wpUri: process.env.WP_URI,
    },
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/colors.scss";',
        },
      },
    },
  },
});
