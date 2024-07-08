<template>
  <fieldset class="mx-auto mb-4 mt-7 block h-auto w-full">
    <legend
      class="text-center font-medium"
      :class="{ 'inline-block': show, 'sr-only': !show }"
    >
      Select Movie Rating: <span>{{ currentRating }}</span>
    </legend>
    <div class="flex h-auto w-full items-center justify-center">
      <input
        type="radio"
        v-for="rating in ratingRanges"
        :value="rating"
        :key="rating"
        :aria-label="`${rating > 1 ? rating : 1} star${rating > 1 ? 's' : ''}`"
        @input.lazy="handleRatingSelection(rating)"
        @mouseenter="handleRatingSelection(rating)"
        @click="handleRatingSelection(rating)"
        @dblclick="resetRatingSelection"
        :disabled="modelValue.includes(rating) && isDisabled"
        class="star-rating-radio inline-block h-12 w-12 cursor-pointer appearance-none border-none bg-transparent text-2xl before:mr-1 before:inline-block before:h-6 before:w-6 before:text-center before:align-middle focus:border-2 focus:border-dotted focus:border-blue-1000"
        :class="{
          'checked opacity-95': modelValue.includes(rating),
          unchecked: !modelValue.includes(rating),
          'cursor-not-allowed opacity-80':
            modelValue.includes(rating) && isDisabled,
        }"
      />
    </div>
  </fieldset>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { generateRange } from '../utils/index.js';

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
  modelValue: {
    type: [Array, Number],
    required: false,
    default: [],
  },
});

const emit = defineEmits(['update:modelValue', 'resetRating']);

const ratingRanges = [1, 2, 3, 4, 5];

const selectedRating = ref([]);

const isDisabled = ref(false);

const handleRatingSelection = rating => {
  isDisabled.value = false;
  // Generate an array with a range from 1 to the current rating.
  const range = generateRange(1, rating, 1);
  selectedRating.value = range;
  emit('update:modelValue', selectedRating.value);
  if (selectedRating.value.includes(rating)) {
    isDisabled.value = true;
  } else {
    isDisabled.value = false;
  }
};

const resetRatingSelection = () => {
  selectedRating.value = [];
  emit('resetRating', selectedRating.value);
};

const currentRating = computed(() => {
  if (selectedRating.value) {
    return [...selectedRating.value].pop();
  } else {
    return;
  }
});

watch(currentRating, (oldValue, value) => {
  if (oldValue === value) {
    isDisabled.value = true;
  } else {
    isDisabled.value = false;
  }
});
</script>

<style lang="scss" scoped>
.star-rating-radio {
  &::before {
    content: url('./assets/star.svg');
    zoom: 125%;
  }
  &.unchecked {
    filter: brightness(0) saturate(100%) invert(32%) sepia(9%) saturate(915%)
      hue-rotate(176deg) brightness(94%) contrast(87%);
  }
  &.checked {
    filter: brightness(0) saturate(100%) invert(92%) sepia(12%) saturate(6647%)
      hue-rotate(347deg) brightness(103%) contrast(96%);
  }
}
</style>
