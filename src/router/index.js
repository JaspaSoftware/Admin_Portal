
import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Dashboard from '../pages/Dashboard.vue';
import GroceryList from '../pages/GroceryList.vue';
import Login from '../pages/Login.vue';
import UsersList from '../pages/UsersList.vue';
import Profile from '../pages/Profile.vue';
import Settings from '../pages/Settings.vue';
import Logout from '../pages/Logout.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/grocery-lists', name: 'GroceryList', component: GroceryList },
  { path: '/login', name: 'Login', component: Login },
  { path: '/users', name: 'UsersList', component: UsersList },
  { path: '/profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/settings', name: 'Settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/logout', name: 'Logout', component: Logout },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Firebase Auth Guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!requiresAuth) {
    // Public page, no check needed
    return next();
  }

  // Check Firebase auth state
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe(); // Stop listening immediately

    if (user) {
      next(); // User is logged in, allow access
    } else {
      next({ path: '/login', query: { redirect: to.fullPath } }); // Redirect to login
    }
  });
});

export default router;
