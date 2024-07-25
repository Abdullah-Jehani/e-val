<template>
  <div
    class="px-3 md:p-0 grid gap-y-0 md:gap-y-5 lg:gap-y-6 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12 h-fit"
  >
    <div class="col-span-full my-4 lg:my-2 h-auto">
      <filters-component
        @update:department="updateDepartment"
        @update:search="updateSearch"
        :objects="students"
        :modalTitle="''"
      />
    </div>
    <div
      class="col-span-full my-4 md:my-0 h-fit rounded-md bg-offWhite p-1 border border-lightPurple"
    >
      <clickable-table
        :objects="filteredStudents"
        :border="true"
        class="p-3 bg-offWhite"
        @object-selected="handleStudentSelected"
      />
    </div>
    <div class="col-span-full lg:col-span-full w-full md:pb-16">
      <object-details
        :mainLabel="'Name'"
        :mainValue="studentName"
        :secondLabel="'Email'"
        :secondValue="studentEmail"
        :thirdLabel="'Student ID'"
        :thirdValue="studentId"
        :fourthLabel="'Semester'"
        :fourthValue="studentSemester"
        :cards="studentStatsCards"
        @card-selected="openModal"
      />
    </div>

    <Modal
      v-if="showModal"
      @close="showModal = false"
      :title="'Enrolled Courses'"
      :objects="courses"
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
const selectedStudent = ref(null);
const showModal = ref(false);

// Reactive variables for student details
const studentName = ref('No Student Selected');
const studentEmail = ref('N/A');
const studentId = ref('N/A');
const studentSemester = ref('N/A');
const studentDepartment = ref('N/A');
const enrolledCourses = ref(0);
const evaluated = ref(0);
const remaining = ref(0);

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

const studentStatsCards = computed(() => [
  {
    id: 1,
    title: 'Enrolled Courses',
    value: enrolledCourses.value,
  },
  {
    id: 2,
    title: 'Evaluated',
    value: evaluated.value,
  },
  {
    id: 3,
    title: 'Remaining',
    value: remaining.value,
  },
]);

// Computed property to filter students based on selected department and search query
const filteredStudents = computed(() => {
  return students.value.filter(
    (student) =>
      (!selectedDepartment.value ||
        student.department === selectedDepartment.value) &&
      (!searchQuery.value ||
        student.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        student.id.toString().includes(searchQuery.value))
  );
});

// Function to update the selected department
const updateDepartment = (department) => {
  selectedDepartment.value = department;
};

// Function to update the search query
const updateSearch = (query) => {
  searchQuery.value = query;
};

// Function to handle student selection
const handleStudentSelected = (student) => {
  selectedStudent.value = student;
  updateStudentInfo(student);
};

// Function to update student info based on selected student
function updateStudentInfo(student) {
  if (student) {
    studentName.value = student.name || 'No Student Selected';
    studentEmail.value = student.email || 'N/A';
    studentId.value = student.id || 'N/A';
    studentSemester.value = student.semester || 'N/A';
    studentDepartment.value = student.department || 'N/A';
    enrolledCourses.value = student.enrolledCourses || 0;
    evaluated.value = student.evaluated || 0;
    remaining.value = student.remaining || 0;
  } else {
    studentName.value = 'No Student Selected';
    studentEmail.value = 'N/A';
    studentId.value = 'N/A';
    studentSemester.value = 'N/A';
    studentDepartment.value = 'N/A';
    enrolledCourses.value = 0;
    evaluated.value = 0;
    remaining.value = 0;
  }
}

// Function to open the modal
const openModal = () => {
  showModal.value = true;
};
</script>
