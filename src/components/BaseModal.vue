<template>
  <div
    v-if="show"
    class="w-full h-full fixed bg-blue-800/30 top-0 left-0 z-40 right-0 bottom-0"
    @click.self="handleClose"
    @keydown.esc="handleClose"
  >
    <div
      role="dialog"
      :aria-modal="isActiveModalState"
      :aria-labelledby="title"
      :aria-describedby="describe"
      :tabindex="setModalTabIndex"
      class="w-50 h-auto fixed top-5 left-5 z-50 content-position bg-slate-200 p-8 flex flex-col flex-nowrap rounded"
    >
      <button
        type="button"
        aria-label="Close"
        @click="handleClose"
        @keydown.enter="handleClose"
        @keydown.space="handleClose"
        class="inline-block w-12 h-12 absolute top-1 right-0 bg-transparent cursor-pointer border-none font-bold"
      >
        &times;
      </button>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: false,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const { title, describe, show } = toRefs(props);

const emit = defineEmits(["close-modal"]);

const handleClose = () => {
  emit("close-modal");
};

const isActiveModalState = computed(() => {
  return show.value ? true : false;
});

const setModalTabIndex = computed(() => {
  return show.value ? 0 : -1;
});
</script>

<style scoped>
.content-position {
  top: 50vh;
  left: 30%;
}
</style>
