<template>
  <StarIcon
    class="absolute right-6 top-6 inline-block h-11 w-11 translate-y-1"
    :class="starRatingClasses"
  />
  <span
    class="absolute translate-x-1 translate-y-1 text-center text-2xl font-extrabold leading-normal text-gray-600"
    :class="ratingOutputClasses"
  >
    {{ ratingOutput }}
  </span>
</template>

<script setup>
import { computed, toRefs } from 'vue';
import { StarIcon } from '@heroicons/vue/24/solid';

const props = defineProps({
  rating: {
    type: [Number, null],
    required: false,
    default: null,
  },
  variant: {
    type: String,
    required: false,
    default: 'listing',
  },
});

const { rating, variant } = toRefs(props);

const ratingOutput = computed(() => {
  return rating.value ? rating.value : '-';
});

const ratingOutputClasses = computed(() => {
  return [
    { 'text-light': !rating.value },
    { 'right-[2.5rem] top-[1.875rem]': variant.value === 'listing' },
    {
      'right-[3rem] top-[1.875rem] lg:right-[2.75rem] xl:right-[2.75rem] 2xl:right-[5.25rem]':
        variant.value === 'movie',
    },
  ];
});

const starRatingClasses = computed(() => {
  return [
    { 'text-yellow-400': rating.value },
    { 'text-blue-950': !rating.value },
    { 'translate-x-1': variant.value === 'listing' },
    {
      '-translate-x-1 lg:translate-x-0 xl:-translate-x-0 2xl:-translate-x-10':
        variant.value === 'movie',
    },
  ];
});
</script>
