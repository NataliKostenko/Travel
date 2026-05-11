<script setup>
const destinations = [
  { id: 1, name: "Brazil", slug: "brazil", image: "brazil.jpg" },
  { id: 2, name: "Hawaii", slug: "hawaii", image: "hawaii.jpg" },
  { id: 3, name: "Panama", slug: "panama", image: "panama.jpg" },
  { id: 4, name: "Jamaica", slug: "jamaica", image: "jamaica.jpg" },
];

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};
</script>

<template>
  <div class="container max-w-7xl mx-auto sm:px-4 py-10">
    <h1
      class="text-center font-bold text-3xl md:text-5xl text-sky-950 mb-12 px-4"
    >
      All Destinations
    </h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 sm:gap-8"
    >
      <RouterLink
        v-for="destination in destinations"
        :key="destination.id"
        :to="{
          name: 'destination.show',
          params: { id: destination.id, slug: destination.slug },
        }"
        class="group flex flex-col"
      >
        <h2
          class="text-2xl font-semibold mb-3 text-sky-900 group-hover:text-teal-600 transition-colors px-4 sm:px-0"
        >
          {{ destination.name }}
        </h2>
        <div class="overflow-hidden rounded-xl shadow-lg">
          <img
            :src="getImageUrl(destination.image)"
            :alt="destination.name"
            class="w-full aspect-[4/3] sm:aspect-[4/5] object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </RouterLink>
    </div>
  </div>
</template>
