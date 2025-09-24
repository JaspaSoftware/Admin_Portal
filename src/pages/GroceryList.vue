<script setup>
import { ref, onMounted, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const groceryLists = ref([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");

// Fetch grocery lists from Firestore
onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "grocery_lists"));
    groceryLists.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error fetching grocery lists:", err);
    error.value = "Failed to load grocery lists. Please try again.";
  } finally {
    loading.value = false;
  }
});

// Helper for formatting date
function formatDate(dateObj) {
  if (!dateObj) return "N/A";
  if (typeof dateObj.toDate === "function") {
    return dateObj.toDate().toLocaleDateString();
  }
  if (typeof dateObj === "string" || typeof dateObj === "number") {
    return new Date(dateObj).toLocaleDateString();
  }
  return "N/A";
}

// Filtered grocery lists by User ID
const filteredLists = computed(() => {
  if (!searchQuery.value.trim()) return groceryLists.value;
  return groceryLists.value.filter(list =>
    list.user_id?.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
  );
});
</script>

<template>
  <div class="p-6 bg-white dark:bg-backgroundDark rounded shadow">
    <h2 class="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Grocery Lists</h2>

    <div class="mb-4 flex flex-col sm:flex-row sm:items-center gap-2">
      <label class="text-gray-700 dark:text-gray-200 font-medium" for="search">
        Search by User ID:
      </label>
      <input
        id="search"
        type="text"
        v-model="searchQuery"
        placeholder="Enter user ID..."
        class="border border-gray-300 dark:border-primary/20 rounded px-2 py-1 bg-gray-50 dark:bg-backgroundDark text-black dark:text-white"
      />
    </div>

    <div v-if="loading" class="text-gray-500 dark:text-gray-400">Loading grocery lists...</div>
    <div v-else-if="error" class="text-red-600 dark:text-red-400 mb-4">{{ error }}</div>
    <div v-else>
      <div v-if="filteredLists.length === 0" class="text-gray-500 dark:text-gray-400">
        No grocery lists found.
      </div>
      <div class="overflow-x-auto">
        <table v-if="filteredLists.length" class="min-w-full border-collapse border border-gray-300 dark:border-primary/10 rounded overflow-hidden">
          <thead>
            <tr class="bg-gray-100 dark:bg-backgroundDark">
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">User ID</th>
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">Items</th>
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">Submitted At</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="list in filteredLists" :key="list.id" class="hover:bg-gray-50 dark:hover:bg-white/5">
              <td class="border p-2">{{ list.user_id }}</td>
              <td class="border p-2">
                <ul class="list-disc ml-4">
                  <li v-for="item in list.items" :key="item">{{ item }}</li>
                </ul>
              </td>
              <td class="border p-2">{{ formatDate(list.submitted_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>