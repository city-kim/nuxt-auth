<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  }
})

const { signIn } = useAuth()

const username = ref('test') // 유저명 임시
const password = ref('citykim') // 비번 임시
const errorMessage = ref('') // 에러메시지

async function login () {
  // 로그인하기
  errorMessage.value = '' // 에러초기화
  const { error, url } = await signIn('credentials', {
    username: username.value,
    password: password.value,
    redirect: false
  })
  
  if (error) {
    // 에러가 존재하는 경우
    errorMessage.value = error
  } else {
    // 에러가 없는 경우 원래 목적지로 이동
    return navigateTo(url, { external: true })
  }
}
</script>

<template>
  <div>
    <p>임시로그인</p>
    <input
      v-model="username"
      type="textx"
    >
    <input
      v-model="password"
      type="password"
    >
    <button @click="login()">로그인</button>

    <div>
      <button @click="signIn('github')">github</button>
      <button @click="signIn('kakao')">kakao</button>
      <button @click="signIn('google')">google</button>
    </div>

    <div v-show="errorMessage">에러: {{ errorMessage }}</div>
  </div>
</template>