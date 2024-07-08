<template>
  <div
    class="relative flex h-screen w-full flex-col flex-nowrap items-center justify-center bg-[url('https://images.eahassan.com/movie/theater-showcase-mobile.jpg')] bg-cover bg-scroll bg-clip-border bg-center bg-no-repeat bg-origin-border mix-blend-hard-light before:absolute before:inset-0 before:h-full before:w-full before:bg-blue-1000/25 before:content-[''] md:bg-[url('https://images.eahassan.com/movie/theater-showcase-tablet.jpg')] xl:bg-[url('https://images.eahassan.com/movie/theater-showcase.jpg')] xl:bg-fixed"
  >
    <div class="z-10 translate-y-[9rem] text-center md:translate-y-0">
      <h1
        class="mb-4 line-clamp-2 bg-base-grad bg-clip-text text-center text-3xl font-extrabold not-italic leading-relaxed tracking-wide text-transparent md:text-5xl xl:text-6xl"
      >
        Hello Movie Lovers!
      </h1>
      <p
        class="my-3 text-wrap text-center font-sans text-xl font-bold leading-relaxed text-red-800 md:text-[1.625rem]"
      >
        Join us in reviewing your movie favorites.
      </p>
      <router-link
        to="/movies"
        class="bordered-base-grad my-4 inline-block h-auto w-auto rounded-xl bg-base-grad p-4 align-middle font-sans text-2xl font-medium leading-normal text-light drop-shadow-lg transition-colors hover:border-4 hover:border-solid hover:bg-clip-text hover:text-transparent focus:border-4 focus:border-solid focus:border-yellow-400 focus:outline-none"
      >
        Explore Movies
      </router-link>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.bordered-base-grad {
  border-image: linear-gradient(#243949 25%, #517fa4 75%) 10;
}
</style>
