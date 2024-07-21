<template>
  <main class="grid grid-flow-col grid-cols-11 min-h-screen bg-background">
    <div
      class="min-h-2/3 w-full h-fit col-span-9 col-start-2 rounded-lg sm:col-span-9 sm:col-start-2 md:col-span-3 md:col-start-5 bg-white border-2 border-slate-800 z-10 place-self-center"
    >
      <div class="grid grid-flow-row sm:grid-flow-col grid-row-2 sm:grid-col-2">
        <div class="flex items-center justify-center mx-auto gap-2">
          <img class="mx-auto mt-6 w-12 h-12 my-auto sm:ml-0" src="" alt="" />
          <p class="mx-auto w-fit text-xl text-center font-semibold pt-8">
            OnTime
          </p>
        </div>
      </div>
      <div class="divider h-10"></div>
      <p class="mx-auto w-fit text-2xl mb-12 font-semibold">
        Good to see you again!
      </p>
      <div class="grid grid-flow-col grid-cols-12">
        <p class="col-span-10 col-start-2 text-sm font-medium">Email</p>
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-2">
        <input
          v-model="email"
          id="email"
          type="email"
          placeholder="yourname_id@limu.edu.ly"
          class="col-span-10 rounded-sm col-start-2 h-[3.375rem] bg-gray-50 pr-4 text-sm font-normal p-3.5"
          required
        />
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-2"></div>
      <div class="grid grid-flow-col grid-cols-12">
        <p class="col-span-10 col-start-2 text-sm font-medium">Password</p>
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-2">
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="••••••••"
          class="col-span-10 rounded-sm col-start-2 h-[3.375rem] bg-gray-50 pr-4 text-lg font-normal p-3.5"
          required
        />
      </div>
      <div class="grid grid-flow-col grid-cols-12 my-4 pb-5">
        <div class="flex items-center justify-between col-span-10 col-start-2">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50"
              />
            </div>
            <div class="ml-2 text-sm">
              <label for="remember" class="text-gray-500">Remember me</label>
            </div>
          </div>
          <router-link
            to=""
            class="text-sm font-medium text-primary-600 hover:underline text-blue-600"
          >
            Forgot password?
          </router-link>
        </div>
      </div>
      <router-link to="/home">
        <div class="grid grid-flow-col grid-cols-12 my-4 pb-5">
          <button
            @click="login()"
            class="bg-blue-800 hover:bg-blue-900 col-span-10 col-start-2 h-[3.375rem] text-white font-medium text-lg rounded-sm"
          >
            Login
          </button>
        </div>
      </router-link>
      <div class="col-span-10 col-start-2">
        <p class="text-center text-sm font-normal text-slate-700">
          Don’t have an account yet?
          <router-link
            to="/register"
            class="text-blue-700 font-semibold text-primary-600 hover:underline"
            >Sign Up Now!</router-link
          >
        </p>
        <div class="divider h-10"></div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "../../stores/AuthStore";

const email = ref("sufyan_3196@limu.edu.ly");
const password = ref("12345678");
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/student/login/",
      {
        email: email.value,
        password: password.value,
      }
    );

    const token = response.data.token;
    authStore.setToken(token);
    router.replace("/home");
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
body {
  background-color: #efefef;
}

* {
  font-family: "Alexandria", sans-serif;
}
</style>
