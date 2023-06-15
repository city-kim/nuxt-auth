<script setup lang="ts">
  const { data, signOut } = useAuth()
</script>
<template>
  <div class="app">
    <header>
      <nav>
        <NuxtLink href="/">항상 접근가능</NuxtLink>
        <NuxtLink href="/required">로그인만 접근가능</NuxtLink>
        <NuxtLink href="/non-required">비로그인 접근가능</NuxtLink>
      </nav>
      <fieldset>
        <button @click="signOut()">로그아웃버튼</button>
      </fieldset>
    </header>
    <div class="contents">
      <NuxtPage />
    </div>
    <pre v-show="data">로그인데이터: {{ data }}</pre>
  </div>
</template>
