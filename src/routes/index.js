import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.vue';
// Student views
import StudentDashboardView from '../views/Student/DashboardView.vue';
import SubmitSuccessView from '../views/Student/SubmitSuccessView.vue';

// Admin views
const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: AuthenticatedLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: StudentDashboardView,
      },
      {
        path: 'evaluation',
        name: 'Evaluation',
        component: StudentDashboardView,
      },

      {
        path: '/:pathMatch(.*)*',
        redirect: '/',
      },
      // Add more authenticated routes here
    ],
  },
  {
    path: '/success',
    name: 'SubmitSuccess',
    component: SubmitSuccessView,
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
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
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
