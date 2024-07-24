<template>
  <form
    class="h-auto w-full"
    @submit.prevent="handleEditMovie"
    v-if="modelValue"
  >
    <div class="my-2 md:my-3">
      <label
        for="updatedMovieName"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Name:
        <input
          type="text"
          id="updatedMovieName"
          v-model.trim="updatedMovie.name"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
          :class="{
            'bg-red-900 text-light placeholder:text-white':
              isInvalidForm && updatedMovie.name === '',
          }"
          placeholder="Enter a Movie Name..."
        />
      </label>
    </div>
    <div class="my-2 md:my-3">
      <label
        for="updatedMovieDesc"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Description:
        <textarea
          id="updatedmMovieDesc"
          v-model.trim="updatedMovie.description"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
          :class="{
            'bg-red-900 text-light placeholder:text-white':
              isInvalidForm && updatedMovie.description === '',
          }"
          placeholder="Enter a Movie Description..."
        ></textarea>
      </label>
    </div>

    <div class="my-3">
      <label
        for="updatedMovieYear"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Release Year:
        <input
          type="text"
          v-model.number="updatedMovie.year"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
          id="updatedMovieYear"
        />
      </label>
    </div>

    <div class="my-3">
      <label
        for="updatedMovieImage"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Image:
        <input
          type="text"
          v-model.trim="updatedMovie.image"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
          id="updatedMovieImage"
          placeholder="Enter a Movie Image"
          :class="{
            'bg-red-900 text-light placeholder:text-white':
              isInvalidForm && !isUpdateMovieImageValid,
          }"
        />
      </label>
    </div>
    <div class="my-3">
      <label
        for="updatedMovieFilmRating"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Film Rating:
        <select
          id="updatedMovieFilmRating"
          v-model="updatedMovie.filmRating"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
        >
          <option value="" disabled="true">
            Please choose a movie film rating!
          </option>
          <option
            v-for="(movieFilmRating, index) in movieFilmRatingList"
            :key="index"
            :value="movieFilmRating"
            :selected="updatedMovie.filmRating === movieFilmRating"
          >
            {{ movieFilmRating }}
          </option>
        </select>
      </label>
    </div>

    <div class="my-3">
      <label
        for="updatedMovieTrailer"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Trailer ID:
        <input
          type="text"
          id="updatedMovieTrailer"
          v-model="updatedMovie.trailer"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
        />
      </label>
    </div>

    <div
      class="mb-2 mt-6 flex h-auto w-full flex-nowrap justify-center gap-x-4"
    >
      <div class="mr-auto flex h-auto w-full justify-start">
        <base-button
          type="submit"
          @keydown.enter="handleEditMovie"
          variant="form"
          label="Update movie"
          class="flex-1 basis-1/2 bg-violet-950 text-light hover:bg-light hover:text-violet-950"
        >
          <template #default> Update </template>
        </base-button>
      </div>
      <div class="ml-auto flex h-auto w-full justify-end">
        <base-button
          variant="form"
          label="Cancel"
          @click="handleCancelEditForm"
          @keydown.enter="handleCancelEditForm"
          class="flex-1 basis-1/2 bg-pink-800 text-light hover:bg-light hover:text-pink-800"
        >
          <template #default> Cancel </template>
        </base-button>
      </div>
    </div>
    <div class="my-4 flex flex-row items-center justify-center text-center">
      <p
        class="rounded-md bg-pink-900 p-2 text-xl font-bold text-light"
        v-if="isInvalidForm"
      >
        Invalid Form!!
      </p>
    </div>
  </form>
  <form class="h-auto w-full" @submit.prevent="handleAddMovie" v-else>
    <div class="my-2 md:my-3">
      <label
        for="movieName"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Name:
      </label>
      <input
        type="text"
        id="movieName"
        v-model.trim="movie.name"
        class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
        :class="{
          'bg-red-900 text-light placeholder:text-white':
            isInvalidForm && movie.name === '',
        }"
        placeholder="Enter a Movie Name..."
      />
    </div>
    <div class="my-2 md:my-3">
      <label
        for="movieDesc"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Description:
        <textarea
          id="movieDesc"
          v-model.trim="movie.description"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
          :class="{
            'bg-red-900 text-light placeholder:text-white':
              isInvalidForm && movie.description === '',
          }"
          placeholder="Enter a Movie Description..."
        ></textarea>
      </label>
    </div>

    <div class="my-2 md:my-3">
      <label
        for="movieYear"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Release Year:
        <input
          type="text"
          v-model.number="movie.year"
          id="movieYear"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
        />
      </label>
    </div>

    <div class="my-2 md:my-3">
      <label
        for="movieImage"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Image:
        <input
          type="text"
          id="movieImage"
          placeholder="Enter a Movie Image"
          v-model.trim="movie.image"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
          :class="{
            'bg-red-900 text-light placeholder:text-white':
              isInvalidForm && !isMovieImageValid,
          }"
        />
      </label>
    </div>
    <div class="my-2 md:my-3">
      <label
        for="movieFilmRating"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Film Rating:
        <select
          id="movieFilmRating"
          v-model="movie.filmRating"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
        >
          <option value="" disabled="true" class="placeholder:text-light">
            Please choose a movie film rating!
          </option>
          <option
            v-for="movieFilmRating in movieFilmRatingList"
            :key="movieFilmRating"
            :value="movieFilmRating"
          >
            {{ movieFilmRating }}
          </option>
        </select>
      </label>
    </div>

    <div class="my-2 md:my-3">
      <base-rating v-model="movie.rating"></base-rating>
    </div>

    <div class="my-2 md:my-3">
      <label
        for="movieGenres"
        class="block font-sans text-lg font-semibold leading-normal"
        >Movie Genres:
        <select
          id="movieGenres"
          v-model="movieGenres"
          class="focus:blue-1000 mx-auto mt-1 block h-auto w-[90%] rounded-md p-3 font-medium text-dark caret-blue-1000 placeholder:font-medium placeholder:text-dark md:mt-3"
          :class="{
            'bg-red-900 text-light placeholder:text-white':
              isInvalidForm && movieGenres.length === 0,
          }"
          multiple
        >
          <option
            value=""
            disabled="true"
            class="font-bold text-dark placeholder-dark"
            :class="{
              'bg-red-900 text-light placeholder:text-white':
                isInvalidForm && movieGenres.length === 0,
            }"
          >
            Please choose a movie genre!
          </option>
          <option
            v-for="movieGenre in movieGenreList"
            :key="movieGenre"
            :value="movieGenre"
          >
            {{ movieGenre }}
          </option>
        </select>
      </label>
    </div>

    <div
      class="mb-2 mt-6 flex h-auto w-full flex-nowrap justify-center gap-x-4"
    >
      <div class="mr-auto flex h-auto w-full justify-start">
        <base-button
          variant="form"
          type="submit"
          @keydown.enter="handleAddMovie"
          label="Create Movie"
          class="flex-1 basis-1/2 bg-blue-900 text-light hover:bg-light hover:text-blue-900"
        >
          <template #default> Create </template>
        </base-button>
      </div>
      <div class="ml-auto flex h-auto w-full justify-end">
        <base-button
          variant="form"
          label="Cancel"
          @click="handleCancelForm"
          @keydown.enter="handleCancelForm"
          class="flex-1 basis-1/2 bg-pink-800 text-light hover:bg-light hover:text-pink-800"
        >
          <template #default> Cancel </template>
        </base-button>
      </div>
    </div>
    <div class="my-4 flex flex-row items-center justify-center text-center">
      <p
        class="rounded-md bg-pink-900 p-2 text-xl font-bold text-light"
        v-if="isInvalidForm"
      >
        Invalid Form!!
      </p>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import BaseRating from '../components/BaseRating.vue';
