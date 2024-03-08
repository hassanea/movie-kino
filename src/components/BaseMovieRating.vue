<template>
  <div>
    <p class="rating">
      Rating: {{ film }}
      <span class="ml-1 mr-1 border-solid border-r-black"></span>
    </p>
    <p class="rating">
      Your Rating: {{ userRatingOutput }}
      <base-movie-star-rating
        v-model="selectedStarRating"
      ></base-movie-star-rating>
    </p>
  </div>
</template>

<script setup>
import { toRefs, ref, computed } from "vue";
import BaseMovieStarRating from "./BaseMovieStarRating.vue";
import { generateRange } from "../utils/index";
const props = defineProps({
  rating: {
    type: [Number, String],
    required: true,
    validator(value) {
      return Number.isInteger(value) || value === "NR";
    },
  },
  film: {
    type: String,
    required: true,
    validator(value) {
      return ["NR", "NC-17", "R", "PG-13", "PG", "G"].includes(value);
    },
  },
});

const { rating, film } = toRefs(props);

const ratingRange = computed(() => {
  const ratingRangeFill = generateRange(1, rating.value, 1);
  return ratingRangeFill;
});

const selectedStarRating = ref(ratingRange.value);

const userRatingOutput = computed(() => {
  return `(${selectedStarRating.value.length}/5)`;
});
</script>

<style scoped>
.rating {
  font:
    normal italic bold 1.25rem / 1.5 "Lora",
    serif;
}
</style>
