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
    <div class="col-span-full lg:col-span-full w-full md:pb-16">
      <object-details
        :mainLabel="'Course'"
        :mainValue="courseName"
        :secondLabel="'Instructor'"
        :secondValue="instructorName"
        :thirdLabel="' Code'"
        :thirdValue="courseCode"
        :fourthLabel="'Credits'"
        :fourthValue="courseCredits"
        :cards="courseStatsCards"
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

// Reactive variable for selected department and search query
const selectedDepartment = ref('');
const searchQuery = ref('');

// Reactive variable for the selected student and modal visibility
const selectedCourse = ref(null);
const showModal = ref(false);

// Reactive variables for course details
const courseName = ref('No Course Selected');
const instructorName = ref('N/A');
const courseCode = ref('N/A');
const courseCredits = ref('N/A');
const courseEnrolledStudents = ref('N/A');
const courseEvaluated = ref('N/A');
const courseRemaining = ref('N/A');

const courses = ref([
  {
    id: '12325',
    department: 'Department 1',
    name: 'Introduction to Programming',
    instructor: 'Al-Khwarizmi',
    courseCode: 'CS101',
    courseCredits: '3',
    enrolledStudents: 40,
    evaluated: 30,
  },
  {
    id: '61890',
    department: 'Department 2',
    name: 'Data Structures and Algorithms',
    instructor: 'Ibn al-Haytham',
    courseCode: 'CS202',
    courseCredits: '4',
    enrolledStudents: 35,
    evaluated: 28,
  },
  {
    id: '12341',
    department: 'Department 3',
    name: 'Web Development',
    instructor: 'Al-Farabi',
    courseCode: 'CS303',
    courseCredits: '3',
    enrolledStudents: 45,
    evaluated: 40,
  },
  {
    id: '67090',
    department: 'Department 2',
    name: 'Database Management',
    instructor: 'Ibn Sina',
    courseCode: 'CS404',
    courseCredits: '4',
    enrolledStudents: 50,
    evaluated: 45,
  },
  {
    id: '19345',
    department: 'Department 1',
    name: 'Software Engineering',
    instructor: 'Al-Biruni',
    courseCode: 'CS505',
    courseCredits: '3',
    enrolledStudents: 30,
    evaluated: 25,
  },
  {
    id: '60090',
    department: 'Department 3',
    name: 'Artificial Intelligence',
    instructor: 'Jabir ibn Hayyan',
    courseCode: 'CS606',
    courseCredits: '4',
    enrolledStudents: 55,
    evaluated: 50,
  },
  {
    id: '00345',
    department: 'Department 2',
    name: 'Operating Systems',
    instructor: 'Ibn Rushd',
    courseCode: 'CS707',
    courseCredits: '3',
    enrolledStudents: 38,
    evaluated: 32,
  },
]);

const students = ref([
  {
    id: 20134,
    name: 'Omar Al-Farouq',
    email: 'omar.alfarouq@university.edu',
    semester: 3,
    department: 'Department 1',
    enrolledCourses: 5,
    evaluated: 3,
    remaining: 2,
    role: 'student',
  },
  {
    id: 20135,
    name: 'Layla Al-Hassan',
    email: 'layla.alhassan@university.edu',
    semester: 2,
    department: 'Department 2',
    enrolledCourses: 7,
    evaluated: 5,
    remaining: 2,
    role: 'student',
  },
  {
    id: 20136,
    name: 'Khalid Al-Sabah',
    email: 'khalid.alsabah@university.edu',
    semester: 4,
    department: 'Department 3',
    enrolledCourses: 6,
    evaluated: 3,
    remaining: 3,
    role: 'student',
  },
  {
    id: 20137,
    name: 'Aisha Al-Mansoori',
    email: 'aisha.almansoori@university.edu',
    semester: 1,
    department: 'Department 1',
    enrolledCourses: 7,
    evaluated: 7,
    remaining: 0,
    role: 'student',
  },
  {
    id: 20138,
    name: 'Faisal Al-Nasser',
    email: 'faisal.elnasser@university.edu',
    semester: 3,
    department: 'Department 2',
    enrolledCourses: 5,
    evaluated: 3,
    remaining: 2,
    role: 'student',
  },
  {
    id: 20139,
    name: 'Hassan Al-Shehri',
    email: 'hassan.alshehri@university.edu',
    semester: 2,
    department: 'Department 3',
    enrolledCourses: 7,
    evaluated: 1,
    remaining: 6,
    role: 'student',
  },
  {
    id: 20140,
    name: 'Sara Al-Mansoori',
    email: 'sara.almansoori@university.edu',
    semester: 4,
    department: 'Department 1',
    enrolledCourses: 4,
    evaluated: 3,
    remaining: 1,
    role: 'student',
  },
  {
    id: 20141,
    name: 'Farah Ben Abdallah',
    email: 'farah.benabdallah@university.edu',
    semester: 4,
    department: 'Department 1',
    enrolledCourses: 6,
    evaluated: 3,
    remaining: 3,
    role: 'student',
  },
  {
    id: 20142,
    name: 'Khalid Bilal',
    email: 'khalid.bilal@university.edu',
    semester: 4,
    department: 'Department 1',
    enrolledCourses: 6,
    evaluated: 2,
    remaining: 4,
    role: 'student',
  },
  {
    id: 20143,
    name: 'Sami Khalil',
    email: 'sami.khalil@university.edu',
    semester: 4,
    department: 'Department 1',
    enrolledCourses: 7,
    evaluated: 3,
    remaining: 4,
    role: 'student',
  },
]);

const courseStatsCards = computed(() => [
  {
    id: 1,
    title: 'Enrolled Students',
    value: courseEnrolledStudents.value,
  },
  {
    id: 2,
    title: 'Evaluated',
    value: courseEvaluated.value,
  },
  {
    id: 3,
    title: 'Remaining',
    value: courseRemaining.value,
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
    courseEnrolledStudents.value = course.enrolledStudents || 'N/A';
    courseEvaluated.value = course.evaluated || 'N/A';
    courseRemaining.value = course.enrolledStudents - course.evaluated || 'N/A';
  } else {
    courseName.value = 'No Course Selected';
    instructorName.value = 'N/A';
    courseCode.value = 'N/A';
    courseCredits.value = 'N/A';
    courseEnrolledStudents.value = 'N/A';
    courseEvaluated.value = 'N/A';
    courseRemaining.value = 'N/A';
  }
}

const openModal = () => {
  showModal.value = true;
};

const cards = computed(() => {
  const enrolled = selectedCourse.value.enrolledStudents || 0;
  const evaluated = selectedCourse.value.evaluated || 0;
  const remaining = selectedCourse.value.remaining || 0;

  return [
    {
      id: 1,
      title: 'Enrolled Students',
      value: enrolled,
    },
    {
      id: 2,
      title: 'Evaluated',
      value: evaluated,
    },
    {
      id: 3,
      title: 'Remaining',
      value: remaining,
    },
  ];
});
</script>
