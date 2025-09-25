import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import GroceryList from '../pages/GroceryList.vue'
import Login from '../pages/Login.vue'
import UsersList from '../pages/UsersList.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/grocery-lists', name: 'GroceryList', component: GroceryList },
  { path: '/login', name: 'Login', component: Login },
  { path: '/users', name: 'UsersList', component: UsersList },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router