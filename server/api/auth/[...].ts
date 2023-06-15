import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import KakaoProvider from 'next-auth/providers/kakao'
import GoogleProvider from 'next-auth/providers/google'
import { NuxtAuthHandler } from '#auth'

interface ServerError extends Error {
  statusCode: number
  statusMessage: string
}

interface Credentials {
  username?: string
  password?: string
}

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
  pages: {
    signIn: '/login', // 로그인 페이지 경로
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      async authorize (credentials: Credentials) {
        try {
          const login = await $fetch('/api/auth/login', {
            method: 'POST',
            body: {
              username: credentials?.username,
              password: credentials?.password
            }
          })
          return login
        } catch (error: ServerError | unknown) {
          // 에러처리
          if (error) {
            // 에러가 존재하는경우
            const err: ServerError = error as ServerError
            // 메시지를 담아서 에러처리
            throw createError(err.statusMessage)
          }
          return null
        }
      }
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: runtimeConfig.providers.github.id,
      clientSecret: runtimeConfig.providers.github.secret
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KakaoProvider.default({
      clientId: runtimeConfig.providers.kakao.id,
      clientSecret: runtimeConfig.providers.kakao.secret,
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: runtimeConfig.providers.google.id,
      clientSecret: runtimeConfig.providers.google.secret,
    })
  ]
})