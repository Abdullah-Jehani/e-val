<template>
  <div class="overflow-x-auto rounded-md border-lightPurple">
    <div
      class="flex flex-col justify-between items-center p-4 pb-0 bg-offWhite"
    >
      <div class="w-full flex justify-between items-center p-2 pb-4">
        <h1 class="text-2xl font-bold text-mainBlack">{{ cardTitle }}</h1>
        <router-link
          :to="route"
          class="text-darkPurple font-semibold text-primary-600 hover:text-mainPurple transition-all duration-200 ease-in-out"
        >
          <p class="hidden md:block">{{ routeName }}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </router-link>
      </div>
      <div id="divider" class="w-full h-px bg-lightPurple"></div>
    </div>
    <div
      class="w-full overflow-y-auto overflow-x-clip h-64 lg:p-2 py-2 bg-offWhite font-medium"
    >
      <table class="table-auto text-left text-mainBlack">
        <tbody class="bg-offWhite truncate">
          <tr v-for="(object, index) in objects" :key="index" class="truncate">
            <td class="px-5 py-3 text-left md:table-cell">{{ object.id }}</td>
            <td class="lg:px-5 px-2 py-3 truncate">{{ object.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const objectId = ref('');
const objectName = ref('');

const props = defineProps({
  objects: {
    type: Array,
    required: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
});
</script>
