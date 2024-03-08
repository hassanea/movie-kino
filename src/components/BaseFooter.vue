<template>
  <footer
    class="flex flex-row flex-nowrap w-full h-full justify-center items-center bg-cyan-300 p-6"
  >
    <p class="text-center font-bold">{{ copyRight }}</p>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const copyRight = computed(() => {
  return `&copy;${new Date().getFullYear()} | All Rights Reserved&period`;
});
</script>
