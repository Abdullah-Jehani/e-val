import { defineStore } from "pinia";
import axios from "axios";
import router from "../routes";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: null,
    password: null,
    username: null,
    token: null,
    errorMessage: null,
  }),
  getters: {
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
    getPassword: (state) => state.password,
    getUserName: (state) => state.username,
    getErrorMessage: (state) => state.errorMessage,
  },
  actions: {
    async login() {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.post(apiUrl + "login", {
          email: this.email,
          password: this.password,
        });
        router.push("/dashboard");
      } catch {
        console.log("Error");
      }
    },
    async register() {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.post(apiUrl + "register", {
          email: this.email,
          password: this.password,
          username: this.username,
        });
        router.push("/login");
      } catch {
        console.log("Error");
      }
    },

    async logout() {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.post(apiUrl + "logout");
        router.push("/login");
      } catch {
        console.log("Error");
      }
    },
  },

  persist: true,
});
