import { defineStore } from "pinia";
import axios from "axios";
import router from "../routes";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    role: null,
    user: {
      email: null,
      password: null,
      student_id: null,
      token: null,
      isApproved: false,
      errorMessage: null,
      isEvaluated: false,
      department_id: null,
      registered_courses: [],
      evaluated_courses: [],
    },
    admin: {
      email: null,
      password: null,
      token: null,
      errorMessage: null,
    },
  }),
  getters: {
    getUserEmail: (state) => state.user.email,
    getAdminEmail: (state) => state.admin.email,
    getUserToken: (state) => state.user.token,
    getAdminToken: (state) => state.admin.token,
    getUserPassword: (state) => state.user.password,
    getAdminPassword: (state) => state.admin.password,
    getStudentId: (state) => state.user.student_id,
    getUserErrorMessages: (state) => state.user.errorMessage,
    getAdminErrorMessages: (state) => state.admin.errorMessage,
    getRole: (state) => state.role,
    getIsApproved: (state) => state.user.isApproved,
    getIsEvaluated: (state) => state.user.isEvaluated,
    getDepartmentId: (state) => state.user.department_id,
    getRegisteredCourses: (state) => state.user.registered_courses,
    getEvaluatedCourses: (state) => state.user.evaluated_courses,
  },
  actions: {
    async register() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.post(apiUrl + "register", {
          email: this.user.email,
          password: this.user.password,
          student_id: this.user.student_id,
        });

        this.isEvaluated = response.data.student.is_evaluated;
        this.isApproved = response.data.student.is_approved;
        this.user.evaluated_courses = response.data.student.evaluated_courses;
        this.user.registered_courses = response.data.student.registered_courses;
        this.user.department_id = response.data.student.department_id;
        console.log("Registered Courses:", this.user.registered_courses);
        alert("Register Successful");
        router.push("/login");
      } catch (error) {
        console.log("Error:", error);
      }
    },
    async logout() {
      const apiUrl = import.meta.env.VITE_APP_API_URL;
      try {
        const response = await axios.post(
          apiUrl + "logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.admin.token ?? this.user.token}`, // still not tested , waiting for ezzo changes.
            },
          }
        );
        console.log(response);
        alert("Logout Successful");
        this.admin.token = null;
        this.user.token = null;
        this.role = null;
        this.user.email = null;
        this.user.password = null;
        this.user.student_id = null;
        this.user.errorMessage = null;
        this.admin.email = null;
        this.admin.password = null;
        this.admin.errorMessage = null;
        router.push("/login");
      } catch {
        router.push("/login");
        alert("Logout");
        console.log("Errorc" + error);
        router.push("/login");
        alert("Logout");
      }
    },
    clearData() {
      this.user.email = null;
      this.user.password = null;
      this.user.student_id = null;
      this.user.errorMessage = null;
      this.admin.email = null;
      this.admin.password = null;
      this.admin.errorMessage = null;

      this.role = null;

      this.user.token = null;
      this.admin.token = null;

      this.user.isApproved = false;
    },
  },
  persist: true,
});
