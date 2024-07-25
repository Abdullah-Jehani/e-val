import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/auth/LoginView.vue';
import RegisterView from '../views/auth/RegisterView.vue';
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.vue';
// Student views
import StudentDashboardView from '../views/Student/DashboardView.vue';
import EvaluationView from '../views/Student/EvaluationView.vue';
import SubmitSuccessView from '../views/Student/SubmitSuccessView.vue';

// Admin views
import AdminDashboardView from '../views/Admin/DashboardView.vue';
import CoursesView from '../views/Admin/CoursesView.vue';

const routes = [
  {
    // Authenticated Student routes
    path: '/',
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
        component: EvaluationView,
      },
      {
        path: '/success',
        name: 'SubmitSuccess',
        component: SubmitSuccessView,
      },
      // Add more authenticated routes here
    ],
  },
  // Authenticated Admin routes
  {
    path: '/admin',
    component: AuthenticatedLayout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboardView,
      },
      {
        path: 'courses',
        name: 'Courses',
        component: CoursesView,
      },
    ],
  },

  // Authentication routes
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
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
