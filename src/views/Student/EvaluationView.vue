<template>
  <div
    class="px-3 md:p-0 grid gap-y-3 md:gap-y-8 lg:gap-y-6 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12"
  >
    <!-- Select Course -->
    <div
      class="col-span-full place-self-center lg:col-span-6 lg:col-start-4 w-full"
    >
      <select
        v-model="selectedCourseId"
        @change="updateCourseInfo"
        name="course"
        id="course"
        class="mx-auto cursor-pointer w-full border border-lightPurple bg-offWhite p-4 rounded-lg focus:ring-0 focus:outline-none focus:shadow-outline"
      >
        <option disabled selected value="">Select Course</option>
        <option v-for="course in courses" :value="course.id" :key="course.id">
          {{ course.name }}
        </option>
      </select>
    </div>

    <!-- Form -->
    <!-- Form Header -->
    <div class="col-span-full lg:col-span-full w-full">
      <form-header :courseName="courseName" :instructorName="instructorName" />
    </div>

    <!-- Form Body -->
    <!-- Placeholder -->
    <section class="col-span-full lg:col-span-full w-full">
      <div class="w-full">
        <div
          v-for="question in questions"
          :key="question.id"
          class="w-full border-b flex gap-auto h-64 justify-between flex-col border-lightPurple px-1 py-4 lg:p-4"
        >
          <div class="w-full flex gap-2">
            <label class="hidden md:block text-xl font-normal text-darkGray"
              >Q{{ question.id }}:</label
            >
            <p class="text-xl font-semibold text-mainBlack">
              {{ question.question }}
            </p>
          </div>
          <!-- Mobile View -->
          <div class="md:hidden">
            <select
              v-model="question.selectedOption"
              class="w-full border-none border-b lg:border-b-0 border-lightPurple bg-offWhite p-4 rounded-lg focus:ring-0 focus:outline-none focus:shadow-outline"
            >
              <option disabled selected value="">Select an option</option>
              <option
                v-for="option in question.options"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
          <!-- Mid and Large Screens -->
          <div class="hidden md:block">
            <div class="grid grid-cols-5 gap-4">
              <template v-for="option in question.options">
                <input
                  type="radio"
                  :id="`${question.id}-${option}`"
                  :value="option"
                  v-model="question.selectedOption"
                  class="sr-only"
                />
                <label
                  :for="`${question.id}-${option}`"
                  :class="{
                    'bg-lightPurple text-white':
                      question.selectedOption === option,
                    'bg-offWhite text-black':
                      question.selectedOption !== option,
                  }"
                  class="block border-none p-4 rounded-lg cursor-pointer text-center transition-all duration-150 ease-in-out"
                >
                  {{ option }}
                </label>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Placeholder End -->
    <!-- Form Body End -->

    <!-- Submit Button -->
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

const questions = [
  {
    id: 1,
    question: 'I am satisfied with the course content.',
    selectedOption: '',
    options: [
      'Strongly Disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly Agree',
    ],
  },
  {
    id: 2,
    question: 'The instructor is well-prepared for each lecture.',
    selectedOption: '',
    options: [
      'Strongly Disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly Agree',
    ],
  },
  {
    id: 3,
    question: 'The course material is organized and easy to follow.',
    selectedOption: '',
    options: [
      'Strongly Disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly Agree',
    ],
  },
];

function updateEvaluation() {}

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
