<template>
  <div
    class="flex h-24 flex-col md:flex-row justify-between items-end font-semibold text-lg"
  >
    <div class="w-full h-full flex-col flex justify-between items-start gap-2">
      <div
        class="flex gap-2 items-start w-full h-full md:w-auto justify-between"
      >
        <h1 class="text-2xl font-bold text-mainBlack">{{ title }}</h1>
        <div
          id="search"
          class="w-2/3 h-full flex md:hidden items-center bg-transparent min-w-1/2 border border-lightPurple rounded-[4px] px-4"
        >
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search"
            class="md:hidden bg-transparent text-mainBlack placeholder:text-slate-500 placeholder:font-normal font-medium min-w-1/2 w-full border-none focus:outline-none focus:ring-0"
          />
          <div class="pl-3 py-1 border-l border-l-mainPurple text-mainPurple">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="size-6"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="w-full md:w-auto flex justify-between items-center">
        <div class="flex gap-2 h-12">
          <button
            class="h-full bg-mainPurple text-white px-4 py-2 rounded-[4px] hover:bg-darkPurple transition"
            @click="selectAllDepartments"
          >
            All
          </button>
          <select
            v-model="selectedDepartment"
            class="h-full bg-brightGreen cursor-pointer text-mainOil px-4 py-2 rounded-[4px] border-none"
          >
            <option value="" disabled>All Department</option>
            <option
              v-for="department in departments"
              :key="department"
              :value="department"
            >
              {{ department }}
            </option>
          </select>
        </div>
        <button
          class="md:hidden flex place-self-end h-12 bg-mainPurple text-white px-4 py-2 rounded-[4px] hover:bg-darkPurple transition"
          @click="openExportModal(courses)"
        >
          Export
        </button>
      </div>
    </div>
    <div
      class="w-full flex justify-end md:flex-col gap-2 items-end mt-2 md:mt-0"
    >
      <button
        class="hidden md:block bg-mainPurple text-white px-4 py-2 rounded-[4px] hover:bg-darkPurple transition"
        @click="openExportModal(courses)"
      >
        Export
      </button>
      <div
        id="Search"
        class="w-full h-12 hidden md:flex items-center bg-transparent min-w-1/2 border border-lightPurple rounded-[4px] px-4"
      >
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="hidden md:block bg-transparent text-mainBlack placeholder:text-slate-500 placeholder:font-normal font-medium min-w-1/2 w-full border-none focus:outline-none focus:ring-0"
        />
        <div class="pl-3 py-1 border-l border-l-mainPurple text-mainPurple">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            className="size-6"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <GeneralTable
        :items="filteredCourses"
        v-model:selection="selectedCourses"
      />
      <div class="flex justify-end p-4">
        <button
          class="bg-mainPurple text-white px-4 py-2 rounded-[4px] hover:bg-darkPurple transition"
          @click="exportCourses"
        >
          Export
        </button>
      </div>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Modal from './Modal.vue';
import GeneralTable from './GeneralTable.vue';

const title = ref('Courses');
const departments = ref(['Department 1', 'Department 2', 'Department 3']);
const selectedDepartment = ref('');
const searchQuery = ref('');
const showModal = ref(false);
const selectedCourses = ref([]);

const courses = ref([
  { id: 1, name: 'Course 1', department: 'Department 1' },
  { id: 2, name: 'Course 2', department: 'Department 2' },
  { id: 3, name: 'Course 3', department: 'Department 3' },
  // add more courses as needed
]);

const filteredCourses = computed(() => {
  return courses.value.filter(
    (course) =>
      (!selectedDepartment.value ||
        course.department === selectedDepartment.value) &&
      (!searchQuery.value ||
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const selectAllDepartments = () => {
  selectedDepartment.value = '';
};

const openExportModal = (objects) => {
  selectedCourses.value = objects.map((course) => course.id);
  showModal.value = true;
};

const exportCourses = () => {
  console.log('Exporting courses:', selectedCourses.value);
  // Implement export functionality here
  showModal.value = false;
};
</script>

<style scoped>
* {
  @apply focus:outline-none focus:ring-0 focus:ring-offset-0;
}
</style>
