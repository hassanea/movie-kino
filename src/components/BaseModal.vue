<template>
  <div
    v-if="show"
    class="fixed bottom-0 left-0 right-0 top-0 z-40 h-full w-full bg-blue-1000/30"
    @click.self="handleClose"
    @keydown.esc="handleClose"
  >
    <div
      :role="type"
      :aria-modal="isActiveModalState"
      :aria-labelledby="a11yTitle"
      :aria-describedby="a11yDesc"
      :tabindex="setModalTabIndex"
      ref="trapRef"
      class="fixed left-[12%] top-[0%] z-50 h-auto min-w-[50%] max-w-[80%] rounded-xl bg-slate-200 p-8 md:left-[20%] md:top-[18%] lg:left-[25%] lg:top-[0] 2xl:top-[12%]"
    >
      <base-button
        variant="close"
        label="Close"
        ref="closeBtn"
        @click="handleClose"
      >
        <XMarkIcon
          class="inline-block h-6 w-6 align-middle font-bold text-dark hover:stroke-pink-700 hover:stroke-[4px] active:stroke-pink-500 active:stroke-[4px]"
        />
      </base-button>

      <div v-if="title">
        <h2
          class="my-4 line-clamp-3 text-center font-sans text-[1.625rem] font-medium leading-normal md:text-3xl"
          ref="mainTitle"
          :id="titleId"
        >
          {{ title }}
        </h2>
        <div class="mx-auto mb-4 mt-0 block h-1 w-12 bg-dark text-center"></div>
        <p class="sr-only" v-if="describe" ref="mainDesc" :id="descId">
          {{ describe }}
        </p>
      </div>
      <div
        class="flex h-full w-full flex-col flex-nowrap items-center justify-center"
      >
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, computed, onMounted } from 'vue';
import useFocusTrap from '../composables/useFocusTrap.js';
import { v4 as uuidv4 } from 'uuid';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import BaseButton from './BaseButton.vue';

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'dialog',
    validator(value) {
      return ['dialog', 'alertdialog'].includes(value);
    },
  },
  title: {
    type: String,
    required: false,
    default: null,
  },
  describe: {
    type: String,
    required: false,
    default: null,
  },
  show: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const titleId = uuidv4();
const descId = uuidv4();

const { type, title, describe, show } = toRefs(props);

const emit = defineEmits(['closeModal']);

const { trapRef } = useFocusTrap();

const closeBtn = ref(null);

onMounted(() => {
  closeBtn?.value?.focus();
});

const a11yTitle = computed(() => {
  if (!title.value) return null;
  else return titleId;
});

const a11yDesc = computed(() => {
  if (!describe.value) return null;
  else return descId;
});

const handleClose = () => {
  emit('closeModal');
};

const isActiveModalState = computed(() => {
  return show.value ? true : false;
});

const setModalTabIndex = computed(() => {
  return show.value ? 0 : -1;
});
</script>
