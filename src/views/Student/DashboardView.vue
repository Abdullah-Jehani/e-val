<template>
  <div class="px-5 py-2 md:p-0 grid gap-5 grid-cols-4 lg:grid-cols-12">
    <div
      class="col-span-2 lg:col-span-3"
      v-for="card in [1, 2, 3, 4]"
      :key="card.id"
    >
      <stats-card
        title="Total Students"
        :value="100"
        class="bg-offWhite border border-lightPurple"
      />
    </div>

    <div class="col-span-full">
      <course-table />
    </div>
  </div>
</template>

<script setup>
import StatsCard from '../../components/StatsCard.vue';
import CourseTable from '../../components/CourseTable.vue';
</script>
