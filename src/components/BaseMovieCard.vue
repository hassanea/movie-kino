<template>
  <article
    class="relative mb-0 mt-6 grid h-full grid-cols-1 px-5 text-center md:mt-3 md:px-4"
  >
    <div
      class="h-full w-full rounded-xl bg-[#cf93a573] mix-blend-normal lg:mix-blend-hard-light"
    >
      <IKImage
        :urlEndpoint="imageSource"
        :path="`${movieImagePath}${movie.image}`"
        :alt="movie.name"
        width="320"
        height="480"
        :transformation="[{ format: 'avif' }, 'n-movie-image']"
        loading="lazy"
        class="movie-img relative mx-auto my-0 block h-[30rem] max-w-full object-cover"
      />
    </div>

    <base-star :rating="movie.rating" variant="listing"></base-star>

    <div
      class="movie-card-bg mx-auto mb-14 mt-0 h-full max-h-[92%] min-h-[80%] w-full rounded-[20px] p-3 md:mb-12 md:p-4"
    >
      <h2
        class="mx-auto my-3 line-clamp-2 text-center font-serif text-[1.75rem] font-bold italic leading-normal tracking-[0.12rem] md:my-4 md:text-3xl md:tracking-[0.2rem]"
      >
        {{ movie.name }}
      </h2>

      <p
        class="mb-2 font-serif text-xl font-bold italic leading-normal tracking-widest"
      >
        <time class="ml-1 mr-1" :datetime="movie.year"> {{ movie.year }} </time>
        <span class="ml-1 mr-1 border-2 border-solid border-r-black"></span>

        <span class="m-3 font-serif text-xl font-bold italic leading-normal">
          {{ movie.filmRating }}
        </span>
      </p>

      <div
        class="mx-0 my-2 flex h-auto w-full flex-1 flex-row flex-wrap items-center justify-center md:my-[0.625rem]"
      >
        <base-movie-badge
          v-for="genre in movieGenres"
          :key="genre"
          :genre="genre"
        />
      </div>
      <p
        class="mx-0 mb-[1.25rem] text-pretty font-sans text-lg font-normal not-italic leading-loose md:mb-5 md:mt-3"
      >
        {{ movie.description }}
      </p>
      <p class="my-2 font-serif text-lg font-bold not-italic leading-normal">
        In Theaters?: {{ inTheatersOutput }}
      </p>
      <base-rating
        v-model="selectedRating"
        @update:modelValue="handleRating(movie.id, selectedRating)"
      />
      <div
        class="my-3 flex h-auto w-full flex-1 flex-row flex-wrap items-center justify-center md:my-4"
      >
        <base-button
          label="Add to watchlist"
          variant="icon"
          @click="addToWatchList(movie.id)"
          @keydown.enter="addToWatchList(movie.id)"
          v-tooltip="'Add to Watchlist'"
        >
          <template #default>
            <HeartIcon
              class="inline-block h-6 w-6 fill-current align-middle text-red-500"
            />
          </template>
        </base-button>

        <base-button
          label="Edit Movie"
          variant="icon"
          @click="editMovie(movie.id)"
          @keydown.enter="editMovie(movie.id)"
          v-tooltip="'Edit Movie'"
        >
          <template #default>
            <PencilSquareIcon
              class="inline-block h-6 w-6 fill-yellow-200 align-middle text-black"
            />
          </template>
        </base-button>

        <base-button
          label="Delete Movie"
          variant="icon"
          @click="deleteMovie(movie.id)"
          @keydown.enter="deleteMovie(movie.id)"
          v-tooltip="'Delete Movie'"
        >
          <template #default>
            <TrashIcon
              class="inline-block h-6 w-6 fill-black align-middle text-red-700"
            />
          </template>
        </base-button>

        <base-button
          label="Watch Movie Trailer"
          variant="icon"
          @click="handleShowMovieTrailer(movie.id)"
          @keydown.enter="handleShowMovieTrailer(movie.id)"
          v-tooltip="'Watch Trailer'"
        >
          <template #default>
            <TvIcon class="inline-block h-6 w-6 align-middle" />
          </template>
        </base-button>
      </div>

      <router-link :to="currentMoviePage" class="btn">
        <span class="mr-3 inline-block text-center align-middle">
          <EyeIcon
            class="inline-block h-6 w-6 fill-blue-700 align-middle text-light"
          /> </span
        >View Movie
      </router-link>
    </div>
  </article>
</template>

<script setup>
import { ref, toRefs, computed } from 'vue';
import BaseMovieBadge from './BaseMovieBadge.vue';
import BaseButton from './BaseButton.vue';
import { IKImage } from 'imagekitio-vue';
import { TvIcon } from '@heroicons/vue/24/solid';
import BaseRating from './BaseRating.vue';
import BaseStar from './BaseStar.vue';

import {
  EyeIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const { movie } = toRefs(props);

const emit = defineEmits([
  'addToWatchList',
  'editMovie',
  'deleteMovie',
  'showTrailer',
  'updateRating',
]);

const selectedRating = ref(movie.value.rating);

const imageSource = import.meta.env.VITE_APP_IMAGE_ENDPOINT;

const movieImagePath = import.meta.env.VITE_APP_IMAGE_PATH;

const addToWatchList = movieId => {
  emit('addToWatchList', movieId);
};

const handleRating = (movieId, rating) => {
  const updatedRating = { id: movieId, rating: rating };
  emit('updateRating', updatedRating);
};

const handleShowMovieTrailer = movieId => {
  emit('showTrailer', movieId);
};

const editMovie = movieId => {
  emit('editMovie', movieId);
};

const deleteMovie = movieId => {
  emit('deleteMovie', movieId);
};

const movieGenres = computed(() => {
  return movie.value.genres.split(', ');
});

const inTheatersOutput = computed(() => {
  return movie.value.inTheaters ? 'Currently In Theaters' : 'No';
});

const currentMoviePage = computed(() => {
  return `/movies/${movie.value.id}`;
});
</script>

<style>
.movie-card-bg {
  background: linear-gradient(-226deg, #7198af 20%, #93a5cf 80%);
  filter: drop-shadow(0 0 3px #a0a0ad);
}
</style>

<style scoped>
.movie-img {
  bottom: -8%;
  left: 0;
  border-radius: 5%;
}
</style>
