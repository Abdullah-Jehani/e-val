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
import { ref, computed, onMounted } from "vue";
import FiltersComponent from "../../components/Admin/FiltersComponent.vue";
import ClickableTable from "../../components/Admin/ClickableTable.vue";
import ObjectDetails from "../../components/Admin/ObjectDetails.vue";
import Modal from "../../components/Admin/Modal.vue";
import axios from "axios";
import { useAuthStore } from "../../stores/AuthStore";

const authStore = useAuthStore();
const selectedDepartment = ref("");
const searchQuery = ref("");
const selectedCourse = ref(null);
const showModal = ref(false);

const courses = ref([]);
const courseName = ref("No Course Selected");
const instructorName = ref("N/A");
const courseCode = ref("N/A");
const courseCredits = ref("N/A");
const courseEnrolledStudents = ref("N/A");
const courseEvaluated = ref("N/A");
const courseRemaining = ref("N/A");

const fetchCourses = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/courses", {
      headers: {
        Authorization: `Bearer ${authStore.admin.token}`,
      },
    });
    courses.value = response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }
};
onMounted(fetchCourses);

const filteredCourses = computed(() => {
  return courses.value.filter(
    (course) =>
      (!selectedDepartment.value ||
        course.department_id === selectedDepartment.value) &&
      (!searchQuery.value ||
        course.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        course.course_code
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()))
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
    courseName.value = course.name || "No Course Selected";
    instructorName.value = course.instructor || "N/A";
    courseCode.value = course.course_code || "N/A";
    courseCredits.value = course.course_credits || "N/A";
    courseEnrolledStudents.value = course.enrolled_students || "N/A";
    courseEvaluated.value = course.evaluated_students || "N/A";
    courseRemaining.value =
      course.enrolled_students - course.evaluated_students || "N/A";
  } else {
    courseName.value = "No Course Selected";
    instructorName.value = "N/A";
    courseCode.value = "N/A";
    courseCredits.value = "N/A";
    courseEnrolledStudents.value = "N/A";
    courseEvaluated.value = "N/A";
    courseRemaining.value = "N/A";
  }
}

const openModal = () => {
  showModal.value = true;
};

const courseStatsCards = computed(() => [
  {
    id: 1,
    title: "Enrolled Students",
    value: courseEnrolledStudents.value,
  },
  {
    id: 2,
    title: "Evaluated",
    value: courseEvaluated.value,
  },
  {
    id: 3,
    title: "Remaining",
    value: courseRemaining.value,
  },
]);
</script>
