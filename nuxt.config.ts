// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/nav-man/"
  },
  nitro: {
    static: true
  },
  devtools: { enabled: true },
  modules: ["@nuxt/content"]
})
