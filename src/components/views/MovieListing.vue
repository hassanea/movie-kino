<template>
  <teleport to="#teleport">
    <transition name="fade">
      <base-modal
        :show="showTrailer"
        :title="`${currentMovie?.name}'s Trailer`"
        :describe="`Watch ${currentMovie?.name}'s Trailer`"
        @close-modal="closeTrailerModal"
      >
        <template #default>
          <iframe
            @keydown.esc="handleCloseTrailerOnEscape"
            @dblclick="handleFullScreenMode"
            :src="`${trailerSource}${currentMovie.trailer}`"
            :title="`${currentMovie.name}'s Movie Trailer`"
            referrerpolicy="no-referrer"
            class="mx-auto my-3 block aspect-video h-full w-full object-cover"
            allow="fullscreen"
            loading="lazy"
          ></iframe>
        </template>
      </base-modal>
    </transition>

    <transition name="fade">
      <base-modal
        :show="showModal"
        title="Create Movie"
        describe="Add a new movie."
        @close-modal="closeAddMovieModal"
      >
        <template #default>
          <keep-alive>
            <base-movie-form
              @update:modelValue="handleCreateMovie"
              @cancel="resetForm"
            >
            </base-movie-form>
          </keep-alive>
        </template>
      </base-modal>
    </transition>

    <transition name="fade">
      <base-modal
        :show="isUpdate"
        title="Edit Movie"
        describe="Modify movie data."
        @close-modal="closeEditMovieModal"
      >
        <template #default>
          <base-movie-form
            v-model="currentMovie"
            @update:modelValue="handleUpdateMovie($event)"
            @cancel="closeEditMovieModal"
          ></base-movie-form>
        </template>
      </base-modal>
    </transition>

    <transition name="fade">
      <base-modal
        :show="isStillThere"
        title="Are You Still Looking For a Movie?"
        @close-modal="closeRecommendedMovieModal"
      >
        <template #default>
          <p
            class="my-4 line-clamp-2 text-base italic leading-normal md:text-lg"
          >
            <span class="mr-3">
              <img
                src="../../../assets/hand-point-right-solid.svg"
                alt=""
                class="green inline-block h-6 w-6 align-middle"
              /> </span
            >Here is our
            <span class="font-semibold text-blue-1000">recommended</span>
            movie:
          </p>

          <router-link
            :to="recommendedMoviePath"
            v-if="recommendedMovie"
            class="inline-block"
          >
            <IKImage
              :urlEndpoint="imageSource"
              :path="recommendedMovieImageSource"
              :alt="recommendedMovie.name"
              class="h-auto w-auto rounded-lg shadow-sm hover:h-full hover:w-full hover:bg-dark/50 hover:before:absolute hover:before:content-none"
              :transformation="[{ format: 'avif' }, 'n-movie-image']"
              loading="lazy"
            />
          </router-link>
        </template>
      </base-modal>
    </transition>
  </teleport>

  <section
    class="static flex h-auto w-full flex-col justify-center bg-[#B6CCD8] p-2 text-dark lg:flex-row lg:justify-between"
  >
    <div
      class="flex flex-col flex-wrap items-center justify-center lg:flex-row lg:justify-start"
    >
      <select
        class="m-3 inline-block h-auto w-auto cursor-pointer rounded-md align-middle font-medium"
        v-model="selectedSortCriteria"
        aria-label="Select Movie Sort Criteria"
      >
        <option value="" disabled="true">Please select sort criteria!</option>
        <option
          v-for="sortmovieProp in sortMovieOptions"
          :value="sortmovieProp"
          :key="sortmovieProp"
        >
          {{ sortmovieProp }}
        </option>
      </select>
      <select
        class="m-3 inline-block h-auto w-auto cursor-pointer rounded-md align-middle font-medium"
        v-model="sortOrderOpt"
        aria-label="Select Movie Sorting Order"
      >
        <option value="" disabled="true">Please select sort order!</option>
        <option
          v-for="sortOption in sortOrder"
          :value="sortOption"
          :key="sortOption"
        >
          {{ sortOption }}
        </option>
      </select>
      <base-button
        variant="icon"
        label="Reset sort filters"
        v-tooltip.bottom="'Reset'"
        @click="resetMovieSorting"
        @keydown.enter="resetMovieSorting"
      >
        <template #default>
          <img
            src="../../../assets/undo.svg"
            alt=""
            class="inline-block h-6 w-6 align-middle"
          />
        </template>
      </base-button>
    </div>

    <div
      class="lg:flex-end flex flex-col flex-wrap items-center justify-center lg:flex-row"
    >
      <p class="mx-2 p-2 font-semibold">
        Average Rating: {{ averageMovieRating }}
        <span class="ml-2 mr-2">|</span> Number of movies:
        {{ numberOfMovies }}
      </p>
    </div>
  </section>
  <section
    class="mx-auto h-full w-full max-w-[1700px] px-2 py-0 md:px-3 lg:px-5 xl:px-[1.125rem]"
  >
    <h1 class="sr-only">Movie Listing</h1>
    <div
      class="mt-5 grid grid-cols-1 md:mt-7 md:grid-cols-2 lg:mt-10 xl:mt-8 xl:grid-cols-3"
    >
      <base-loader v-if="loadingState" class="my-2 md:my-4" />
      <p class="error-msg" v-else-if="errorOccurred">
        Error Occurred! - {{ error }}
      </p>

      <p
        class="mx-auto bg-blue-1000 text-center font-serif text-3xl font-bold text-light"
        v-else-if="noDataState"
      >
        No Movies Yet!
      </p>

      <template v-else>
        <base-movie-card
          v-for="movie in sortedMovies"
          :key="movie.id"
          :movie="movie"
          @edit-movie="handleEditMovie(movie.id ?? currentId)"
          @delete-movie="handleDeleteMovie(movie.id ?? currentId)"
          @add-to-watch-list="addToWatchList(movie.id ?? currentId)"
          @show-trailer="toggleMovieTrailerModal(movie.id ?? currentId)"
          @update-rating="handleRatingUpdate($event)"
        />
      </template>
    </div>
  </section>

  <base-button
    @click="displayAddMovieModal"
    v-tooltip="'Add Movie'"
    variant="circular"
    label="Open Create Movie Modal"
    class="fixed bottom-0 right-2"
  >
    <template #default>
      <PlusIcon class="inline-block h-6 w-6 align-middle" />
    </template>
  </base-button>
  <base-button
    variant="pill"
    label="Reset All Movie Ratings"
    @click="resetMovieRatings"
    class="fixed bottom-20 right-2"
  >
    Reset Ratings
  </base-button>
