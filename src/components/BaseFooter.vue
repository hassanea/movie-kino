<template>
  <footer
    class="flex h-auto w-full flex-row flex-nowrap items-center justify-center bg-cyan-300 p-3 md:p-4"
  >
    <p
      class="my-2 text-center font-sans text-base font-bold md:my-3 md:text-lg lg:text-xl"
    >
      {{ copyRight }}
    </p>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const copyRight = computed(() => {
  return `© ${new Date().getFullYear()} ${import.meta.env.VITE_APP_TITLE}, Inc. | All Rights Reserved.`;
});
</script>
