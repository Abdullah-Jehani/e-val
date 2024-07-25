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
        :cards="cards"
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
    role: 'student',
  },
  {
    id: 20135,
    name: 'Layla Al-Hassan',
    email: 'layla.alhassan@university.edu',
    semester: 2,
    department: 'Department 2',
    role: 'student',
  },
  {
    id: 20136,
    name: 'Khalid Al-Sabah',
    email: 'khalid.alsabah@university.edu',
    semester: 4,
    department: 'Department 3',
    role: 'student',
  },
  {
    id: 20137,
    name: 'Aisha Al-Mansoori',
    email: 'aisha.almansoori@university.edu',
    semester: 1,
    department: 'Department 1',
    role: 'student',
  },
  {
    id: 20138,
    name: 'Faisal Al-Nasser',
    email: 'faisal.elnasser@university.edu',
    semester: 3,
    department: 'Department 2',
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
  } else {
    studentName.value = 'No Student Selected';
    studentEmail.value = 'N/A';
    studentId.value = 'N/A';
    studentSemester.value = 'N/A';
    studentDepartment.value = 'N/A';
  }
}

// Function to open the modal
const openModal = () => {
  showModal.value = true;
};
</script>
