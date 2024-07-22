<template>
  <main class="grid lg:grid-cols-12 min-h-screen lg:bg-mainWhite bg-mainWhite">
    <div
      class="mx-auto min-h-2/3 py-12 px-10 w-full col-span-full lg:col-span-4 lg:col-start-5 h-fit col-start-2 rounded-lg sm:col-span-10 sm:col-start-2 md:col-span-4 md:col-start-5 lg:bg-white lg:border border-darkPurple lg:shadow-md shadow-darkPurple z-10 place-self-center"
    >
      <div class="flex items-center justify-center mx-auto mb-4">
        <img
          class="mx-auto mt-6 w-40 h-12 my-auto"
          src="/e-val-logo/main-logo2.svg"
          alt=""
        />
      </div>
      <p
        class="mx-auto w-fit text-2xl text-center my-8 font-semibold text-mainBlack"
      >
        Good to see you again!
      </p>
      <form @submit.prevent="login" class="w-full">
        <div class="flex flex-col gap-2 mb-4">
          <label for="email" class="block text-sm font-medium text-mainBlack"
            >Email</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="yourname_id@limu.edu.ly"
            class="block w-full rounded-md border h-12 bg-white text-sm font-normal p-4"
            required
          />
        </div>
        <div class="flex flex-col gap-2 mb-4">
          <label for="password" class="block text-sm font-medium text-mainBlack"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="••••••••"
            class="block w-full rounded-md border h-12 bg-white pr-4 text-lg font-normal p-3.5"
            required
          />
        </div>
        <div class="flex items-center justify-between mb-6 pb-5">
          <div class="flex items-start">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50"
            />
            <label for="remember" class="ml-2 text-sm text-gray-500"
              >Remember me</label
            >
          </div>
          <router-link
            to="/forgot-password"
            class="text-sm font-medium text-primary-600 hover:underline text-blue-600"
          >
            Forgot password?
          </router-link>
        </div>
        <div class="mb-4 pb-5">
          <input
            type="submit"
            class="block w-full bg-mainPurple hover:bg-darkPurple h-[3.375rem] text-white font-medium text-lg rounded-md transition-all duration-100 ease-in-out text-center cursor-pointer"
            value="Login"
          />
        </div>
      </form>
      <div>
        <p class="text-center text-sm font-normal text-slate-700">
          First time?
          <router-link
            to="/register"
            class="text-mainPurple font-semibold text-primary-600 hover:underline"
          >
            Register Now!
          </router-link>
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/AuthStore';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/student/login/',
      {
        email: email.value,
        password: password.value,
      }
    );

    const token = response.data.token;
    authStore.setToken(token);
    router.replace('/home');
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
body {
  background-color: #efefef;
}
</style>
