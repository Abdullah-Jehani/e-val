<template>
  <div
    class="px-5 md:p-0 grid gap-y-6 md:gap-y-12 gap-x-4 md:gap-x-5 grid-cols-4 lg:grid-cols-12"
  >
    <div
      class="col-span-2 lg:col-span-3"
      v-for="card in [1, 2, 3, 4]"
      :key="card.id"
    >
      <stats-card
        title="Total Students"
        :value="100"
        :class="
          card % 2 == 0
            ? 'bg-brightGreen border border-darkGreen'
            : 'bg-offWhite border border-lightPurple'
        "
      />
    </div>

    <div class="col-span-full">
      <course-table />
    </div>

    <div class="mt-4 lg:mt-0 md:col-span-3 col-span-full">
      <router-link
        to="/evaluation"
        class="bg-mainPurple hover:bg-darkPurple text-white font-bold lg:py-5 py-4 rounded focus:outline-none focus:shadow-outline transition-all duration-150 ease-in-out text-2xl w-full h-full block text-center"
      >
        Start Evaluation
      </router-link>
    </div>
  </div>
</template>

<script setup>
import StatsCard from '../../components/StatsCard.vue';
import CourseTable from '../../components/CourseTable.vue';
import router from '../../routes';
</script>
