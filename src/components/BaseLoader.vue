<template>
  <div>
    <span
      role="status"
      class="loader inline-block h-14 w-14 rounded-full border-r-4 border-t-4 border-solid border-r-transparent border-t-white"
    >
    </span>
  </div>
</template>

<style scoped>
.loader {
  animation: rotation 1.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
