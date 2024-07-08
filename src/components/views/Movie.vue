<template>
  <main class="h-full w-full">
    <nav class="m-4 flex h-auto w-full flex-row items-center justify-start">
      <base-button
        variant="circular"
        label="Back to Movie Listing"
        v-tooltip.right="'Back to Movie Listing'"
        @click="backToPrevPage"
        @keydown.enter="backToPrevPage"
      >
        <template #default>
          <ArrowLeftIcon />
        </template>
      </base-button>
    </nav>
    <base-loader v-if="loadingData" />
    <article
      class="h-full w-full flex-col flex-nowrap items-center justify-center"
      v-else-if="movieExists"
    >
      <div
        class="flex h-auto w-full flex-col items-center justify-center lg:flex-row"
      >
        <div
          class="relative flex flex-grow basis-full flex-col items-center lg:basis-[30%]"
        >
          <img
            :src="movieImagePoster"
            :alt="movie.name"
            class="rounded-xl object-cover"
          />
          <base-star :rating="movie.rating" variant="movie" />
        </div>
        <div
          class="movie-card-bg flex flex-grow basis-full flex-col items-center justify-center rounded-2xl p-4 text-center lg:basis-[70%]"
        >
          <h1
            class="mx-auto my-3 line-clamp-2 text-center font-serif text-4xl font-bold italic leading-normal tracking-[0.12rem] md:my-4 md:text-3xl md:tracking-[0.2rem]"
          >
            {{ movie.name }}
          </h1>
          <div
            class="mx-0 my-2 flex h-auto w-full flex-1 flex-row flex-wrap items-center justify-center md:my-[0.625rem]"
          >
            <base-movie-badge
              v-for="movieGenre in movieGenres"
              :key="movieGenre"
              :genre="movieGenre"
            ></base-movie-badge>
          </div>
          <p
            class="mx-0 mb-[1.25rem] text-pretty font-sans text-lg font-normal not-italic leading-loose md:mb-5 md:mt-3"
          >
            {{ movie.description }}
          </p>
        </div>
      </div>
    </article>
    <p v-else>Error occurred!</p>
  </main>
</template>

<script setup>
import { defineAsyncComponent, ref, computed, onMounted } from 'vue';
import { supabase } from '../../lib/supabaseClient.js';
import { useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import BaseButton from '../BaseButton.vue';
import BaseMovieBadge from '../BaseMovieBadge.vue';
import BaseStar from '../BaseStar.vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const imageSource = import.meta.env.VITE_APP_IMAGE_ENDPOINT;
const imagePath = import.meta.env.VITE_APP_IMAGE_PATH;
const router = useRouter();

const BaseLoader = defineAsyncComponent(async () => {
  return await import('../BaseLoader.vue');
});

const movie = ref(null);
const isLoading = ref(false);
const error = ref({ error: '', hasError: false });

const backToPrevPage = () => {
  router.go(-1);
};

const grabMovieData = async () => {
  isLoading.value = true;
  const { data, error } = await supabase
    .from('movies')
    .select()
    .eq('id', props.id);
  const [movieData] = data;
  if (!error) {
    isLoading.value = false;
    movie.value = movieData;
    return movie;
  } else {
    error.value.error = error;
    error.value.hasError = true;
    console.error(error);
  }
};

onMounted(() => {
  grabMovieData();
});

const movieImagePoster = computed(() => {
  return `${imageSource}${imagePath}${movie.value.image}`;
});

const movieGenres = computed(() => {
  return movie.value.genres.split(', ');
});

const movieExists = computed(() => {
  return !isLoading.value && movie.value && !error.value.hasError;
});

const loadingData = computed(() => {
  return isLoading.value && !movie.value && !error.value.hasError;
});
</script>
