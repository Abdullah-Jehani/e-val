<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white rounded-md shadow-lg p-6 w-2/3">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold">Enrolled Students</h2>
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
        <table class="w-full table-auto text-left">
          <thead>
            <tr>
              <th class="px-4 py-2">Select</th>
              <th class="px-4 py-2">Course Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.id">
              <td class="px-4 py-2">
                <input
                  type="checkbox"
                  v-model="selectedCourses"
                  :value="course.id"
                />
              </td>
              <td class="px-4 py-2">{{ course.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex justify-end mt-4">
        <button
          @click="exportCourses"
          class="bg-mainPurple text-white px-4 py-2 rounded-md"
        >
          Export
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  courses: {
    type: Array,
    required: true,
  },
});

const selectedCourses = ref([]);

const exportCourses = () => {
  console.log('Selected Courses:', selectedCourses.value);
  // Add your export logic here
};

watch(selectedCourses, (newVal) => {
  console.log('Selected Courses Updated:', newVal);
});
</script>

<style scoped>
.bg-mainWhite {
  background-color: #ffffff;
}
.bg-mainPurple {
  background-color: #7d4eff;
}
</style>
