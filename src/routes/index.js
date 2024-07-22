import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.vue';
import StudentDashboardView from '../views/Student/DashboardView.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: AuthenticatedLayout,
    children: [
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: StudentDashboardView,
      },
      // Add more authenticated routes here
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ensure you protect your routes and redirect users to the login page if they are not authenticated.

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem('token'); // Adjust according to your auth logic
//   if (
//     to.matched.some((record) => record.meta.requiresAuth) &&
//     !isAuthenticated
//   ) {
//     next('/');
//   } else {
//     next();
//   }
// });

export default router;
