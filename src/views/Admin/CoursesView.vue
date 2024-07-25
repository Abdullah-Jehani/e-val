<template>
  <div
    class="px-3 md:p-0 grid gap-y-0 md:gap-y-5 lg:gap-y-6 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12 h-fit"
  >
    <div class="col-span-full my-4 lg:my-2 h-auto">
      <filters-component
        @update:department="updateDepartment"
        @update:search="updateSearch"
        :objects="courses"
        :modalTitle="'Courses'"
      />
    </div>
    <div class="col-span-full my-4 lg:my-2 h-fit rounded-md bg-offWhite p-1">
      <clickable-table
        :objects="filteredCourses"
        :border="true"
        class="p-3 bg-offWhite"
        @object-selected="handleCourseSelected"
      />
    </div>
    <div
      v-if="selectedCourse"
      class="col-span-full my-4 lg:my-2 h-fit rounded-md bg-offWhite p-3"
    >
      <h2 class="text-lg font-bold">Selected Course:</h2>
      <p>ID: {{ selectedCourse.id }}</p>
      <p>Name: {{ selectedCourse.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FiltersComponent from '../../components/Admin/FiltersComponent.vue';
import ClickableTable from '../../components/Admin/ClickableTable.vue';

const selectedDepartment = ref('');
const searchQuery = ref('');
const selectedCourse = ref(null);

const courses = ref([
  {
    id: '12345',
    department: 'Department 1',
    name: 'Introduction to Programming',
  },
  {
    id: '67890',
    department: 'Department 2',
    name: 'Data Structures and Algorithms',
  },
  {
    id: '54321',
    department: 'Department 1',
    name: 'Web Development Fundamentals',
  },
  { id: '98765', department: 'Department 3', name: 'Mobile App Development' },
  {
    id: '43210',
    department: 'Department 3',
    name: 'Database Management Systems',
  },
  { id: '98765', department: 'Department 1', name: 'Mobile App Development' },
  { id: '77542', department: 'Department 2', name: 'Operating Systems' },
  { id: '98765', department: 'Department 2', name: 'Visual Programming' },
  { id: '76544', department: 'Department 3', name: 'Software Design' },
]);

const filteredCourses = computed(() => {
  return courses.value.filter(
    (course) =>
      (!selectedDepartment.value ||
        course.department === selectedDepartment.value) &&
      (!searchQuery.value ||
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.id.toLowerCase().includes(searchQuery.value.toLowerCase()))
  );
});

const updateDepartment = (department) => {
  selectedDepartment.value = department;
};

const updateSearch = (query) => {
  searchQuery.value = query;
};

const handleCourseSelected = (course) => {
  selectedCourse.value = course;
};
</script>
