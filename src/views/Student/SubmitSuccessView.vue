<template>
  <aside
    class="fixed top-0 left-0 z-40 w-56 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-mainPurple md:translate-x-0"
    aria-label="Sidenav"
    id="drawer-navigation"
  >
    <div class="overflow-y-auto py-5 px-3 h-full bg-white flex flex-col">
      <ul class="pt-5 flex flex-col gap-1 flex-grow">
        <li>
          <router-link
            to="/dashboard"
            class="flex items-center w-full p-3 px-6 text-base font-medium text-darkGray transition duration-75 hover:bg-mainWhite rounded-md group"
          >
            <svg
              aria-hidden="true"
              class="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:text-mainBlack"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0"
              ></path>
            </svg>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup></script>

<style></style>
