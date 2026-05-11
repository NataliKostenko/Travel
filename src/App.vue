<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <div
    class="min-h-screen p-4 flex flex-col justify-start bg-indigo-50 bg-[url(/images/travel.svg),_url(/images/travel.svg)] bg-[position:0_0,_40px_40px] bg-[size:80px_80px] bg-repeat"
  >
    <RouterView v-slot="{ Component, route }">
      <Transition name="slide" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
