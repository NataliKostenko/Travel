<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const destinations = [
  { id: 1, name: "Brazil", slug: "brazil" },
  { id: 2, name: "Hawaii", slug: "hawaii" },
  { id: 3, name: "Panama", slug: "panama" },
  { id: 4, name: "Jamaica", slug: "jamaica" },
];
</script>

<template>
  <nav class="bg-teal-800 shadow-md w-full relative z-50">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-20">
        <RouterLink
          to="/"
          class="text-white font-bold text-xl hover:text-amber-300 tracking-wider flex flex-row items-center"
          ><img
            src="/images/logo.png"
            alt="Travel App"
            class="h-10 w-10 mr-2"
          />
          TRAVEL APP
        </RouterLink>
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-white focus:outline-none p-2"
        >
          <svg
            class="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="hidden md:flex space-x-8 items-center">
          <RouterLink
            to="/"
            class="text-white hover:text-amber-300 transition-colors"
            active-class="border-b-2 border-amber-300"
          >
            Home
          </RouterLink>
          <RouterLink
            v-for="destination in destinations"
            :key="destination.id"
            :to="{
              name: 'destination.show',
              params: {
                id: destination.id,
                slug: destination.slug,
              },
            }"
            class="text-white hover:text-amber-300 transition-colors"
            active-class="border-b-2 border-amber-300 font-bold"
          >
            {{ destination.name }}
          </RouterLink>
        </div>
      </div>
    </div>
    <div
      v-if="isMenuOpen"
      class="md:hidden bg-teal-600 border-t border-teal-400"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <RouterLink
          to="/"
          @click="isMenuOpen = false"
          class="block px-3 py-2 text-white hover:bg-teal-700 rounded-md"
          active-class="bg-teal-800"
        >
          Home
        </RouterLink>
        <RouterLink
          v-for="destination in destinations"
          :key="destination.id"
          @click="isMenuOpen = false"
          :to="{
            name: 'destination.show',
            params: { id: destination.id, slug: destination.slug },
          }"
          class="block px-3 py-2 text-white hover:bg-teal-700 rounded-md"
          active-class="bg-teal-800 font-bold"
        >
          {{ destination.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
