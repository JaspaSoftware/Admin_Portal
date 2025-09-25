<template>
  <div class="drawer lg:drawer-open font-display">
    <input type="checkbox" id="my-drawer" class="drawer-toggle" />

    <!-- Main content -->
    <div class="drawer-content flex flex-col min-h-screen bg-gray-100 dark:bg-backgroundDark">
      <!-- Navbar -->
      <Navbar 
        :isDark="isDark" 
        @toggle-drawer="toggleDrawer" 
        @toggle-theme="toggleTheme" 
      />

      <!-- Routed pages -->
      <main class="flex-1">
        <router-view />
      </main>
    </div>

    <!-- Sidebar / Drawer menu -->
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-64 bg-base-200 text-base-content space-y-2">
        <li>
          <router-link to="/" class="hover:bg-primary/10 rounded p-2">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/grocery-lists" class="hover:bg-primary/10 rounded p-2">Grocery Lists</router-link>
        </li>
        <li>
          <router-link to="/users" class="hover:bg-primary/10 rounded p-2">Users</router-link>
        </li>
        <li>
          <router-link to="/login" class="hover:bg-primary/10 rounded p-2">Login</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Navbar from './components/Navbar.vue';

const isDark = ref(true);

// Load theme from localStorage or system preference
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme) {
    isDark.value = savedTheme === 'dark';
  } else if (systemPrefersDark) {
    isDark.value = true;
  }
});

// Watch and apply theme changes
watchEffect(() => {
  const html = document.documentElement;
  if (isDark.value) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// Toggle theme button
const toggleTheme = () => {
  isDark.value = !isDark.value;
};

// Toggle drawer open/close
const toggleDrawer = () => {
  const drawer = document.getElementById('my-drawer');
  if (drawer) {
    drawer.checked = !drawer.checked;
  }
};
</script>

<style scoped>
/* Optional: highlight active route in sidebar */
.router-link-active {
  background-color: var(--color-primary);
  color: white;
  border-radius: 0.375rem; /* rounded */
}
</style>
