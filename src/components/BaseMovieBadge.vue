<template>
  <span
    class="movie-badge inline-block w-auto h-11 rounded-2xl m-3 p-2 cursor-pointer"
  >
    {{ genre }}
  </span>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  genre: {
    type: String,
    required: true,
  },
});

const { genre } = toRefs(props);
</script>

<style lang="scss" scoped>
.movie-badge {
  background: #0000af;
  color: #f8f8f8;
  font: italic 1.125rem / 1.5 sans-serif;
}
</style>
