<template>
  <div class="p-6">
    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4 flex flex-col items-start">
        <span class="text-xs text-gray-500 dark:text-gray-400">Users</span>
        <span class="text-2xl font-bold text-gray-900 dark:text-white">12,345</span>
      </div>
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4 flex flex-col items-start">
        <span class="text-xs text-gray-500 dark:text-gray-400">Revenue</span>
        <span class="text-2xl font-bold text-gray-900 dark:text-white">R42,678</span>
      </div>
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4 flex flex-col items-start">
        <span class="text-xs text-gray-500 dark:text-gray-400">New Orders</span>
        <span class="text-2xl font-bold text-gray-900 dark:text-white">1,234</span>
      </div>
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4 flex flex-col items-start">
        <span class="text-xs text-gray-500 dark:text-gray-400">Active Users</span>
        <span class="text-2xl font-bold text-gray-900 dark:text-white">56</span>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4">
        <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Monthly Revenue</h3>
        <!-- Placeholder for chart, can use Chart.js or ApexCharts -->
        <canvas id="monthlyRevenueChart"></canvas>
      </div>
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4">
        <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Revenue Sources</h3>
        <!-- Placeholder for chart, can use Chart.js or ApexCharts -->
        <canvas id="revenueSourcesChart"></canvas>
      </div>
    </div>

    <!-- Recent Orders & Activity -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4">
        <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Recent Orders</h3>
        <table class="min-w-full border-collapse border border-gray-300 dark:border-primary/10 rounded overflow-hidden">
          <thead>
            <tr class="bg-gray-100 dark:bg-backgroundDark">
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">Order ID</th>
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">User</th>
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">Date</th>
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">Amount</th>
              <th class="border p-2 text-left text-gray-700 dark:text-gray-200">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50 dark:hover:bg-white/5">
              <td class="border p-2">{{ order.id }}</td>
              <td class="border p-2">{{ order.user }}</td>
              <td class="border p-2">{{ order.date }}</td>
              <td class="border p-2">{{ order.amount }}</td>
              <td class="border p-2">
                <span :class="order.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'">{{ order.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="bg-white dark:bg-backgroundDark rounded shadow p-4">
        <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Recent Activity</h3>
        <ul>
          <li v-for="activity in recentActivities" :key="activity.id" class="mb-2 text-gray-700 dark:text-gray-200">
            <span class="font-semibold">{{ activity.user }}</span> {{ activity.action }}
            <span class="text-xs text-gray-500 ml-2">{{ activity.time }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Product Performance by Region -->
    <div class="bg-white dark:bg-backgroundDark rounded shadow p-4 mb-8">
      <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Product Performance by Region</h3>
      <!-- Placeholder for stacked bar chart, can use Chart.js or ApexCharts -->
      <canvas id="productPerformanceChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
// Dummy data for demonstration
const recentOrders = ref([
  { id: "#2345", user: "John Chen", date: "2025-09-22", amount: "R120.50", status: "Completed" },
  { id: "#2346", user: "Jane Smith", date: "2025-09-23", amount: "R95.30", status: "Pending" },
  { id: "#2347", user: "Robert Johnson", date: "2025-09-24", amount: "R151.10", status: "Completed" },
]);
const recentActivities = ref([
  { id: 1, user: "John Chen", action: "placed an order", time: "2h ago" },
  { id: 2, user: "Jane Smith", action: "logged in", time: "3h ago" },
  { id: 3, user: "Robert Johnson", action: "updated profile", time: "4h ago" },
]);

// Chart.js Example Integration
import Chart from 'chart.js/auto';

onMounted(() => {
  // Monthly Revenue Line Chart
  const monthlyRevenueCtx = document.getElementById('monthlyRevenueChart');
  if (monthlyRevenueCtx) {
    new Chart(monthlyRevenueCtx, {
      type: 'line',
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 15000, 13000, 16000, 18000],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { grid: { display: true } } }
      }
    });
  }

  // Revenue Sources Pie Chart
  const revenueSourcesCtx = document.getElementById('revenueSourcesChart');
  if (revenueSourcesCtx) {
    new Chart(revenueSourcesCtx, {
      type: 'pie',
      data: {
        labels: ['Groceries', 'Bulk Orders', 'Subscriptions', 'Other'],
        datasets: [{
          data: [60, 25, 10, 5],
          backgroundColor: ['#fde047', '#6366f1', '#f472b6', '#22d3ee'],
        }]
      },
      options: { responsive: true }
    });
  }

  // Product Performance by Region (Stacked Bar)
  const productPerformanceCtx = document.getElementById('productPerformanceChart');
  if (productPerformanceCtx) {
    new Chart(productPerformanceCtx, {
      type: 'bar',
      data: {
        labels: ['TUT Sosha', 'TUT Main', 'TUT Arcadia', 'UP'],
        datasets: [
          { label: 'Rice', data: [5000, 7000, 6000, 8000], backgroundColor: '#6366f1' },
          { label: 'Milk', data: [2000, 3000, 2500, 4000], backgroundColor: '#f472b6' },
          { label: 'Bread', data: [1500, 2000, 1800, 2200], backgroundColor: '#fde047' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } },
        scales: { x: { stacked: true }, y: { stacked: true } }
      }
    });
  }
});
</script>