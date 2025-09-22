<!-- src/components/GroceryLists.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const groceryLists = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "grocery_lists"));
    groceryLists.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching grocery lists:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Grocery Lists</h2>

    <div v-if="loading" class="text-gray-500">Loading grocery lists...</div>

    <table v-else class="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">User ID</th>
          <th class="border p-2">Items</th>
          <th class="border p-2">Submitted At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in groceryLists" :key="list.id">
          <td class="border p-2">{{ list.user_id }}</td>
          <td class="border p-2">
            <ul class="list-disc ml-4">
              <li v-for="item in list.items" :key="item">{{ item }}</li>
            </ul>
          </td>
          <td class="border p-2">{{ list.submitted_at?.toDate().toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
