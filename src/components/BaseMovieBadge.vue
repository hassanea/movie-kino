<template>
  <span
    class="m-2 inline-block h-auto w-auto cursor-text rounded-2xl p-2 font-sans text-base italic leading-normal text-light md:m-3 md:text-lg"
    :class="movieBadgeClasses"
  >
    {{ genre }}
  </span>
</template>

<script setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  genre: {
    type: String,
    required: true,
  },
});

const { genre } = toRefs(props);

const movieBadgeClasses = computed(() => {
  return {
    action: genre.value === 'Action',
    advent: genre.value === 'Adventure',
    anime: genre.value === 'Animation',
    bio: genre.value === 'Biography',
    bolly: genre.value === 'Bollywood',
    com: genre.value === 'Comedy',
    crime: genre.value === 'Crime',
    doc: genre.value === 'Documentary',
    drama: genre.value === 'Drama',
    fam: genre.value === 'Family',
    fantasy: genre.value === 'Fantasy',
    fore: genre.value === 'Foreign',
    hist: genre.value === 'History',
    horror: genre.value === 'Horror',
    music: genre.value === 'Music',
    myst: genre.value === 'Mystery',
    rom: genre.value === 'Romance',
    'sci-fi': genre.value === 'Sci-Fi',
    short: genre.value === 'Short',
    silent: genre.value === 'Silent',
    sport: genre.value === 'Sport',
    thrill: genre.value === 'Thriller',
    war: genre.value === 'War',
    west: genre.value === 'Western',
  };
});
</script>

<style scoped>
.action {
  background: #0000af;
}
.advent {
  background: #164742;
}
.anime {
  background: #771279;
}
.bio {
  background: #233d4d;
}
.bolly {
  background: #75400e;
}
.com {
  background: #3e2f5b;
}
.crime {
  background: #212187;
  border: 3px inset #e13a59;
}
.doc {
  background: #a0522d;
}
.drama {
  background: #300330;
}
.fam {
  background: #902650;
}
.fantasy {
  background: linear-gradient(
    to top,
    #505285 0%,
    #585e92 12%,
    #65689f 25%,
    #7474b0 37%,
    #7e7ebb 50%,
    #8389c7 62%,
    #9795d4 75%,
    #a2a1dc 87%,
    #b5aee4 100%
  );
}
.fore {
  background: linear-gradient(#0058a0 76%, #9d9d9d 12%);
}
.hist {
  background: linear-gradient(#f00000 30%, #fff 25%, #0000ff 45%);
}
.horror {
  background: linear-gradient(#333, #da0a30);
}
.music {
  background: linear-gradient(#444, #000, #333, #999);
}
.myst {
  background: linear-gradient(to right, #171717, #103d93);
}
.rom {
  background: #854265;
}
.sci-fi {
  background: #3cd070;
}
.short {
  background: #34495e;
}
.silent {
  background: #224389;
}
.sport {
  background: linear-gradient(-180deg, #191919, #00610d);
}
.thrill {
  background: linear-gradient(90deg, #893d61 0%, #575766 50%, #2d5e71 100%);
}
.war {
  background: #41533b;
}
.west {
  background: linear-gradient(250deg, #b9a07e 20%, #814141 60%);
}
</style>
