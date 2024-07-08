<template>
  <section class="my-20 h-auto w-full rounded-xl bg-card-grad shadow-2xl">
    <div
      class="grid h-full w-full grid-cols-1 place-content-center place-items-center p-6 text-center"
    >
      <h1
        class="my-3 divide-y font-sans text-3xl font-semibold uppercase leading-normal md:text-4xl lg:text-5xl xl:text-6xl"
      >
        404 - Page Not Found!
      </h1>
      <p class="my-5 text-2xl font-medium tracking-wide">
        <span class="font-bold">{{ route.path }}</span> Does Not Exist!
      </p>
      <base-button
        variant="circular"
        label="Back to Home"
        @click="goToHome"
        @keydown.enter="goToHome"
        v-tooltip.bottom="'Go To Home'"
      >
        <template #default>
          <HomeIcon class="inline-block h-6 w-6 stroke-2 align-middle" />
        </template>
      </base-button>
    </div>
  </section>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { HomeIcon } from '@heroicons/vue/24/outline';
import BaseButton from '../BaseButton.vue';

const router = useRouter();
const route = useRoute();
const goToHome = () => {
  router.push('/');
};
</script>
