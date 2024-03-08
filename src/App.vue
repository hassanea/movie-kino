<template>
  <teleport to="#teleport">
    <transition name="fade">
      <base-modal
        :show="showModal"
        title="main-title"
        describe="main-desc"
        @close-modal="closeAddMovieModal"
      >
        <template #default>
          <keep-alive>
            <form @submit.prevent="handleCreateMovie">
              <div class="form-control">
                <label for="movieName"
                  >Movie Name:
                  <input
                    type="text"
                    id="movieName"
                    v-model.trim="movieName"
                    :class="{
                      'bg-red-600 text-black':
                        isInvalidForm && movieName === '',
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
                    v-model.trim="movieDescription"
                    :class="{
                      'bg-red-600 text-black':
                        isInvalidForm && movieDescription === '',
                    }"
                    placeholder="Enter a Movie Description..."
                  ></textarea>
                </label>
              </div>

              <div class="form-control">
                <label for="movieYear"
                  >Movie Release Year:
                  <input
                    type="text"
                    v-model.number="movieYear"
                    id="movieYear"
                  />
                </label>
              </div>

              <div class="form-control">
                <label for="movieImage"
                  >Movie Image:
                  <input
                    type="text"
                    id="movieImage"
                    placeholder="Enter a Movie Image"
                    v-model.trim="movieImage"
                    :class="{
                      'bg-red-600 text-black':
                        isInvalidForm && !isMovieImageValid,
                    }"
                  />
                </label>
              </div>
              <div class="form-control">
                <label for="movieFilmRating"
                  >Movie Film Rating:
                  <select id="movieFilmRating" v-model="movieFilmRating">
                    <option value="" disabled="true">
                      Please choose a movie film rating!
                    </option>
                    <option
                      v-for="(movieFilmRating, index) in movieFilmRatingList"
                      :key="index"
                      :value="movieFilmRating"
                    >
                      {{ movieFilmRating }}
                    </option>
                  </select>
                </label>
              </div>
              <div class="form-control">
                <label for="movieGenres"
                  >Movie Genres:
                  <select
                    id="movieGenres"
                    v-model="movieGenres"
                    :class="{
                      'bg-red-600 text-black':
                        isInvalidForm && movieGenres.length === 0,
                    }"
                    multiple
                  >
                    <option value="" disabled="true">
                      Please choose a movie genre!
                    </option>
                    <option
                      v-for="(movieGenre, index) in movieGenreList"
                      :key="index"
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
                    v-model="isInTheaters"
                  />
                </label>
              </div>
              <div class="form-actions">
                <button type="submit">Create</button>
                <button
                  type="button"
                  @click="resetForm"
                  @keydown.enter="resetForm"
                  @keydown.space="resetForm"
                >
                  Cancel
                </button>
                <p v-if="isLoading && !isInvalidForm">Loading...</p>
                <!-- <p v-else-if="!isLoading && isInvalidForm">Invalid Form!</p>
                <p v-else> <CheckCircleIcon class="inline-block w-6 h-6 text-green-700 align-middle" />  </p> -->
              </div>
            </form>
          </keep-alive>
        </template>
      </base-modal>
    </transition>
  </teleport>
  <div
    class="flex flex-col flex-nowrap min-h-full justify-center mx-auto relative"
  >
    <header>
      <nav
        class="flex flex-row flex-wrap w-full h-14 justify-end items-center fixed z-30 top-0 left-0 bg-cyan-300 opacity-90 text-black p-5"
      >
        <ul class="flex h-full flex-wrap">
          <li class="block align-middle list-none">
            <base-drop-down-menu :movies="watchList">
              <template #btn>
                <span class="ml-2 mr-2">
                  <FilmIcon class="inline-block h-6 w-6 text-gray-500" />
                </span>
                WatchList
              </template>
            </base-drop-down-menu>
          </li>
        </ul>
      </nav>
    </header>
    <main class="w-full min-h-full">
      <p>Average Movie Rating: {{ averageMovieRating }}</p>
      <p>{{ numberOfMovies }}</p>
      <div
        class="flex w-full h-auto flex-row flex-wrap justify-evenly items-center my-16 mx-auto py-0 px-2"
      >
        <template v-if="movies.length">
          <base-movie-card
            v-for="movie in movies"
            :key="movie.id"
            :movie="movie"
            @edit-movie="handleEditMovie(movie.id)"
            @delete-movie="handleDeleteMovie(movie.id)"
            @add-to-watchlist="addToWatchList(movie.id)"
          ></base-movie-card>
        </template>
        <div v-else>Loading...</div>
      </div>
      <button
        type="button"
        @click="displayAddMovieModal"
        class="inline-block fixed bottom-0 right-2 font-bold rounded-full bg-slate-600 text-white p-3"
      >
        <PlusIcon class="inline-block w-6 h-6 align-middle" />
      </button>
    </main>
    <base-footer></base-footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { supabase } from "./lib/supabaseClient";
