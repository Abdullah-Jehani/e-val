<template>
  <div class="w-full grid lg:grid-cols-12 h-full">
    <stats-card
      title="Total Students"
      :value="100"
      class="lg:col-span-4 bg-brightGreen"
    />
  </div>
</template>

<script setup>
import StatsCard from '../../components/StatsCard.vue';
</script>
