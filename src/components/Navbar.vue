<template>
  <header class="navbar bg-white dark:bg-backgroundDark dark:border-b dark:border-primary/10 sticky top-0 z-10 shadow-sm">
    
    <!-- Drawer Toggle -->
    <nav class="flex-none lg:hidden">
      <label @click="$emit('toggle-drawer')" class="btn btn-square btn-ghost">
        <Icon icon="line-md:close-to-menu-alt-transition" class="inline-block w-5 h-5" />
      </label>
    </nav>

    <!-- Search Bar -->
    <section class="flex-1">
      <div class="form-control">
        <input 
          type="text" 
          placeholder="Search" 
          class="input input-bordered w-48 ml-2 md:w-auto 
                 dark:bg-white/5 dark:not-only:backdrop-blur-md 
                 dark:[--webkit-backdrop-filter:blur(10px)]  
                 dark:border-white/10" 
        />
      </div>
    </section>

    <!-- Right Section -->
    <section class="flex gap-6">
      
      <!-- Theme Toggle Button -->
      <button 
        @click="$emit('toggle-theme')" 
        class="btn btn-ghost btn-circle dark:bg-white/5 dark:backdrop-blur-md 
               dark:[--webkit-backdrop-filter:blur(10px)] dark:border-white/10">
        <Icon v-if="isDark" icon="line-md:moon-alt-to-sunny-outline-loop-transition" class="w-8 h-8" />
        <Icon v-else icon="line-md:sunny-outline-to-moon-alt-loop-transition" class="w-8 h-8" />
      </button>

      <!-- User Avatar Dropdown -->
      <div class="dropdown dropdown-end">
        <button tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="@/assets/kopi.jpg" alt="Tessa" />
          </div>
        </button>
        <ul 
          tabindex="0" 
          class="mt-5 z-[1] p-2 shadow menu menu-sm dropdown-content 
                 bg-base-100 rounded-box w-58 space-y-3 dark:bg-backgroundDark text-base">
          <li><a>Profile</a></li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script setup>
defineProps({
  isDark: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle-drawer', 'toggle-theme'])
</script>
