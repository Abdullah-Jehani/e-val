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
import { computed } from 'vue';
import FormHeader from '../../components/Student/Form/FormHeader.vue';
import FormBody from '../../components/Student/Form/FormBody.vue';
import { useToast } from 'vue-toastification';
import store from '../../stores/store';

// Reactive store data
const courses = computed(() => store.courses);
const selectedCourseId = computed({
  get: () => store.selectedCourseId,
  set: (value) => {
    store.selectedCourseId = value;
    store.updateCourseInfo();
  },
});
const courseName = computed(() => store.courseName);
const instructorName = computed(() => store.instructorName);
const sections = computed(() => store.sections);
const showNotification = computed(() => store.showNotification);

const toast = useToast();
const isFormEnabled = computed(() => store.selectedCourseId !== '');

function submitForm() {
  if (!isFormEnabled.value) return;

  for (const section of store.sections) {
    for (const question of section.questions) {
      if (question.selectedOption === '') {
        toast.error('Please answer all questions');
        return;
      }
    }
  }

  console.log(
    store.sections.map((section) => ({
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

  // Clear selected options and course
  store.resetForm();

  toast.success('Evaluation submitted successfully!');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
