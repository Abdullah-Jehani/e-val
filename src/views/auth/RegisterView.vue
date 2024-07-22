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
        Welcome to the <br />
        E-Valuation System!
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
          <label
            for="studentId"
            class="block text-sm font-medium text-mainBlack"
            >Student ID</label
          >
          <input
            v-model="studentId"
            type="number"
            id="studentId"
            placeholder="1234"
            class="block w-full rounded-md border h-[3.375rem] bg-white text-sm font-normal p-4 appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            min="4"
            max="4"
            pattern="[0-9]{4}"
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
            class="block w-full rounded-md border h-[3.375rem] bg-white text-sm font-normal p-4"
            required
          />
        </div>
        <div class="mt-10 mb-4 pb-5">
          <input
            type="submit"
            class="block w-full bg-mainPurple hover:bg-darkPurple h-[3.375rem] text-white font-medium text-lg rounded-md transition-all duration-100 ease-in-out text-center cursor-pointer"
            value="Sign up"
          />
        </div>
      </form>
      <div>
        <p class="text-center text-sm font-normal text-slate-700">
          Already have an account?
          <router-link
            to="/"
            class="text-mainPurple font-semibold text-primary-600 hover:underline"
          >
            Login
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
const studentId = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const signup = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/student/Reg/',
      {
        name: 'username',
        email: email.value,
        student_id: studentId.value,
        password: password.value,
      }
    );
    const token = response.data.token;
    authStore.setToken(token);
    router.push('/home');
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
body {
  background-color: #efefef;
}

.bg-circle {
  top: 50%;
}
</style>
