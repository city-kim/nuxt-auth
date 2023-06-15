// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@sidebase/nuxt-auth',
  ],
  css: [
    '@/assets/scss/app.scss',
  ],
  auth: {
    origin: process.env.AUTH_ORIGIN, // auth origin
    enableGlobalAppMiddleware: true, // 모든페이지 인증여부
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    providers: {
      github: {
        id: process.env.GITHUB_CLIENT_ID,
        secret: process.env.GITHUB_CLIENT_SECRET,
      },
      google: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
      },
      kakao: {
        id: process.env.KAKAO_CLIENT_ID,
        secret: process.env.KAKAO_CLIENT_SECRET,
      }
    },
  },
})
