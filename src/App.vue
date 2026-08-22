<script setup lang="ts">
import ToastHost from './components/Toast/ToastHost.vue';

</script>
<template>
  <RouterView />
  <ToastHost />
</template>
<style>
.scrollbar-hidden {
  scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
</style>
