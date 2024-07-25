<template>
  <div class="overflow-x-auto rounded-md border border-lightPurple">
    <div
      class="flex flex-col justify-between items-center p-4 pb-0 bg-mainWhite"
    >
      <div class="w-full flex justify-between items-center p-2 pb-4">
        <h1 class="text-2xl font-bold text-mainBlack">{{ cardTitle }}</h1>
        <div class="text-darkPurple font-semibold">
          <p class="hidden md:block">{{ tagName }}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 md:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </div>
      </div>
      <div id="divider" class="w-full h-px bg-lightPurple"></div>
    </div>
    <div
      class="w-full overflow-y-auto overflow-x-clip min-h-24 md:p-2 py-2 bg-mainWhite font-medium"
    >
      <div
        v-if="objects.length === 0"
        class="w-full h-full flex justify-center items-center py-4 italic text-mainPurple"
      >
        No requests available
      </div>
      <table class="table-auto text-left text-mainBlack">
        <tbody class="bg-mainWhite truncate">
          <tr v-for="(object, index) in objects" :key="index" class="truncate">
            <td class="px-5 py-3 text-left md:table-cell">{{ object.id }}</td>
            <td class="w-full md:px-5 px-2 py-3 truncate">{{ object.name }}</td>
            <td class="md:table-cell md:px-5 px-2 py-3 truncate">
              <div class="flex gap-2">
                <span
                  @click="acceptItem(index)"
                  class="md:px-3 md:py-1 p-1 rounded-sm bg-darkGreen text-white hover:filter hover:brightness-90 cursor-pointer transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    class="w-4 h-4 md:w-5 md:h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
                <span
                  @click="rejectItem(index)"
                  class="md:px-3 md:py-1 p-1 rounded-sm bg-mainRed text-white hover:filter hover:brightness-90 cursor-pointer transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="3"
                    stroke="currentColor"
                    class="w-4 h-4 md:w-6 md:h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const props = defineProps({
  objects: {
    type: Array,
    required: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  tagName: {
    type: String,
    required: true,
  },
});

const acceptItem = (index) => {
  toast.success(`Accepted student with id ${props.objects[index].id}`);
  props.objects.splice(index, 1);
};

const rejectItem = (index) => {
  toast.error(`Rejected student with id ${props.objects[index].id}`);
  props.objects.splice(index, 1);
};
</script>