</template>

<script setup>
import { defineAsyncComponent, ref, computed, onMounted, watch } from 'vue';
import { supabase } from '../../lib/supabaseClient.js';
import { useIdle } from '@vueuse/core';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { IKImage } from 'imagekitio-vue';
import BaseMovieCard from '../../components/BaseMovieCard.vue';
import BaseButton from '../BaseButton.vue';

const BaseLoader = defineAsyncComponent(async () => {
  return await import('../../components/BaseLoader.vue');
});

const BaseModal = defineAsyncComponent(async () => {
  return await import('../../components/BaseModal.vue');
});

const BaseMovieForm = defineAsyncComponent(async () => {
  return await import('../../components/BaseMovieForm.vue');
});

const movies = ref([]);
const selectedSortCriteria = ref('');
const sortOrderOpt = ref('');
const sortMovieOptions = ['year', 'rating', 'inTheaters'];
const sortOrder = ['asc', 'desc'];
const showModal = ref(false);
const showTrailer = ref(false);

const isUpdate = ref(false);
const watchList = ref([]);
const currentId = ref('');

const watchListFromStorage = localStorage.getItem('watchList');
if (watchListFromStorage) watchList.value = JSON.parse(watchListFromStorage);

const currentMovie = ref(null);

const isLoading = ref(false);

const error = ref('');

const isStillThere = ref(false);

const trailerSource = 'https://www.youtube.com/embed/';

const imageSource = import.meta.env.VITE_APP_IMAGE_ENDPOINT;
const imagePath = import.meta.env.VITE_APP_IMAGE_PATH;

