<template>
  <form
    class="overflow-y-scroll"
    @submit.prevent="handleEditMovie"
    v-if="modelValue"
  >
    <div class="form-control">
      <label for="movieName"
        >Movie Name:
        <input
          type="text"
          id="movieName"
          v-model.trim="updatedMovie.name"
          :class="{
            'bg-red-600 text-black': isInvalidForm && updatedMovie.name === '',
          }"
          placeholder="Enter a Movie Name..."
        />
      </label>
    </div>
    <div class="form-control">
      <label for="movieDesc"
        >Movie Description:
        <textarea
          id="movieDesc"
          v-model.trim="updatedMovie.description"
          :class="{
            'bg-red-600 text-black':
              isInvalidForm && updatedMovie.description === '',
          }"
          placeholder="Enter a Movie Description..."
        ></textarea>
      </label>
    </div>

    <div class="form-control">
      <label for="movieYear"
        >Movie Release Year:
        <input type="text" v-model.number="updatedMovie.year" id="movieYear" />
      </label>
    </div>

    <div class="form-control">
      <label for="movieImage"
        >Movie Image:
        <input
          type="text"
          v-model.trim="updatedMovie.image"
          id="movieImage"
          placeholder="Enter a Movie Image"
          :class="{
            'bg-red-600 text-black': isInvalidForm && !isUpdateMovieImageValid,
          }"
        />
      </label>
    </div>
    <div class="form-control">
      <label for="movieFilmRating"
        >Movie Film Rating:
        <select id="movieFilmRating" v-model="updatedMovie.filmRating">
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

    <div class="form-control">
      <label for="movieTrailer"
        >Movie Trailer ID:
        <input type="text" id="movieTrailer" v-model="updatedMovie.trailer" />
      </label>
    </div>

    <div class="form-actions">
      <button type="submit">Update Movie</button>
      <button
        type="button"
        @click="handleCancelForm"
        @keydown.enter="handleCancelForm"
        @keydown.space="handleCancelForm"
      >
        Cancel
      </button>
    </div>
  </form>
  <form
    class="h-full w-full overflow-y-auto"
    @submit.prevent="handleAddMovie"
    v-else
  >
    <div class="mx-auto my-4 block h-auto w-full">
      <label
        for="movieName"
        class="block text-center font-serif text-lg font-bold italic leading-normal"
        >Movie Name:
      </label>
      <input
        type="text"
        id="movieName"
        v-model.trim="movie.name"
        class="mx-auto flex flex-row items-center justify-center rounded-md p-3 caret-blue-1000 placeholder:font-medium"
        :class="{
          'bg-red-600 text-dark': isInvalidForm && movie.name === '',
        }"
        placeholder="Enter a Movie Name..."
      />
    </div>
    <div class="mx-auto my-4 flex flex-row items-center justify-center">
      <label for="movieDesc"
        >Movie Description:
        <textarea
          id="movieDesc"
          v-model.trim="movie.description"
          class="rounded-md p-3 placeholder:font-medium"
          :class="{
            'bg-red-600 text-dark': isInvalidForm && movie.description === '',
          }"
          placeholder="Enter a Movie Description..."
        ></textarea>
      </label>
    </div>

    <div class="form-control">
      <label for="movieYear"
        >Movie Release Year:
        <input type="text" v-model.number="movie.year" id="movieYear" />
      </label>
    </div>

    <div class="form-control">
      <label for="movieImage"
        >Movie Image:
        <input
          type="text"
          id="movieImage"
          placeholder="Enter a Movie Image"
          v-model.trim="movie.image"
          :class="{
            'bg-red-600 text-black': isInvalidForm && !isMovieImageValid,
          }"
        />
      </label>
    </div>
    <div class="form-control">
      <label for="movieFilmRating"
        >Movie Film Rating:
        <select id="movieFilmRating" v-model="movie.filmRating">
          <option value="" disabled="true">
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

    <div class="form-control">
      <label for="movieTrailer"
        >Movie Trailer ID:
        <input
          type="text"
          id="movieTrailer"
          placeholder="Enter a Movie Trailer"
          v-model="movie.trailer"
        />
      </label>
    </div>

    <div class="form-control">
      <base-rating v-model="movie.rating"></base-rating>
    </div>

    <div class="form-control">
      <label for="movieGenres"
        >Movie Genres:
        <select
          id="movieGenres"
          v-model="movieGenres"
          :class="{
            'bg-red-600 text-black': isInvalidForm && movieGenres.length === 0,
          }"
          multiple
        >
          <option value="" disabled="true">Please choose a movie genre!</option>
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

    <div class="form-control">
      <label for="movieInTheaters"
        >In Theaters?:
        <input
          type="checkbox"
          id="movieInTheaters"
          class="rounded-md p-[0.625rem] text-slate-600 accent-slate-600 focus:border-4 focus:border-solid focus:border-blue-1000"
          v-model="movie.inTheaters"
        />
      </label>
    </div>

    <div
      class="mb-2 mt-6 flex h-auto w-full flex-nowrap justify-center gap-x-4"
    >
      <div class="mr-auto flex h-auto w-full justify-start">
        <button
          type="submit"
          class="inline-block flex-1 basis-1/2 rounded-lg bg-blue-900 p-3 text-xl font-bold text-light transition-colors hover:bg-white hover:text-blue-900"
        >
          Create
        </button>
      </div>
      <div class="ml-auto flex h-auto w-full justify-end">
        <button
          type="button"
          @click="handleCancelForm"
          @keydown.enter="handleCancelForm"
          class="inline-block flex-1 basis-1/2 rounded-lg bg-pink-800 p-3 text-xl font-bold text-light transition-colors hover:bg-light hover:text-pink-800"
        >
          Cancel
        </button>
      </div>
    </div>
    <div class="my-3 flex flex-row items-center justify-center text-center">
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

const handleCancelForm = () => {
  handleResetForm();
  emit('cancel');
};

const handleResetForm = () => {
  isInvalidForm.value = false;
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
