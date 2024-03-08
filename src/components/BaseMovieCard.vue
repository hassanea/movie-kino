<template>
  <article class="movie">
    <div class="movie-header">
      <img
        :src="`${imageSource}${movie.image}`"
        :alt="movie.name"
        class="movie-img"
      />
      <StarIcon
        class="w-11 h-11 absolute top-6 translate-x-1 translate-y-1 right-6 inline-block"
        :class="starRatingClasses"
      />
      <span
        class="font-extrabold text-gray-600 absolute top-9 right-10 translate-x-1 translate-y-1 text-center"
        :class="ratingOutputClasses"
      >
        {{ ratingOutput }}
      </span>
    </div>
    <div class="movie-content">
      <h2 class="movie-title">{{ movie.name }}</h2>
      <p>{{ movie.year }}</p>

      <div class="movie-badge-grid">
        <base-movie-badge
          v-for="genre in movieGenres"
          :key="genre"
          :genre="genre"
        ></base-movie-badge>
      </div>
      <p class="movie-description">
        {{ movie.description }}
      </p>
      <p>
        <a
          :href="`${trailerSource}${movie.trailer}`"
          target="_blank"
          rel="noopener noreferrer"
          >{{ `Watch ${movie.name}'s trailer!` }}</a
        >
      </p>
      <p class="in-theaters">In Theaters?: {{ inTheatersOutput }}</p>
      <base-movie-rating
        :rating="movie.rating"
        :film="movie.filmRating"
      ></base-movie-rating>
      <button type="button" @click="addToWatchList(movie.id)">Favorite</button>
      <button type="button" @click="editMovie(movie.id)">Edit</button>
      <button type="button" @click="deleteMovie(movie.id)">Delete</button>
    </div>
  </article>
</template>

<script setup>
import { toRefs, computed } from "vue";
import BaseMovieBadge from "./BaseMovieBadge.vue";
import BaseMovieRating from "./BaseMovieRating.vue";
import { StarIcon } from "@heroicons/vue/24/solid";
const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const { movie } = toRefs(props);

const emit = defineEmits(["add-to-watchlist", "edit-movie", "delete-movie"]);

const imageSource = import.meta.env.VITE_APP_IMAGE_ENDPOINT;
const trailerSource = "https://www.youtube.com/watch?v=";

const starRatingClasses = computed(() => {
  return [
    { "text-yellow-400": movie.value.rating },
    { "text-gray-600": !movie.value.rating },
  ];
});

const addToWatchList = (movieId) => {
  emit("add-to-watchlist", movieId);
};

const editMovie = (movieId) => {
  console.log(`Editing movie #${movieId}`);
  emit("edit-movie", movieId);
};

const deleteMovie = (movieId) => {
  emit("delete-movie");
  console.log(`Deleting movie #${movieId}`);
};

const movieGenres = computed(() => {
  return movie.value.genres.split(", ");
});

const inTheatersOutput = computed(() => {
  return movie.value.inTheaters ? "Currently In Theaters" : "No";
});

const ratingOutput = computed(() => {
  return movie.value.rating ? movie.value.rating : "-";
});

const ratingOutputClasses = computed(() => {
  return { "text-white": !movie.value.rating };
});
</script>

<style lang="scss" scoped>
.movie {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-self: center;
  text-align: center;
  flex: 1 1 30%;
  padding: 1rem;
  margin: 2rem 0.75rem;
  overflow: auto;
}

.movie-header {
  text-align: center;
  width: 100%;
  height: 100%;
}

.movie-img {
  position: relative;
  bottom: -12px;
  left: 0;
  display: block;
  max-width: 100%;
  height: 30rem;
  margin: 0 auto;
  border-radius: 10px;
  object-fit: cover;
  cursor: pointer;
}

.movie-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  background: #eeedef;
  border-radius: 20px;
  padding: 1.75rem;
  margin: 0.75rem auto;
}

.movie-title {
  font:
    normal bolder 2rem / 1.5 "Lora",
    serif;
  letter-spacing: 0.2rem;
  margin-bottom: 0.8rem;
}

.movie-badge-grid {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
