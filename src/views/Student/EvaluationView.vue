<template>
  <div
    class="px-3 md:p-0 grid gap-y-6 md:gap-y-12 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12"
  >
    <div
      class="col-span-full place-self-center lg:col-span-6 lg:col-start-4 w-full"
    >
      <select
        v-model="selectedCourseId"
        @change="updateCourseInfo"
        name="course"
        id="course"
        class="mx-auto cursor-pointer w-full border border-lightPurple bg-mainWhite p-4 rounded-lg focus:ring-0 focus:outline-none focus:shadow-outline"
      >
        <option disabled selected value="">Select Course</option>
        <option v-for="course in courses" :value="course.id" :key="course.id">
          {{ course.name }}
        </option>
      </select>
    </div>

    <div class="col-span-full lg:col-span-full w-full">
      <form-header :courseName="courseName" :instructorName="instructorName" />
    </div>
    <div
      class="mt-4 lg:mt-0 lg:col-span-3 col-start-1 col-span-full row-start-end lg:row-start-end lg:col-start-1"
    >
      <router-link
        to="/success"
        class="bg-mainPurple hover:bg-darkPurple text-white font-bold lg:py-5 py-4 rounded focus:outline-none focus:shadow-outline transition-all duration-150 ease-in-out text-2xl w-full h-full block text-center"
      >
        Submit Evaluation
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import FormHeader from '../../components/Student/Form/FormHeader.vue';

const courseName = ref('No Course Selected');
const instructorName = ref('No Course Selected');
const selectedCourseId = ref('');

const courses = [
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
    code: '54321',
    name: 'Web Development Fundamentals',
    Instructor: 'Mousa Hassan',
  },
  {
    id: 4,
    code: '98765',
    name: 'Mobile App Development',
    Instructor: 'Najib Mohamed',
  },
  {
    id: 5,
    code: '43210',
    name: 'Database Management Systems',
    Instructor: 'Feras Ali',
  },
];

function updateCourseInfo() {
  const selectedCourse = courses.find(
    (course) => course.id === parseInt(selectedCourseId.value)
  );
  if (selectedCourse) {
    courseName.value = selectedCourse.name;
    instructorName.value = selectedCourse.Instructor;
  } else {
    courseName.value = 'No Course Selected';
    instructorName.value = 'No Course Selected';
  }
}
</script>
