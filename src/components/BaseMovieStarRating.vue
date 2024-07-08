<template>
  <button
    type="button"
    class="inline-block w-auto h-12 cursor-pointer border-none bg-transparent"
    @click="handleRatingSelection(1)"
    @mouseenter="handleRatingSelection(1)"
    :disabled="modelValue.includes(1) && isDisabled"
  >
    <StarIcon
      class="w-6 h-6 mr-1 inline-block align-middle text-gray-600"
      :class="{
        'text-yellow-400 opacity-95': modelValue.includes(1),
        'cursor-not-allowed opacity-80': modelValue.includes(1) && isDisabled,
      }"
    />
  </button>

  <button
    type="button"
    class="inline-block w-auto h-12 cursor-pointer border-none bg-transparent"
    @click="handleRatingSelection(1, 2)"
    @mouseenter="handleRatingSelection(1, 2)"
    :disabled="modelValue.includes(2) && isDisabled"
  >
    <StarIcon
      class="w-6 h-6 mr-1 inline-block align-middle text-gray-600"
      :class="{
        'text-yellow-400 opacity-95': modelValue.includes(2),
        'cursor-not-allowed opacity-80': modelValue.includes(2) && isDisabled,
      }"
    />
  </button>

  <button
    type="button"
    class="inline-block w-auto h-12 cursor-pointer border-none bg-transparent"
    @click="handleRatingSelection(1, 2, 3)"
    @mouseenter="handleRatingSelection(1, 2, 3)"
    :disabled="modelValue.includes(3) && isDisabled"
  >
    <StarIcon
      class="w-6 h-6 mr-1 inline-block align-middle text-gray-600"
      :class="{
        'text-yellow-400 opacity-95': modelValue.includes(3),
        'cursor-not-allowed opacity-80': modelValue.includes(3) && isDisabled,
      }"
    />
  </button>

  <button
    type="button"
    class="inline-block w-auto h-12 cursor-pointer border-none bg-transparent"
    @click="handleRatingSelection(1, 2, 3, 4)"
    @mouseenter="handleRatingSelection(1, 2, 3, 4)"
    :disabled="modelValue.includes(4) && isDisabled"
  >
    <StarIcon
      class="w-6 h-6 mr-1 inline-block align-middle text-gray-600"
      :class="{
        'text-yellow-400 opacity-95': modelValue.includes(4),
        'cursor-not-allowed opacity-80': modelValue.includes(4) && isDisabled,
      }"
    />
  </button>

  <button
    type="button"
    class="inline-block w-auto h-12 cursor-pointer border-none bg-transparent"
    @click="handleRatingSelection(1, 2, 3, 4, 5)"
    @mouseenter="handleRatingSelection(1, 2, 3, 4, 5)"
    :disabled="modelValue.includes(5) && isDisabled"
  >
    <StarIcon
      class="w-6 h-6 mr-1 inline-block align-middle text-gray-600"
      :class="{
        'text-yellow-400 opacity-95': modelValue.includes(5),
        'cursor-not-allowed opacity-80': modelValue.includes(5) && isDisabled,
      }"
    />
  </button>
</template>

<script setup>
import { ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
    default: [1, 2, 3, 4, 5],
  },
});

const emit = defineEmits(["update:modelValue"]);

const selectedRating = ref(props.modelValue);
const isDisabled = ref(false);
// Rest parameters - is an operator that allows us to any abitrary number of arguments and condense them into an array of arguments.
const handleRatingSelection = (...items) => {
  if (selectedRating.value.length) {
    selectedRating.value.splice(0, selectedRating.value.length);
    emit("update:modelValue", selectedRating.value);
    isDisabled.value = false;
  } else {
    items.forEach((item) => {
      selectedRating.value.push(item);
    });
    emit("update:modelValue", selectedRating.value);
    isDisabled.value = true;
  }
};
</script>
