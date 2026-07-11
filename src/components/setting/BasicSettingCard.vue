<script setup lang="ts">
import RippleProvider from '../RippleProvider.vue';

</script>
<template>
  <ripple-provider tag="div" :is-dark-ripple="true"
    class="border rounded-2xl box-border py-3 px-4 transition-all duration-200 dark:hover:bg-input/50 hover:bg-accent text-sm">
    <slot></slot>
  </ripple-provider>
</template>
