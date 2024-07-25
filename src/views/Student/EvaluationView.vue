<template>
  <div
    class="px-3 md:p-0 grid gap-y-3 md:gap-y-8 lg:gap-y-6 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12"
  >
    <!-- Floating Notification -->
    <div
      v-if="showNotification"
      class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-200 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-md shadow-md z-50"
      role="alert"
    >
      <span class="block sm:inline"
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
    <!-- Placeholder -->
    <section class="col-span-full lg:col-span-full w-full">
      <h1 class="text-2xl font-bold mb-4 lg:mb-5 text-darkPurple">
        Evaluating the quality of content delivery
      </h1>
      <div class="w-full flex flex-col gap-4">
        <div
          v-for="(question, index) in questions"
          :key="question.id"
          class="w-full border rounded-md bg-white flex gap-8 md:min-h-64 h-auto justify-between flex-col border-lightPurple p-4 lg:p-4"
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
              :disabled="!isFormEnabled"
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
              <template v-for="(option, optionIndex) in question.options">
                <input
                  type="radio"
                  :name="`question-${question.id}`"
                  :id="`question-${question.id}-${optionIndex}`"
                  :value="option"
                  v-model="question.selectedOption"
                  class="sr-only"
                  aria-hidden="true"
                  :disabled="!isFormEnabled"
                />
                <label
                  :for="`question-${question.id}-${optionIndex}`"
                  :aria-label="option"
                  :class="{
                    'bg-mainPurple text-white':
                      question.selectedOption === option,
                    'bg-offWhite text-black hover:brightness-95':
                      question.selectedOption !== option,
                    'cursor-not-allowed opacity-50': !isFormEnabled,
                  }"
                  class="block hover:filter border-none p-4 rounded-lg cursor-pointer text-center transition-all duration-300 ease-in-out"
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
import { ref, computed } from 'vue';
import FormHeader from '../../components/Student/Form/FormHeader.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const courseName = ref('No Course Selected');
const instructorName = ref('No Course Selected');
const selectedCourseId = ref('');
const showNotification = ref(true);

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

const questions = ref([
  {
    id: 1,
    question: 'Explanation of the course material is clear and understandable',
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
    question: 'Course topics are clear and related to the course content.',
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
    question: 'Notes/presentations cover all course topics.',
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
    id: 4,
    question:
      'Course books/references (digital or physical) are reliable and up-to-date.',
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
    id: 5,
    question: 'Clear audio and video in recorded lectures.',
    selectedOption: '',
    options: [
      'Strongly Disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly Agree',
    ],
  },
]);

const isFormEnabled = computed(() => selectedCourseId.value !== '');

function submitForm() {
  if (!isFormEnabled.value) return;

  for (const question of questions.value) {
    if (question.selectedOption === '') {
      toast.error('Please answer all questions');
      return;
    }
  }
  console.log(questions.value.map((q) => q.selectedOption));
  // Clear selected options and course
  selectedCourseId.value = '';
  updateCourseInfo();
  questions.value.forEach((question) => {
    question.selectedOption = '';
  });
  toast.success('Evaluation submitted successfully!');
}

function updateCourseInfo() {
  const selectedCourse = courses.find(
    (course) => course.id === parseInt(selectedCourseId.value)
  );
  if (selectedCourse) {
    courseName.value = selectedCourse.name;
    instructorName.value = selectedCourse.Instructor;
    showNotification.value = false;
  } else {
    courseName.value = 'No Course Selected';
    instructorName.value = 'No Course Selected';
    showNotification.value = true;
  }
}
</script>