const { idle } = useIdle(5 * 60 * 1000);

const handleError = err => {
  error.value = err.message;
  isLoading.value = false;
};

const handleWatchListToStorage = items => {
  const sanitizedList = JSON.stringify(items);
  localStorage.setItem('watchList', sanitizedList);
};

const getMovieData = async () => {
  isLoading.value = true;
  error.value = '';
  const { data: movieData, error: err } = await supabase
    .from('randommovies')
    .select()
    .limit(27); // Literally, a SELECT query statement like so => SELECT * FROM movies;
  if (!err) {
    isLoading.value = false;
    movies.value = movieData;
    return movies;
  } else {
    handleError(err);
  }
};

onMounted(() => {
  getMovieData();
});

const loadingState = computed(() => {
  return isLoading.value && !error.value && movies.value.length === 0;
});

const errorOccurred = computed(() => {
  return !isLoading.value && error.value && movies.value.length === 0;
});

const noDataState = computed(() => {
  return !isLoading.value && !error.value && movies.value.length === 0;
});

const handleCreateMovie = async movie => {
  movies.value.push(movie);
  try {
    const { data, err } = await supabase // INSERT INTO movies (id, name, year, description, image, filmRating, rating, genres, inTheaters);
      .from('movies')
      .insert(movie)
      .select();
    const [createdMovie] = data;
    if (!err) {
      currentId.value = createdMovie.id;
      resetForm();
    } else {
      handleError(err);
    }
  } catch (error) {
    throw new Error(`Failed to create movie!: ${error}`);
  }
};

const findMovie = movieId => {
  return movies.value.find(film => film.id === movieId);
};

const retrieveMovieIndex = movieId => {
  return movies.value.findIndex(movie => movie.id === movieId);
};

const handleEditMovie = async movieId => {
  currentId.value = movieId;
  isUpdate.value = true;
  const { data, err } = await supabase
    .from('movies')
    .select()
    .eq('id', movieId); // SELECT FROM movies WHERE id === movieId
  if (!err) {
    const [editedMovie] = data;
    currentMovie.value = editedMovie;
  } else {
    handleError(err);
  }
};

const handleUpdateMovie = async movie => {
  const updatedMovie = findMovie(currentId.value);
  updatedMovie.name = movie.name;
  updatedMovie.description = movie.description;
  updatedMovie.year = movie.year;
  updatedMovie.image = movie.image;
  updatedMovie.filmRating = movie.filmRating;
  updatedMovie.trailer = movie.trailer;
  const { err } = await supabase
    .from('movies')
    .update(movie)
    .eq('id', currentId.value); // UPDATE 'movies' SET (id, name, description, ...) WHERE id === 'movieId';
  if (!err) {
    console.log(`Updated movie record #${currentId.value} successfully!`);
    closeEditMovieModal();
  } else {
    handleError(err);
  }
};

const handleDeleteMovie = async movieId => {
  // DELETE FROM 'movies' WHERE id = 'movieId';
  // eq() filter is basically saying === id where is equal to the current movie id.
  const currentMovieIndex = retrieveMovieIndex(movieId);
  movies.value.splice(currentMovieIndex, 1);
  // DELETE FROM movies WHERE id === movieId
  try {
    const { err } = await supabase.from('movies').delete().eq('id', movieId);
    if (!err) {
      console.log(`Movie record with ID of # ${movieId} deleted successfully!`);
    } else {
      handleError(err);
    }
  } catch (error) {
    console.log(error);
  }
};

const addToWatchList = movieId => {
  const movieToWatch = findMovie(movieId);
  if (!watchList.value.includes(movieToWatch)) {
    watchList.value.push(movieToWatch);
    console.log(watchList.value);
  } else {
    const removeMovieFromWatch = retrieveMovieIndex(movieToWatch);
    return watchList.value.splice(removeMovieFromWatch, 1);
  }
};

const resetMovieSorting = () => {
  selectedSortCriteria.value = '';
  sortOrderOpt.value = '';
};

const resetMovieRatings = () => {
  movies.value.forEach(movie => {
    movie.rating = 0;
  });
};

