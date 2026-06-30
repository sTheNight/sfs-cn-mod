<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref, useTemplateRef } from 'vue'

const cardRef = useTemplateRef<HTMLElement>('card')
const hasEnteredViewport = ref(false)

const { stop } = useIntersectionObserver(
  cardRef,
  ([entry]) => {
    if (!entry?.isIntersecting)
      return

    hasEnteredViewport.value = true
    stop()
  }
)
</script>

<template>
  <div ref="card" class="fade-in-card" :class="{ 'fade-in-card--visible': hasEnteredViewport }">
    <slot />
  </div>
</template>

<style scoped>
.fade-in-card {
  display: grid;
  min-width: 0;
  opacity: 0;
  transform: translateY(8px);
  /* filter: blur(8px); */
  transition: all .3s;
}

.fade-in-card--visible {
  opacity: 1;
  /* filter: blur(0); */
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
