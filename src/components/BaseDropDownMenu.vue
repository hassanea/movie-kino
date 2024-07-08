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
      class="inline-block w-auto align-middle h-15 p-3 rounded-xl mx-auto bg-emerald-500 text-black cursor-pointer"
    >
      <slot name="btn"></slot>
      <span class="mr-1">
        <ChevronUpIcon v-if="toggle" class="h-6 w-6 text-gray-500" />
        <ChevronDownIcon v-else class="h-6 w-6 text-gray-500" />
      </span>
    </button>
    <ul
      class="w-full h-auto my-3 mx-1 flex flex-col text-center bg-gray-500 rounded"
      v-if="toggle"
    >
      <template v-if="links.length > 0">
        <li
          class="block font-bold my-1 mx-1 list-none text-ellipsis"
          v-for="link in links"
          :key="link.id"
        >
          <router-link :to="`/movies/${link.id}`" class="block">{{
            link.name
          }}</router-link>
        </li>
      </template>
      <li class="block font-bold my-1 mx-1 list-none text-ellipsis" v-else>
        No movies yet!
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  links: {
    type: Array,
    required: false,
  },
});

const { links } = toRefs(props);

const emit = defineEmits([]);

const toggle = ref(false);

const countDown = setTimeout(() => {
  closeDropDownMenu();
}, 2000);

const closeDropDownMenu = () => {
  toggle.value = false;
};

const toggleDropDownMenu = () => {
  toggle.value = !toggle.value;
  clearTimeout(countDown);
};

const closeDropDownMenuOnCount = () => {
  countDown;
};
</script>
