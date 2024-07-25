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
    <div
      class="col-span-full my-4 md:my-0 h-fit rounded-md bg-offWhite p-1 border border-lightPurple"
    >
      <clickable-table
        :objects="filteredCourses"
        :border="true"
        class="p-3 bg-offWhite"
        @object-selected="handleCourseSelected"
      />
    </div>
    <div class="col-span-full lg:col-span-full w-full">
      <object-details
        :courseName="courseName"
        :instructorName="instructorName"
        :courseCode="courseCode"
        :courseCredits="courseCredits"
        :cards="cards"
        @card-selected="openModal"
      />
    </div>

    <Modal
      v-if="showModal"
      @close="showModal = false"
      :title="'Enrolled Students'"
      :objects="students"
    >
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FiltersComponent from '../../components/Admin/FiltersComponent.vue';
import ClickableTable from '../../components/Admin/ClickableTable.vue';
import ObjectDetails from '../../components/Admin/ObjectDetails.vue';
import Modal from '../../components/Admin/Modal.vue';

const selectedDepartment = ref('');
const searchQuery = ref('');
const selectedCourse = ref(null);
const showModal = ref(false);

const courseName = ref('No Course Selected');
const instructorName = ref('N/A');
const courseCode = ref('N/A');
const courseCredits = ref('N/A');

const courses = ref([
  {
    id: '12325',
    department: 'Department 1',
    name: 'Introduction to Programming',
    instructor: 'Instructor A',
    courseCode: 'CS101',
    courseCredits: '3',
  },
  {
    id: '61890',
    department: 'Department 2',
    name: 'Data Structures and Algorithms',
    instructor: 'Instructor B',
    courseCode: 'CS202',
    courseCredits: '4',
  },
  {
    id: '12341',
    department: 'Department 3',
    name: 'Web Development',
    instructor: 'Instructor C',
    courseCode: 'CS303',
    courseCredits: '3',
  },
  {
    id: '67090',
    department: 'Department 2',
    name: 'Database Management',
    instructor: 'Instructor D',
    courseCode: 'CS404',
    courseCredits: '4',
  },
  {
    id: '19345',
    department: 'Department 1',
    name: 'Software Engineering',
    instructor: 'Instructor E',
    courseCode: 'CS505',
    courseCredits: '3',
  },
  {
    id: '60090',
    department: 'Department 3',
    name: 'Artificial Intelligence',
    instructor: 'Instructor F',
    courseCode: 'CS606',
    courseCredits: '4',
  },
  {
    id: '00345',
    department: 'Department 2',
    name: 'Operating Systems',
    instructor: 'Instructor G',
    courseCode: 'CS707',
    courseCredits: '3',
  },
]);

const students = ref([
  {
    id: 12245,
    name: 'Sami Khaled',
    email: 'XwE8j@example.com',
    role: 'student',
  },
  {
    id: 12246,
    name: 'Ahmed Khaled',
    email: 'XwE8j@example.com',
    role: 'student',
  },
  {
    id: 12247,
    name: 'Ahmed Khaled',
    email: 'XwE8j@example.com',
    role: 'student',
  },
  {
    id: 12248,
    name: 'Ahmed Khaled',
    email: 'XwE8j@example.com',
    role: 'student',
  },
  {
    id: 12249,
    name: 'Ahmed Khaled',
    email: 'XwE8j@example.com',
    role: 'student',
  },
]);

const cards = ref([
  {
    id: 1,
    title: 'Enrolled Students',
    value: students.value.length,
  },
  {
    id: 2,
    title: 'Completed',
    value: students.value.length - 1,
  },
  {
    id: 3,
    title: 'Remaining',
    value: students.value.length,
  },
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
  updateCourseInfo(course);
};

function updateCourseInfo(course) {
  if (course) {
    courseName.value = course.name || 'No Course Selected';
    instructorName.value = course.instructor || 'N/A';
    courseCode.value = course.courseCode || 'N/A';
    courseCredits.value = course.courseCredits || 'N/A';
  } else {
    courseName.value = 'No Course Selected';
    instructorName.value = 'N/A';
    courseCode.value = 'N/A';
    courseCredits.value = 'N/A';
  }
}

const openModal = () => {
  showModal.value = true;
};
</script>
