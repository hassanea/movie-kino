<template>
  <div class="pt-20">
    <header class="h-full w-full">
      <base-navbar :logo :nav-links label="Main navigation" />
    </header>
    <main class="min-h-full w-full">
      <router-view></router-view>
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BaseNavbar from '../UI/BaseNavbar.vue';
import BaseFooter from '../BaseFooter.vue';

const logo = {
  image:
    import.meta.env.VITE_APP_IMAGE_ENDPOINT +
    import.meta.env.VITE_APP_IMAGE_PATH_ROOT +
    'movie-kino-logo.svg',
  text: 'Movie Kino Logo',
};

const navLinks = [...useRouter().options.routes].filter(el => {
  if (el.path.includes(':')) return;
  else return el;
});
</script>
