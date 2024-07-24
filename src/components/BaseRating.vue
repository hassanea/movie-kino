<template>
  <div
    class="mx-auto mb-3 mt-3 flex h-auto w-full items-center justify-center md:mb-4 md:mt-7"
  >
    <button
      type="button"
      class="mr-1 inline-block h-12 w-12 cursor-pointer border-none bg-transparent text-2xl last:mr-0 focus:rounded-3xl focus:border-4 focus:border-solid focus:border-blue-1000 focus:outline-none"
      v-for="rating in ratingRange"
      :key="rating"
      @click="handleRatingSelection(rating)"
      @keydown="handleRatingSelection(rating)"
      @mouseenter="handleRatingSelection(rating)"
      @mouseover="handleRatingSelection(rating)"
      @focus="handleRatingSelection(rating)"
      :aria-label="`${rating > 1 ? rating : 1} ${rating > 1 ? 'stars' : 'star'}`"
      :disabled="rating === modelValue"
    >
      <StarIcon
        :class="{
          'text-yellow-400': rating <= modelValue,
          'cursor-not-allowed opacity-80': rating === modelValue,
        }"
        class="inline-block h-8 w-8 align-middle text-gray-600"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
    required: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const ratingRange = [1, 2, 3, 4, 5];

const selectedRating = ref(props.modelValue);

const handleRatingSelection = someRating => {
  selectedRating.value = someRating;
};

watch(selectedRating, newRating => {
  emit('update:modelValue', newRating);
});
</script>
