// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future:{
    compatibilityVersion: 4,
  },

  runtimeConfig:{
    // Server-side only config. Not exposed to the client
    mongoURI: process.env.MONGODB_URI,
  },

  css:['@/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
})