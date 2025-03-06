<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // Import the auth store
import AppHeader from '@/components/AppHeader/AppHeader.vue';
import { onMounted } from 'vue';

const authStore = useAuthStore(); // Access the auth store
const router = useRouter(); // Access the router instance

onMounted(() => {
  // Check if the user is authenticated
  if (authStore.isAuthenticated) {
    // Redirect to /app if the user is authenticated
    router.push('/app');
  }
  else {
    router.push('/');
  }
});
</script>

<template>
  <div class="app">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style scoped>
@media (min-width: 1600px) {
  .app {
    padding: 0 7vw;
  }
}
@media (max-width: 1600px) {
  .app {
    padding: 0 4vw;
  }
}

</style>
