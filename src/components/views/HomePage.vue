<template>
  <section
    class="relative flex h-screen w-full flex-col flex-nowrap items-center justify-center bg-[url('https://images.eahassan.com/movie/theater-showcase-mobile.jpg')] bg-cover bg-scroll bg-clip-border bg-center bg-no-repeat bg-origin-border mix-blend-hard-light before:absolute before:inset-0 before:h-full before:w-full before:bg-blue-1000/25 before:content-[''] md:bg-[url('https://images.eahassan.com/movie/theater-showcase-tablet.jpg')] xl:bg-[url('https://images.eahassan.com/movie/theater-showcase.jpg')] xl:bg-fixed"
  >
    <div class="z-10 translate-y-[9rem] text-center md:translate-y-0">
      <h1
        class="mb-3 line-clamp-2 bg-base-grad bg-clip-text text-center font-sans text-3xl font-extrabold not-italic leading-normal tracking-wide text-transparent md:text-4xl xl:text-6xl"
      >
        {{ heading }}
      </h1>
      <p
        class="my-2 text-wrap text-center font-sans text-xl font-bold leading-relaxed text-red-800 md:text-[1.625rem]"
      >
        {{ description }}
      </p>
      <router-link
        :to="url"
        class="bordered-base-grad my-4 inline-block h-auto w-auto rounded-xl bg-base-grad p-4 align-middle font-sans text-xl font-medium leading-normal text-light drop-shadow-lg transition-colors hover:border-4 hover:border-solid hover:bg-clip-text hover:text-transparent focus:border-4 focus:border-solid focus:border-yellow-400 focus:outline-none"
      >
        {{ text }}
      </router-link>
    </div>
  </section>
</template>

<script setup>
import homeData from '../../homeData.json';

const {
  heading,
  description,
  link: { text, url },
} = homeData;
</script>

<style scoped>
.bordered-base-grad {
  border-image: linear-gradient(#243949 25%, #517fa4 75%) 10;
}
</style>
