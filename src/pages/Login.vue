<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-backgroundDark">
    <div class="bg-white dark:bg-gray-900 p-8 rounded shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Admin Portal Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700 dark:text-gray-200 mb-1" for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            class="w-full px-3 py-2 border border-gray-300 dark:border-primary/10 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            required
            autocomplete="username"
          >
        </div>
        <div>
          <label class="block text-gray-700 dark:text-gray-200 mb-1" for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="w-full px-3 py-2 border border-gray-300 dark:border-primary/10 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            required
            autocomplete="current-password"
          >
        </div>
        <div v-if="error" class="text-red-600 dark:text-red-400 text-sm">{{ error }}</div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 bg-primary text-white dark:bg-primary/80 rounded font-semibold hover:bg-primary/90 transition disabled:opacity-60"
        >
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
      <div class="mt-4 flex justify-end">
        <button
          @click="showForgot = true"
          class="text-primary dark:text-blue-400 text-sm hover:underline focus:outline-none"
        >Forgot Password?</button>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgot" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-900 rounded shadow-lg p-6 w-full max-w-md">
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Reset Password</h2>
        <form @submit.prevent="handleForgotPassword" class="space-y-4">
          <div>
            <label class="block text-gray-700 dark:text-gray-200 mb-1" for="forgot-email">Enter your email</label>
            <input
              id="forgot-email"
              type="email"
              v-model="forgotEmail"
              class="w-full px-3 py-2 border border-gray-300 dark:border-primary/10 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
              required
              autocomplete="email"
            >
          </div>
          <div v-if="forgotError" class="text-red-600 dark:text-red-400 text-sm">{{ forgotError }}</div>
          <div v-if="forgotSuccess" class="text-green-600 dark:text-green-400 text-sm">{{ forgotSuccess }}</div>
          <div class="flex justify-between gap-2">
            <button
              type="submit"
              :disabled="forgotLoading"
              class="py-2 px-4 bg-primary text-white dark:bg-primary/80 rounded font-semibold hover:bg-primary/90 transition disabled:opacity-60"
            >
              <span v-if="forgotLoading">Sending...</span>
              <span v-else>Send Reset Link</span>
            </button>
            <button
              type="button"
              @click="closeForgot"
              class="py-2 px-4 bg-gray-200 dark:bg-gray-700 rounded font-semibold text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
            >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../firebase"; // Uncomment if using Firebase Auth

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const showForgot = ref(false);
const forgotEmail = ref("");
const forgotLoading = ref(false);
const forgotError = ref("");
const forgotSuccess = ref("");

const handleLogin = async () => {
  error.value = "";
  loading.value = true;
  try {
    // Example: Firebase Auth
    // await signInWithEmailAndPassword(auth, email.value, password.value);

    // Simulate login for demo (replace with real auth)
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Redirect or set user state here
    // router.push("/dashboard");
  } catch (err) {
    error.value = "Invalid email or password.";
  } finally {
    loading.value = false;
  }
};

const handleForgotPassword = async () => {
  forgotError.value = "";
  forgotSuccess.value = "";
  forgotLoading.value = true;
  try {
    // Example: Firebase Auth
    // await sendPasswordResetEmail(auth, forgotEmail.value);

    // Simulate sending reset link
    await new Promise(resolve => setTimeout(resolve, 1000));
    forgotSuccess.value = "A password reset link has been sent to your email address.";
    forgotEmail.value = "";
  } catch (err) {
    forgotError.value = "Could not send reset link. Please check your email address.";
  } finally {
    forgotLoading.value = false;
  }
};

function closeForgot() {
  showForgot.value = false;
  forgotEmail.value = "";
  forgotError.value = "";
  forgotSuccess.value = "";
}
</script>