import BaseButton from '../components/BaseButton.vue';
import { movieRegex } from '../../src/utils/constants.js';
import movieShowData from '../../src/movieShowData.json';

const props = defineProps({
  modelValue: {
    type: Object,
    required: false,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue', 'cancel']);

const { genres, filmRatings } = movieShowData;

const movieGenreList = genres;
const movieFilmRatingList = filmRatings;

const movieGenres = ref([]);

const movie = ref({
  name: '',
  year: new Date().getFullYear(),
  description: '',
  image: '',
  filmRating: 'NR',
  rating: 0,
  genres: '',
  inTheaters: false,
  trailer: '',
});

const updatedMovie = ref({});

watch(
  () => props.modelValue,
  value => {
    updatedMovie.value = value;
  },
  { immediate: true },
);

const isInvalidForm = ref(false);

const isMovieImageValid = computed(() => {
  return (
    movie.value.image.endsWith('.jpg') ||
    movie.value.image.endsWith('.jpeg') ||
    movie.value.image.endsWith('.png') ||
    movie.value.image.endsWith('.webp') ||
    movie.value.image.endsWith('.avif')
  );
});

const isUpdateMovieImageValid = computed(() => {
  return (
    updatedMovie.value.image.endsWith('.jpg') ||
    updatedMovie.value.image.endsWith('.jpeg') ||
    updatedMovie.value.image.endsWith('.png') ||
    updatedMovie.value.image.endsWith('.webp') ||
    updatedMovie.value.image.endsWith('.avif')
  );
});

const clearValidationErrors = () => {
  isInvalidForm.value = false;
};

const handleCancelEditForm = () => {
  clearValidationErrors();
  emit('cancel');
};

const handleResetForm = () => {
  clearValidationErrors();
  movie.value.name = '';
  movie.value.year = new Date().getFullYear();
  movie.value.description = '';
  movie.value.image = '';
  movie.value.filmRating = 'NR';
  movie.value.rating = 0;
  movie.value.genres = [];
  movie.value.inTheaters = false;
  movie.value.trailer = '';
};

const handleCancelForm = () => {
  handleResetForm();
  emit('cancel');
};

const handleAddMovie = () => {
  if (
    !movieRegex.test(movie.value.name) ||
    movie.value.description === '' ||
    !isMovieImageValid.value ||
    movieGenres.value.length === 0
  ) {
    isInvalidForm.value = true;
    return;
  } else {
    movie.value.genres = movieGenres.value.join(', ');
    emit('update:modelValue', movie.value);
  }
};

const handleEditMovie = () => {
  if (
    !movieRegex.test(updatedMovie.value.name) ||
    updatedMovie.value.description === '' ||
    !isUpdateMovieImageValid.value
  ) {
    isInvalidForm.value = true;
    return;
  } else {
    emit('update:modelValue', updatedMovie.value);
  }
};
</script>
