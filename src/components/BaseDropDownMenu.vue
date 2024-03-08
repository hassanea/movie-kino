<template>
  <div
    class="relative"
    @click.self="closeDropDownMenu"
    @keydown.esc="closeDropDownMenu"
  >
    <button
      type="button"
      @click="toggleDropDownMenu"
      @mouseover="toggleDropDownMenu"
      @mouseleave="closeDropDownMenuOnCount"
      class="inline-block w-20 align-middle h-12 rounded-sm bg-emerald-500 text-black cursor-pointer"
    >
      <slot name="btn"></slot>
    </button>
    <template v-if="links">
      <ul class="dropdown-nav" v-if="toggle">
        <li class="dropdown-nav-item" v-for="link in links" :key="link.id">
          <a :href="link.to">{{ link.name }}</a>
        </li>
      </ul>
    </template>
    <ul class="dropdown-nav" v-if="toggle">
      <template v-if="movies.length > 0">
        <li class="dropdown-nav-item" v-for="movie in movies" :key="movie.id">
          {{ movie.name }}
        </li>
      </template>
      <li v-else>No movies yet!</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";

const props = defineProps({
  links: {
    type: Array,
    required: false,
  },
  movies: {
    types: Array,
    required: false,
  },
});

const { links } = toRefs(props);

const emit = defineEmits([]);

const toggle = ref(false);

const toggleDropDownMenu = () => {
  toggle.value = !toggle.value;
};

const closeDropDownMenu = () => {
  toggle.value = false;
};

const closeDropDownMenuOnCount = () => {
  setTimeout(() => {
    closeDropDownMenu();
  }, 2000);
};
</script>
