<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  id: { type: Number, required: true },
  slug: { type: String, required: true },
  experienceSlug: { type: String, required: true },
});

const experience = ref(null);

const getImageUrl = (imageName) => {
  return `/images/${imageName}`;
};

const fetchExperienceData = async () => {
  try {
    const response = await fetch(
      `https://travel-dummy-api.netlify.app/${props.slug}.json`,
    );
    const data = await response.json();

    experience.value =
      data.experiences.find((e) => e.slug === props.experienceSlug) || null;
  } catch (error) {
    console.error("Помилка завантаження:", error);
  }
};

watch(() => props.experienceSlug, fetchExperienceData, { immediate: true });
</script>

<template>
  <div class="py-8 max-w-7xl mx-auto">
    <section
      v-if="experience"
      class="flex flex-col lg:flex-row gap-8 items-center lg:items-start animate-fade-in"
    >
      <div class="w-full md:w-1/2 lg:w-1/3 shrink-0">
        <img
          :src="getImageUrl(experience.image)"
          :alt="experience.name"
          class="w-full h-64 md:h-auto object-cover rounded-2xl shadow-lg border-4 border-white"
        />
      </div>
      <div class="flex-1">
        <h3 class="text-3xl font-bold text-sky-900 mb-4">
          {{ experience.name }}
        </h3>
        <p
          lass="text-lg text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 italic"
        >
          {{ experience.description }}
        </p>
      </div>
    </section>
    <div v-else class="flex items-center gap-3 text-slate-400 py-10">
      <div
        class="animate-spin h-5 w-5 border-2 border-teal-500 border-t-transparent rounded-full"
      ></div>
      <p>Завантаження даних...</p>
    </div>
  </div>
</template>
