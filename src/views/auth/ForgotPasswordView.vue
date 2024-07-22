<template>
  <main class="grid lg:grid-cols-12 min-h-screen lg:bg-mainWhite bg-mainWhite">
    <!-- <div
      class="hidden absolute top-1/4 -left-24 translate-x-0.5 translate-y-0.5 h-[200vh] min-w-screen z-0 bg-mainPurple rounded-full aspect-square lg:flex items-center justify-center"
    ></div> -->
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
        Enter your email <br />
        to reset your password
      </p>
      <form @submit.prevent="sendResetEmail">
        <div class="flex flex-col gap-2 mb-4">
          <label for="email" class="block text-sm font-medium text-mainBlack"
            >Email</label
          >
          <input
            v-model="email"
            id="email"
            type="email"
            placeholder="yourname_id@limu.edu.ly"
            class="block w-full rounded-md border h-[3.375rem] bg-white text-sm font-normal p-4"
            required
          />
        </div>
        <div class="pb-5 mt-10">
          <button
            type="submit"
            class="block w-full bg-mainPurple hover:bg-darkPurple h-[3.375rem] text-white font-medium text-lg rounded-md transition-all duration-100 ease-in-out"
          >
            Send Email
          </button>
        </div>
        <div class="text-center">
          <router-link
            to="/"
            class="text-mainPurple font-semibold text-primary-600 hover:underline"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const email = ref('');
const toast = useToast();

const sendResetEmail = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/student/forgot-password/', {
      email: email.value,
    });
    toast.success('Reset email sent successfully!');
  } catch (error) {
    console.error(error);
    toast.error('Failed to send reset email.');
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
