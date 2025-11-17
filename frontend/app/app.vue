<script setup>
const auth = useAuthStore();
</script>

<template>
  <div v-if="auth.isLoaded">
    <NuxtPage />
  </div>
</template>
