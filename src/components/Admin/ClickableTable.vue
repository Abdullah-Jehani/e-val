<template>
  <div class="overflow-x-auto">
    <div
      class="w-full scrollbar-thumb-rounded-full scrollbar-thumb-mainPurple scrollbar-track-transparent scrollbar-thin overflow-y-auto overflow-x-clip h-64 lg:p-2 py-2 bg-offWhite font-medium"
    >
      <div
        v-if="objects.length === 0"
        class="w-full h-full flex justify-center py-4 italic text-mainPurple transform pt-24"
      >
        No data available
      </div>
      <table class="w-full table-auto text-left text-mainBlack">
        <tbody class="bg-offWhite truncate">
          <tr
            v-for="(object, index) in objects"
            :key="index"
            class="truncate w-full text-left transition-all duration-200 ease-in-out cursor-pointer"
            :class="{
              'border-b border-x-0 border-lightPurple': border,
              'bg-lightPurple bg-opacity-80 ': selected === index,
              'md:hover:bg-lightPurple md:hover:bg-opacity-30':
                selected !== index,
            }"
            @click="handleClick(index, object)"
          >
            <td class="p-3 text-left rounded-l-md">{{ object.id }}</td>
            <td class="w-full md:px-5 px-2 py-3 truncate rounded-r-md">
              {{ object.name }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  objects: {
    type: Array,
    required: true,
  },
  border: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['object-selected']);
const selected = ref(null);

const handleClick = (index, object) => {
  selected.value = index;
  emit('object-selected', object);
};
</script>

<style scoped>
/* Your styles here */
</style>
