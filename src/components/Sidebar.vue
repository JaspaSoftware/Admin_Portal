<template>
  <aside
    class="drawer-side bg-white dark:bg-backgroundDark border-r border-gray-200 dark:border-primary/10"
  >
    <label for="my-drawer" aria-label="Close sidebar" class="drawer-overlay"></label>
    <nav class="menu p-4 w-80 min-h-full text-gray-800 dark:text-gray-200" aria-label="Main navigation">
      <header class="mb-4 flex px-4">
        <h1 class="text-xl font-bold dark:text-white">Admin Portal</h1>
      </header>
      <ul role="menu">
        <li
          v-for="(link, index) in links"
          :key="index"
          class="p-2"
          role="none"
        >
          <button
            role="menuitem"
            :aria-expanded="!!link.children && link.open"
            :aria-haspopup="!!link.children"
            :aria-current="link.active ? 'page' : undefined"
            :class="[
              'flex items-center w-full text-left hover:bg-gray-100 dark:hover:bg-white/5',
              'text-black dark:text-white',
              { 'active': link.active }
            ]"
            @click="setActiveLink(index)"
          >
            <Icon :icon="link.icon" class="w-5 h-5" />
            <span class="ml-2">{{ link.name }}</span>
            <span v-if="link.children" class="ml-auto">
              <!-- Add chevron icon for dropdown -->
              <Icon :icon="link.open ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-4 h-4"/>
            </span>
          </button>
          <!-- Render children if open -->
          <ul v-if="link.children && link.open" class="pl-8 py-2">
            <li v-for="(child, cidx) in link.children" :key="cidx">
              <button class="w-full text-left py-1 hover:underline hover:bg-gray-100 dark:hover:bg-white/5 text-black dark:text-white">
                {{ child.name }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
const links = ref([
  { name: 'Dashboard', icon: 'line-md:home', active: true, open: false },
  { name: 'Analytics', icon: 'icon-park-outline:chart-line', active: false, open: false },
  { name: 'Reports', icon: 'line-md:document-list', active: false, open: false },
  {
    name: 'Users',
    icon: 'icon-park-outline:chart-line',
    active: false,
    open: false,
    children: [
      { name: 'All Users' },
      { name: 'Add New' },
      { name: 'Roles & Permissions' },
    ],
  },
  {
    name: 'Products',
    icon: 'mdi:shopping-outline',
    active: false,
    open: false,
    children: [
      { name: 'All Products' },
      { name: 'Categories' },
      { name: 'Inventory' },
    ],
  },
]);

const setActiveLink = (index) => {
  // Toggle open state for items with children
  if (links.value[index].children) {
    links.value[index].open = !links.value[index].open;
  }
  // Set active state
  links.value.forEach((link, i) => {
    link.active = i === index;
    // Close all other dropdowns except the current one
    if (i !== index && link.children) link.open = false;
  });
};
</script>