<script setup lang="ts">
</script>

<template>
  <div class="bg overflow-hidden w-full h-full fixed top-0 left-0 box-border pointer-events-none" aria-hidden="true">
  </div>
</template>

<style lang="css" scoped>
div.bg {
  z-index: -1;
  background-image:
    linear-gradient(to right, transparent 29px, var(--border) 30px),
    linear-gradient(to bottom, transparent 29px, var(--border) 30px);
  background-size: 30px 30px;
}
</style>
