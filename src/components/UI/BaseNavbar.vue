<template>
  <nav
    class="fixed left-0 top-0 z-30 flex h-20 w-full flex-col flex-wrap rounded bg-[#b6b5d8] p-3 text-dark opacity-90 shadow-md md:flex-row md:p-4"
    :aria-label="label"
    :class="navbarClasses"
  >
    <button
      type="button"
      @click="toggleMobileNavigation"
      aria-label="Mobile menu toggler"
      :aria-expanded="isMobileNavExpanded"
      v-if="isMobile"
      class="h-13 w-13 m-1 mr-auto inline-block rounded-xl bg-light p-2 align-middle text-dark hover:bg-dark focus:border-2 focus:border-solid focus:border-violet-900 focus:outline-none active:shadow-xl active:shadow-blue-1000 md:m-0"
    >
      <Bars2Icon
        v-if="!toggle"
        class="inline-block h-8 w-8 align-middle text-dark hover:text-light"
      />
      <XMarkIcon
        v-else
        class="inline-block h-8 w-8 align-middle text-dark hover:text-light"
      />
    </button>
    <div
      class="mr-0 flex flex-shrink-0 flex-col items-center justify-center md:mr-auto md:flex-row md:justify-start"
    >
      <img
        v-if="logo"
        :src="logo.image"
        :alt="logo.text"
        width="250"
        height="auto"
      />
    </div>
    <ul
      :class="mobileNavToggleClasses"
      class="flex h-full flex-col flex-wrap items-center pb-0 pt-2 transition-transform md:static md:flex-row md:justify-end md:py-3"
    >
      <li
        v-for="(navLink, index) in navLinks"
        :key="index"
        class="list-none p-1 align-middle md:p-0"
      >
        <router-link
          :to="navLink.path"
          class="mb-4 block font-bold md:mx-4 md:mb-0"
          v-tooltip="navLink.name"
          :aria-label="navLink.name"
        >
          <HomeIcon
            v-if="navLink.name === 'Home'"
            class="inline-block h-8 w-8 align-middle transition hover:fill-cyan-800"
          />

          <FilmIcon
            v-else
            class="hover:violet-700 inline-block h-8 w-8 align-middle transition hover:fill-cyan-800"
          />
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue';
import { useMediaQuery } from '@vueuse/core';

import {
  Bars2Icon,
  HomeIcon,
  FilmIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  logo: {
    type: Object,
    required: false,
    validator(value) {
      return Object.keys(value).length > 0;
    },
  },
  navLinks: {
    type: Array,
    required: true,
  },
});

const { label, logo, navLinks } = toRefs(props);

const toggle = ref(false);

const isMobile = useMediaQuery('(min-width: 320px) and (max-width: 767px)');

const toggleMobileNavigation = () => {
  toggle.value = !toggle.value;
};

const isMobileNavExpanded = computed(() => {
  return toggle.value ? true : false;
});
const navbarClasses = computed(() => {
  return { 'h-auto': toggle.value };
});
const mobileNavToggleClasses = computed(() => {
  return {
    'left-0 top-0 flex w-full justify-center': toggle.value,
    'fixed -left-28': !toggle.value,
  };
});
</script>

<style>
.router-link-active {
  @apply border-b-4 border-solid border-blue-1000 pb-1;
}
</style>
