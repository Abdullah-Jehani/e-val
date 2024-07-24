<template>
  <div
    class="w-full flex lg:flex-row flex-col justify-between lg:items-center items-start my-4 lg:my-8 gap-4 border-b pb-4 border-lightPurple"
  >
    <div class="w-2/3 flex justify-start items-center gap-2">
      <label for="" class="text-xl font-normal text-darkGray">Course:</label>
      <p class="text-xl font-semibold text-mainBlack">{{ courseName }}</p>
    </div>

    <div class="w-1/3 flex justify-start items-center gap-2">
      <label for="" class="text-xl font-normal text-darkGray"
        >Instructor:</label
      >
      <p class="text-xl font-semibold text-mainBlack truncate">
        {{ instructorName }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  courseName: String,
  instructorName: String,
});
</script>
