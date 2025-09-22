<!-- src/components/UsersTable.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const users = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    users.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Registered Users</h2>

    <div v-if="loading" class="text-gray-500">Loading users...</div>

    <table v-else class="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border p-2">Full Name</th>
          <th class="border p-2">Student Number</th>
          <th class="border p-2">Institution</th>
          <th class="border p-2">Phone Number</th>
          <th class="border p-2">Join Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="border p-2">{{ user.full_name }}</td>
          <td class="border p-2">{{ user.student_number }}</td>
          <td class="border p-2">{{ user.institution }}</td>
          <td class="border p-2">{{ user.phone_number }}</td>
          <td class="border p-2">{{ user.created_at?.toDate().toLocaleDateString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
