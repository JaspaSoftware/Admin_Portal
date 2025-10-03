<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-backgroundDark">
    <div class="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">User Profile</h1>

      <div v-if="user">
        <p class="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Name:</strong> {{ user.name }}
        </p>
        <p class="text-gray-700 dark:text-gray-300 mb-2">
          <strong>Email:</strong> {{ user.email }}
        </p>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          <strong>Role:</strong> {{ user.role }}
        </p>

        <button
          @click="logout"
          class="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div v-else class="text-center text-gray-600 dark:text-gray-400">
        <p>No user logged in.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    // Example: retrieve user from localStorage (you can adjust if using Pinia/Vuex)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("user"); // clear session
      this.$router.push("/login"); // redirect to login
    },
  },
};
</script>
