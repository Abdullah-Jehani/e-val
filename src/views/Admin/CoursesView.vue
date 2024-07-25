<template>
  <div
    class="px-3 md:p-0 grid gap-y-3 md:gap-y-8 lg:gap-y-6 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12"
  >
    <general-table
      :objects="courses"
      :cardTitle="'Courses'"
      :routeName="'View All Courses'"
      :route="'/admin/courses'"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GeneralTable from '../../components/Admin/GeneralTable.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const courses = ref([
  {
    id: 1,
    code: '12345',
    name: 'Introduction to Programming',
    Instructor: 'Sami Khaled',
  },
  {
    id: 2,
    code: '67890',
    name: 'Data Structures and Algorithms',
    Instructor: 'Faraj Ahmed',
  },
  {
    id: 3,
    code: '12345',
    name: 'Introduction to Programming',
    Instructor: 'Sami Khaled',
  },
  {
    id: 4,
    code: '67890',
    name: 'Data Structures and Algorithms',
    Instructor: 'Faraj Ahmed',
  },
  {
    id: 5,
    code: '12345',
    name: 'Introduction to Programming',
    Instructor: 'Sami Khaled',
  },
  {
    id: 6,
    code: '67890',
    name: 'Data Structures and Algorithms',
    Instructor: 'Faraj Ahmed',
  },
  {
    id: 7,
    code: '12345',
    name: 'Introduction to Programming',
    Instructor: 'Sami Khaled',
  },
  {
    id: 8,
    code: '67890',
    name: 'Data Structures and Algorithms',
    Instructor: 'Faraj Ahmed',
  },
  {
    id: 9,
    code: '12345',
    name: 'Introduction to Programming',
    Instructor: 'Sami Khaled',
  },
  {
    id: 10,
    code: '67890',
    name: 'Data Structures and Algorithms',
    Instructor: 'Faraj Ahmed',
  },
]);
</script>
