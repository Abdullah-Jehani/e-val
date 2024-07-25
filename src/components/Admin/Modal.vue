<template>
  <div
    class="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-80 flex justify-center items-center z-50 transition duration-200 ease-in-out"
  >
    <div class="bg-offWhite rounded-lg shadow-lg p-6 md:w-1/2 lg:w-2/5 w-7/8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">{{ title }}</h2>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="overflow-y-auto h-64">
        <general-table
          :objects="objects"
          cardTitle=""
          v-model:selection="selectedCourses"
          :border="border"
        />
      </div>
      <div class="w-full flex justify-center mt-4">
        <button
          @click="exportCourses"
          class="w-full bg-mainPurple text-white px-4 py-2 rounded-[4px] transition duration-200 ease-in-out"
        >
          Export
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { defineEmits } from 'vue';

import GeneralTable from '../../components/Admin/GeneralTable.vue';

const emit = defineEmits(['close']);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  objects: {
    type: Array,
    required: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
});

const selectedCourses = ref([]);

const exportCourses = () => {
  console.log('Selected Courses:', selectedCourses.value);
  // export logic here
};

watch(selectedCourses, (newVal) => {
  console.log('Selected Courses Updated:', newVal);
});
</script>

<style scoped></style>
