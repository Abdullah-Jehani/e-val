import { createRouter, createWebHistory } from 'vue-router';
// import { useAuthStore } from '../stores/authstore';

// Auth views
import LoginView from '../views/Auth/LoginView.vue';
import RegisterView from '../views/Auth/RegisterView.vue';
import ForgotPasswordView from '../views/Auth/ForgotPasswordView.vue';
import ResetPasswordView from '../views/Auth/ResetPasswordView.vue';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout.vue';

// Student views
import StudentDashboardView from '../views/Student/DashboardView.vue';
import EvaluationView from '../views/Student/EvaluationView.vue';
import SubmitSuccessView from '../views/Student/SubmitSuccessView.vue';
import PendingView from '../views/Student/PendingView.vue';

// Admin views
import AdminDashboardView from '../views/Admin/DashboardView.vue';
import CoursesView from '../views/Admin/CoursesView.vue';
import StudentsView from '../views/Admin/StudentsView.vue';

const routes = [
  {
    path: '/',
    component: AuthenticatedLayout,
    redirect: '/dashboard',
    // meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'StudentDashboard',
        component: StudentDashboardView,
        // meta: { requiresAuth: true, requiresApproval: true },
      },
      {
        path: 'evaluation',
        name: 'Evaluation',
        component: EvaluationView,
        // meta: { requiresAuth: true, requiresApproval: true },
      },
      {
        path: 'success',
        name: 'SubmitSuccess',
        component: SubmitSuccessView,
        // meta: { requiresAuth: true, requiresApproval: true },
      },
      {
        path: 'pending',
        name: 'Pending',
        component: PendingView,
        // meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/admin',
    component: AuthenticatedLayout,
    redirect: '/admin/dashboard',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboardView,
        // meta: { requiresAuth: true },
      },
      {
        path: 'courses',
        name: 'Courses',
        component: CoursesView,
        // meta: { requiresAuth: true },
      },
      {
        path: 'students',
        name: 'Students',
        component: StudentsView,
        // meta: { requiresAuth: true },
      },
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
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPasswordView,
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

// Navigation Guard
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();
//   const isAuthenticated = !!authStore.getUserToken || !!authStore.getAdminToken;
//   const isApproved = authStore.getIsApproved;
//   const role = authStore.getRole;

//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next('/login');
//     } else {
//       if (role === 'student') {
//         if (!isApproved && to.name !== 'Pending') {
//           next('/pending');
//         } else if (isApproved) {
//           next();
//         } else {
//           next('/login');
//         }
//       } else if (role === 'admin') {
//         if (to.path.startsWith('/admin')) {
//           next();
//         } else {
//           next('/admin/dashboard');
//         }
//       } else {
//         next('/login');
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router;
