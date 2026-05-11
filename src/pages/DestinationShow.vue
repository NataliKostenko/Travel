<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  experienceSlug: { type: String, required: false },
});

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

const destination = ref(null);
const experienceSection = ref(null);

const initData = async () => {
  try {
    const response = await fetch(
      `https://travel-dummy-api.netlify.app/${props.slug}.json`,
    );

    if (!response.ok) throw new Error("Країна не знайдена");

    const data = await response.json();
    destination.value = data;
  } catch (error) {
    console.error("Помилка завантаження:", error);
    destination.value = null;
  }
};

watch(() => props.slug, initData, { immediate: true });

watch(
  () => props.experienceSlug,
  async (newVal) => {
    if (newVal) {
      await nextTick();
      setTimeout(() => {
        if (experienceSection.value) {
          experienceSection.value.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="destination-page container max-w-7xl mx-auto px-4 py-8">
    <div v-if="destination" class="space-y-12">
      <section class="flex flex-col gap-8 items-center lg:items-start">
        <h1 class="text-4xl md:text-5xl font-bold text-sky-950 mb-8">
          {{ destination.name }}
        </h1>
        <div
          class="flex flex-col lg:flex-row gap-8 items-center lg:items-start"
        >
          <img
            :src="getImageUrl(destination.image)"
            :alt="destination.name"
            class="w-full md:max-w-md rounded-3xl shadow-xl object-cover aspect-video md:aspect-auto"
          />
          <p class="text-lg leading-relaxed text-slate-700 max-w-2xl">
            {{ destination.description }}
          </p>
        </div>
      </section>
      <section>
        <h2 class="text-3xl font-bold text-sky-900 mb-6">
          Top Experiences in {{ destination.name }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <router-link
            v-for="experience in destination.experiences"
            :key="experience.slug"
            :to="{
              name: 'experience.show',
              params: {
                id: props.id,
                slug: props.slug,
                experienceSlug: experience.slug,
              },
            }"
            class="group flex flex-col gap-3"
          >
            <div class="overflow-hidden rounded-2xl shadow-md">
              <img
                :src="getImageUrl(experience.image)"
                :alt="experience.name"
                class="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span
              class="font-semibold text-sky-950 group-hover:text-teal-600 transition-colors"
              >{{ experience.name }}</span
            >
          </router-link>
        </div>
        <hr
          ref="experienceSection"
          class="border-slate-200 mb-10 scroll-mt-24"
        />
        <router-view v-slot="{ Component, route }">
          <component :is="Component" :key="route.path" />
        </router-view>
      </section>
    </div>
    <div v-else class="flex justify-center items-center py-20">
      <p class="text-xl animate-pulse text-slate-500">
        Завантаження даних для {{ slug }}...
      </p>
    </div>
  </div>
</template>
