<template>
  <div
    class="px-3 md:p-0 grid gap-y-3 md:gap-y-8 lg:gap-y-6 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12 h-fit"
  >
    <div class="col-span-full my-6 lg:my-2 h-auto">
      <filters-component />
    </div>
    <div class="col-span-full my-6 lg:my-2 h-fit rounded-md bg-offWhite p-1">
      <general-table
        :objects="courses"
        :cardTitle="''"
        :border="true"
        class="p-3 bg-offWhite"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FiltersComponent from '../../components/Admin/FiltersComponent.vue';
import GeneralTable from '../../components/Admin/GeneralTable.vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const courses = [
  { id: '12345', name: 'Introduction to Programming' },
  { id: '67890', name: 'Data Structures and Algorithms' },
  { id: '54321', name: 'Web Development Fundamentals' },
  { id: '98765', name: 'Mobile App Development' },
  { id: '43210', name: 'Database Management Systems' },
  { id: '98765', name: 'Mobile App Development' },
  { id: '77542', name: 'Operating Systems' },
  { id: '98765', name: 'Visual Programming' },
  { id: '76544', name: 'Software Design' },
];
</script>
