<template>
  <teleport to="#teleport">
    <transition name="fade">
      <base-modal
        :show="showTrailer"
        :title="`${currentMovieTrailer?.name}'s Trailer`"
        :describe="`Watch ${currentMovieTrailer?.name}'s Trailer`"
        @close-modal="closeTrailerModal"
      >
        <template #default>
          <iframe
            @keydown.esc="handleCloseTrailerOnEscape"
            @dblclick="handleFullScreenMode"
            :src="`${trailerSource}${currentMovieTrailer.trailer}`"
            :title="`${currentMovieTrailer.name}'s Movie Trailer`"
            referrerpolicy="no-referrer"
            class="mx-auto my-3 block aspect-video h-full w-[18.75rem] object-cover md:w-[37.5rem] lg:w-[50rem]"
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
              v-model="currentUpdateMovie"
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
            <img
              :src="recommendedMovieImageSource"
              :alt="recommendedMovie.name"
              class="rounded-lg shadow-sm h-auto w-auto hover:h-full hover:w-full hover:bg-dark/50 hover:before:absolute hover:before:content-none""
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
      <button type="button" @click="resetMovieSorting">Reset</button>
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

      <base-loader v-if="loadingState" class="my-2 md:my-4"> </base-loader>
      <template v-else-if="hasMovies">
          <base-movie-card
            v-for="movie in sortedMovies"
            :key="movie.id"
            :movie="movie"
            @edit-movie="handleEditMovie(movie.id ?? currentId)"
            @delete-movie="handleDeleteMovie(movie.id ?? currentId)"
            @add-to-watchlist="addToWatchList(movie.id ?? currentId)"
            @show-trailer="toggleMovieTrailerModal(movie.id ?? currentId)"
            @update-rating="handleRatingUpdate"
          ></base-movie-card>
      </template>
      <p  v-else-if="errorOccurred">
          <strong>
          <span class="mr-2">
            <ExclamationCircleIcon class="h-6 w-6 text-gray-500" />
          </span>
          Error Occurred! | {{ error.error }}
        </strong>
      </p>
  
      <p class="font-serif text-3xl font-bold text-light" v-else>
        No Movies Yet!
      </p>
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
import { ExclamationCircleIcon, PlusIcon } from '@heroicons/vue/24/outline';
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
const sortMovieOptions = ['name', 'year', 'filmRating', 'rating', 'inTheaters'];
const sortOrder = ['asc', 'desc'];
const showModal = ref(false);
const showTrailer = ref(false);

const isUpdate = ref(false);
const watchList = ref([]);
const currentId = ref('');
const currentUpdateMovie = ref(null);

const isLoading = ref(false);

const error = ref({ error: '', hasError: false });

const isStillThere = ref(false);

const trailerSource = 'https://www.youtube.com/embed/';
const currentMovieTrailer = ref();

const imageSource = import.meta.env.VITE_APP_IMAGE_ENDPOINT;
const imagePath = import.meta.env.VITE_APP_IMAGE_PATH;

const { idle } = useIdle(10 * 60 * 1000);

const handleError = err => {
  error.value.error = err.message;
  error.value.hasError = true;
  isLoading.value = false;
  console.error(err);
};

const getMovieData = async () => {
  isLoading.value = true;
  error.value.hasError = false;
  const { data: movieData, error: err } = await supabase
    .from('movies')
    .select(); // Literally, a SELECT query statement like so => SELECT * FROM movies;
  if (!err) {
    movies.value = movieData;
    isLoading.value = false;
    return movies;
  } else {
    handleError(err);
  }
};

onMounted(() => {
 getMovieData();
});

const loadingState = computed(() => {
  return isLoading.value && !error.value.hasError && movies.value.length === 0;
});

const hasMovies = computed(() => {
  return !isLoading.value && !error.value.hasError && movies.value.length > 0;
});

const errorOccurred = computed(() => {
  return !isLoading.value && movies.value.length === 0 && error.value.hasError;
});

const handleCreateMovie = async movie => {
  movies.value.push(movie);
  try {
    const { data, error } = await supabase // INSERT INTO movies (id, name, year, description, image, filmRating, rating, genres, inTheaters);
      .from('movies')
      .insert(movie)
      .select();
      const [ createdMovie ] = data;
    if (!error) {
      console.log(data);
      currentId.value = createdMovie.id;
      resetForm();
    } else {
      handleError(error);
    }
  } catch (error) {
    console.error(error);
  }
};

const handleEditMovie = async movieId => {
  currentId.value = movieId;
  isUpdate.value = true;
  const { data, error } = await supabase
    .from('movies')
    .select()
    .eq('id', movieId); // SELECT FROM movies WHERE id === movieId
  if (!error) {
    const [currentMovie] = data;
    currentUpdateMovie.value = currentMovie;
  } else {
    handleError(error);
  }
};

const handleUpdateMovie = async movie => {
  const currentMovie = movies.value.find(film => {
    return film.id === currentId.value;
  });
  currentMovie.name = movie.name;
  currentMovie.description = movie.description;
  currentMovie.year = movie.year;
  currentMovie.image = movie.image;
  currentMovie.filmRating = movie.filmRating;
  currentMovie.trailer = movie.trailer;
  const { error } = await supabase
    .from('movies')
    .update(movie)
    .eq('id', currentId.value); // UPDATE 'movies' SET (id, name, description, ...) WHERE id === 'movieId';
  if (!error) {
    console.log(`Updated movie record #${currentId.value} successfully!`);
    closeEditMovieModal();
  } else {
    handleError(error);
  }
};

const handleDeleteMovie = async movieId => {
  // DELETE FROM 'movies' WHERE id = 'movieId';
  // eq() filter is basically saying === id where is equal to the current movie id.
  const currentMovie = movies.value.findIndex(movie => {
    return movie.id === movieId;
  });
  movies.value.splice(currentMovie, 1);
  // DELETE FROM movies WHERE id === movieId
  try {
  const { error } = await supabase.from('movies').delete().eq('id', movieId);
  if (!error) {
    console.log(`Movie record with ID of # ${movieId} deleted successfully!`);
  } else {
    handleError(error);
  }
} 
catch(error) {
  console.log(error);
}
};

const addToWatchList = movieId => {
  const currentMovie = movies.value.find(movie => {
    return movie.id === movieId;
  });
  if (!watchList.value.includes(currentMovie)) {
    watchList.value.push(currentMovie);
    console.log(watchList.value);
  } else {
    const removeMovieFromWatch = watchList.value.findIndex(movie => {
      return currentMovie.id === movie.id;
    });
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
  const currentTrailer = movies.value.find(movie => {
    return movie.id === movieId;
  });
  currentMovieTrailer.value = currentTrailer;
};

const handleRatingUpdate = newRating => {
  console.log(newRating);
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
  return `${imageSource}${imagePath}${recommendedMovie.image}`;
});

const recommendedMoviePath = computed(() => {
  return `/movies/${recommendedMovie.id}`;
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
    filter 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.fade-enter-from,
.fade-leave-to {
  transition:
    opacity,
    filter 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045);
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
