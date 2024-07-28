<template>
  <div
    class="px-3 md:p-0 grid gap-y-3 md:gap-y-8 lg:gap-y-6 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12"
  >
    <!-- Floating Notification -->
    <div
      v-if="showNotification"
      class="fixed top-1/3 left-1/2 transform -translate-x-1/2 lg:-translate-x-20 bg-brightGreen border border-darkGreen text-lightOil px-4 py-3 rounded-md shadow-md z-10 lg:text-center text-lg cursor-help"
      role="alert"
    >
      <span class="inline"
        >Please select a course to start the evaluation.</span
      >
    </div>

    <!-- Select Course -->
    <div
      class="col-span-full place-self-center lg:col-span-6 lg:col-start-4 w-full"
    >
      <select
        v-model="selectedCourseId"
        @change="updateCourseInfo"
        name="course"
        id="course"
        class="mx-auto cursor-pointer w-full border border-lightPurple bg-offWhite p-4 rounded-md focus:ring-0 focus:outline-none focus:shadow-outline"
      >
        <option disabled value="">Select Course</option>
        <option
          v-for="course in registeredCourses"
          :value="course.id"
          :key="course.id"
        >
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
    <form-body :sections="sections" :isFormEnabled="isFormEnabled" />

    <!-- Submit Button -->
    <div
      class="mt-4 lg:mt-0 lg:col-span-3 col-start-1 col-span-full row-start-end lg:row-start-end lg:col-start-1"
    >
      <button
        @click.prevent="submitForm"
        :disabled="!isFormEnabled"
        class="bg-mainPurple hover:bg-darkPurple text-white font-bold lg:py-5 py-4 rounded focus:outline-none focus:shadow-outline transition-all duration-150 ease-in-out text-2xl w-full h-full block text-center"
        :class="{ 'cursor-not-allowed opacity-50': !isFormEnabled }"
      >
        Submit Evaluation
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import FormHeader from '../../components/Student/Form/FormHeader.vue';
import FormBody from '../../components/Student/Form/FormBody.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';
import { useAuthStore } from '../../stores/AuthStore';

const authStore = useAuthStore();

const registeredCourses = ref([]);

const sections = ref([
  {
    id: 1,
    title: 'Evaluating the quality of content delivery',
    questions: [
      {
        id: 1,
        text: 'Explanation of the course material is clear and understandable',
        selectedOption: '',
        options: [
          { text: 'Strongly Disagree', value: 0 },
          { text: 'Disagree', value: 1 },
          { text: 'Neutral', value: 2 },
          { text: 'Agree', value: 3 },
          { text: 'Strongly Agree', value: 4 },
        ],
      },
      {
        id: 2,
        text: 'Course topics are clear and related to the course content.',
        selectedOption: '',
        options: [
          { text: 'Strongly Disagree', value: 0 },
          { text: 'Disagree', value: 1 },
          { text: 'Neutral', value: 2 },
          { text: 'Agree', value: 3 },
          { text: 'Strongly Agree', value: 4 },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Evaluating the resources and references',
    questions: [
      {
        id: 1,
        text: 'Notes/presentations cover all course topics.',
        selectedOption: '',
        options: [
          { text: 'Strongly Disagree', value: 0 },
          { text: 'Disagree', value: 1 },
          { text: 'Neutral', value: 2 },
          { text: 'Agree', value: 3 },
          { text: 'Strongly Agree', value: 4 },
        ],
      },
      {
        id: 2,
        text: 'Course books/references (digital or physical) are reliable and up-to-date.',
        selectedOption: '',
        options: [
          { text: 'Strongly Disagree', value: 0 },
          { text: 'Disagree', value: 1 },
          { text: 'Neutral', value: 2 },
          { text: 'Agree', value: 3 },
          { text: 'Strongly Agree', value: 4 },
        ],
      },
      {
        id: 3,
        text: 'Clear audio and video in recorded lectures.',
        selectedOption: '',
        options: [
          { text: 'Strongly Disagree', value: 0 },
          { text: 'Disagree', value: 1 },
          { text: 'Neutral', value: 2 },
          { text: 'Agree', value: 3 },
          { text: 'Strongly Agree', value: 4 },
        ],
      },
    ],
  },
]);

const selectedCourseId = ref('');
const courseName = ref('No Course Selected');
const instructorName = ref('No Course Selected');
const showNotification = ref(true);

const isFormEnabled = computed(() => selectedCourseId.value !== '');

const toast = useToast();

function submitForm() {
  if (!isFormEnabled.value) return;

  for (const section of sections.value) {
    for (const question of section.questions) {
      if (question.selectedOption === '') {
        toast.error('Please answer all questions');
        return;
      }
    }
  }

  console.log(
    sections.value.map((section) => ({
      title: section.title,
      questions: section.questions.map((q) => ({
        text: q.text,
        selectedOption: q.selectedOption,
        selectedValue:
          q.options.find((option) => option.value === q.selectedOption)?.text ||
          null,
      })),
    }))
  );

  resetForm();

  toast.success('Evaluation submitted successfully!');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateCourseInfo() {
  const selectedCourse = registeredCourses.value.find(
    (course) => course.id === selectedCourseId.value
  );
  if (selectedCourse) {
    courseName.value = selectedCourse.name;
    instructorName.value = selectedCourse.instructor;
    showNotification.value = false;
  } else {
    courseName.value = 'No Course Selected';
    instructorName.value = 'No Course Selected';
    showNotification.value = true;
  }
}

// fetching registeredCourses
const fetchRegisteredCourses = async () => {
  try {
    registeredCourses.value = authStore.getRegisteredCourses;
  } catch (error) {
    console.error('Error fetching registeredCourses:', error);
  }
};

onMounted(fetchRegisteredCourses);

// Clear selected options and course
function resetForm() {
  selectedCourseId.value = '';
  updateCourseInfo();
  sections.value.forEach((section) => {
    section.questions.forEach((question) => {
      question.selectedOption = '';
    });
  });
}
</script>