// import { useIdle } from "@vueuse/core";
import BaseMovieCard from "./components/BaseMovieCard.vue";
import BaseModal from "./components/BaseModal.vue";
import BaseDropDownMenu from "./components/BaseDropDownMenu.vue";
import BaseFooter from "./components/BaseFooter.vue";
import { movieRegex } from "./utils/constants.js";
import { FilmIcon, PlusIcon } from "@heroicons/vue/24/outline";

// CheckCircleIcon,

const movies = ref([]);
const showModal = ref(false);
const movieName = ref("");
const movieYear = ref(new Date().getFullYear());
const movieDescription = ref("");
const movieImage = ref("");
const movieGenres = ref([]);
const isInTheaters = ref(false);
const isLoading = ref(false);
const isInvalidForm = ref(false);
const watchList = ref([]);

// const { idle, lastActive } = useIdle(5 * 60 * 1000);

const navItems = [
  {
    id: "qwa",
    name: "Qwant",
    to: "https://www.qwant.com",
  },
  {
    id: "eco",
    name: "Ecosia",
    to: "https://www.ecosia.org",
  },
  {
    id: "goo",
    name: "Google",
    to: "https://www.google.com",
  },
];

const movieFilmRatingList = ["G", "PG", "PG-13", "R", "NR", "NC-17"];

const movieFilmRating = ref("NR");

const movieGenreList = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Bollywood",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Foreign",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Short",
  "Silent",
  "Thriller",
  "War",
  "Western",
];

const getMovieData = async () => {
  const { data: movieData, error } = await supabase.from("movies").select(); // Literally, a SELECT query statement like so => SELECT * FROM movies;
  if (movieData.length > 0 && !error) {
    movies.value = movieData;
    return movies;
  } else {
    return error;
  }
};

onMounted(() => {
  getMovieData();
});

const displayAddMovieModal = () => {
  showModal.value = !showModal.value;
};

const averageMovieRating = computed(() => {
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
});

const numberOfMovies = computed(() => {
  return movies.value.length;
});

const closeAddMovieModal = () => {
  showModal.value = false;
};

const resetForm = () => {
  isInvalidForm.value = false;
  movieName.value = "";
  movieYear.value = new Date().getFullYear();
  movieDescription.value = "";
  movieImage.value = "";
  movieFilmRating.value = "";
  movieGenres.value = [];
  isInTheaters.value = false;
  closeAddMovieModal();
};

const handleEditMovie = (movieId) => {
  console.log(movieId);
};

const handleDeleteMovie = async (movieId) => {
  console.log(movieId);
};

const addToWatchList = (movieId) => {
  if (!watchList.value.includes(movieId)) {
    const currentMovie = movies.value.find((movie) => {
      return movie.id === movieId;
    });
    watchList.value.push(currentMovie);
    console.log(watchList.value);
  } else {
    const removeMovieFromWatch = watchList.value.findIndex((id) => {
      return id === movieId;
    });
    return watchList.value.splice(removeMovieFromWatch, 1);
  }
};

const isMovieImageValid = computed(() => {
  return (
    movieImage.value.endsWith(".jpg") ||
    movieImage.value.endsWith(".jpeg") ||
    movieImage.value.endsWith(".png") ||
    movieImage.value.endsWith(".webp") ||
    movieImage.value.endsWith(".avif")
  );
});

const handleCreateMovie = async () => {
  if (
    !movieRegex.test(movieName.value) ||
    movieDescription === "" ||
    !isMovieImageValid.value ||
    movieGenres.value.length === 0
  ) {
    isInvalidForm.value = true;
    return;
  } else {
    isLoading.value = true;
    const movie = {
      name: movieName.value,
      year: movieYear.value,
      description: movieDescription.value,
      image: movieImage.value,
      filmRating: movieFilmRating.value,
      rating: 5,
      genres: movieGenres.value.join(", "),
      inTheaters: isInTheaters.value,
    };
    movies.value.push(movie);
    const { data, error } = await supabase // INSERT INTO movies (id, name, year, description, image, filmRating, rating, genres, inTheaters);
      .from("movies")
      .insert(movie)
      .select();
    if (error) {
      console.error(error);
    }
    isLoading.value = false;
    console.log(data);
    resetForm();
  }
};

// watch([movieName, movieYear, movieDescription, movieImage, movieFilmRating, movieGenres, isInTheaters, idle], (oldValues, newValues) => {
//   if(idle)
// });
</script>

<style lang="scss" scoped>
.movie-grid {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  padding: 0 0.5rem;
  justify-content: space-evenly;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity,
    filter 0.8s cubic-bezier(0.6, -0.28, 0.735, 0.045);
  filter: blur(10px);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  filter: blur(5px);
  transition: all 0.5s ease-in;
}
</style>
