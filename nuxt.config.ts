// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@invictus.codes/nuxt-vuetify',
    '@vueuse/nuxt',
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      appName: 'Canvas'
    }
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    }
  }
})
