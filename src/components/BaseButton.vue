<template>
  <button :type :class="buttonClasses" :aria-label="label">
    <slot></slot>
  </button>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'button',
    validator(value) {
      return ['button', 'submit', 'reset'].includes(value);
    },
  },
  variant: {
    type: String,
    required: false,
    default: 'btn',
  },
  label: {
    type: String,
    required: true,
  },
});

const { type, variant, label } = toRefs(props);

const buttonClasses = computed(() => {
  return {
    btn: variant.value === 'btn',
    'icon-btn': variant.value === 'icon',
    'circular-btn': variant.value === 'circular',
    'pill-btn': variant.value === 'pill',
    'close-btn': variant.value === 'close',
  };
});
</script>

<style>
.btn {
  @apply mx-auto my-3 inline-block h-auto w-4/5 cursor-pointer rounded-full bg-slate-600 px-2 py-3 text-center font-sans text-lg font-bold text-light transition-colors duration-200 ease-in hover:bg-light hover:text-slate-600 focus:bg-light focus:text-slate-600 focus:outline-none active:border-2 active:border-solid active:border-blue-1000;
}
</style>

<style scoped>
.icon-btn {
  @apply mx-[0.625rem] inline-block h-12 w-12 rounded-md transition-colors duration-75 ease-in-out hover:rounded-3xl hover:bg-gray-600/75 focus:rounded-3xl focus:bg-gray-600/75 focus:outline-none active:border-4 active:border-solid active:border-blue-1000 md:mx-3;
}

.circular-btn {
  @apply inline-block h-14 w-14 rounded-full bg-slate-600 p-3 font-bold text-light hover:bg-light hover:text-slate-600 focus:bg-light focus:text-slate-600 focus:outline-none active:border-2 active:border-solid active:border-blue-1000;
}

.pill-btn {
  @apply inline-block rounded-full bg-slate-600 p-4 font-bold text-light hover:bg-light hover:text-slate-600 focus:bg-light focus:text-slate-600 focus:outline-none active:border-2 active:border-solid active:border-blue-1000;
}

.close-btn {
  @apply absolute right-0 top-1 inline-block h-12 w-12 cursor-pointer border-none bg-transparent text-2xl font-bold focus:rounded-full focus:border-2 focus:border-solid focus:border-indigo-800 focus:outline-none;
}
</style>