const displayAddMovieModal = () => {
  showModal.value = !showModal.value;
};

const toggleMovieTrailerModal = movieId => {
  showTrailer.value = !showTrailer.value;
  const currentTrailer = findMovie(movieId);
  currentMovie.value = currentTrailer;
};

const handleRatingUpdate = async newRating => {
  const currentRating = findMovie(newRating.id);
  currentRating.rating = newRating.rating;
  const { err } = await supabase
    .from('movies')
    .update(currentRating)
    .eq('id', newRating.id);
  if (!err) {
    console.log(`Updated movie rating #${currentRating.id} successfully!`);
  } else {
    handleError(err);
  }
};

const sortedMovies = computed(() => {
  // REFERENCE: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

  // const moviesShuffled = [...movies.value]
  //   .map(movie => {
  //     return { ...movie, sort: Math.random() };
  //   })
  //   .sort((a, b) => {
  //     return a.sort - b.sort;
  //   });

  if (!selectedSortCriteria.value && !sortOrderOpt.value) {
    return movies.value;
  } else {
    return [...movies.value].sort((a, b) => {
      if (sortOrderOpt.value === 'asc') {
        return a[selectedSortCriteria.value] - b[selectedSortCriteria.value];
      } else if (sortOrderOpt.value === 'desc') {
        return b[selectedSortCriteria.value] - a[selectedSortCriteria.value];
      } else {
        return;
      }
    });
  }
});

const numberOfMovies = computed(() => {
  if (movies.value.length === 0) return 0;
  else {
    return movies.value.length;
  }
});

const closeRecommendedMovieModal = () => {
  isStillThere.value = false;
};

const recommendedMovie = computed(() => {
  const randomIndex = Math.floor(Math.random() * numberOfMovies.value + 0);
  return movies.value[randomIndex];
});

const recommendedMovieImageSource = computed(() => {
  return `${imagePath}${recommendedMovie.value.image}`;
});

const recommendedMoviePath = computed(() => {
  return `/movies/${recommendedMovie.value.id}`;
});

const averageMovieRating = computed(() => {
  if (movies.value.length === 0) return '-';
  else {
    const avg =
      movies.value.reduce((total, movie) => {
        return total + movie.rating;
      }, 0) / movies.value.length;
    const floatPoint = avg % 1;
    if (floatPoint < 0.5) {
      return Math.floor(avg);
    } else {
      return Math.ceil(avg);
    }
  }
});

const closeAddMovieModal = () => {
  showModal.value = false;
};

const closeTrailerModal = () => {
  showTrailer.value = false;
};

const handleCloseTrailerOnEscape = () => {
  document.exitFullscreen();
};

const getFullScreenElement = () => {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
};

const handleFullScreenMode = () => {
  if (!getFullScreenElement()) {
    document.documentElement.requestFullscreen().catch(e => console.error(e));
  } else {
    document.exitFullscreen();
  }
};

const resetForm = () => {
  closeAddMovieModal();
};

const closeEditMovieModal = () => {
  isUpdate.value = false;
};

watch(
  watchList,
  value => {
    handleWatchListToStorage(value);
  },
  { immediate: true, deep: true },
);
watch(idle, () => {
  if (idle.value) {
    isStillThere.value = true;
  } else {
    return;
  }
});
</script>

<style scoped>
.green {
  filter: brightness(0) saturate(100%) invert(59%) sepia(47%) saturate(2984%)
    hue-rotate(48deg) brightness(90%) contrast(90%);
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity,
    filter,
    0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.fade-enter-from,
.fade-leave-to {
  transition:
    opacity,
    filter,
    0.6s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  opacity: 0;
  filter: blur(10px);
}

/* transition-group => name="movie-list" */
.movie-list-move, /* apply transition to moving elements */
.movie-list-enter-active,
.movie-list-leave-active {
  transition: all 0.7s cubic-bezier(0.23, 1, 0.32, 1);
}

.movie-list-enter-from,
.movie-list-leave-to {
  opacity: 0;
  filter: blur(10px);
  transform: translateX(30px);
}
</style>
