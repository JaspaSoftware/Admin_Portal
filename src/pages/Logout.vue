<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-backgroundDark">
    <div class="bg-white dark:bg-gray-900 p-8 rounded shadow-md text-center">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Logging out...</h2>
      <p class="text-gray-700 dark:text-gray-300">You are being logged out, please wait.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  // Clear auth state
  localStorage.removeItem("user");
  sessionStorage.clear();

  // Redirect to login page after a short delay
  setTimeout(() => {
    router.push("/login");
  }, 1000);
});
</script>
