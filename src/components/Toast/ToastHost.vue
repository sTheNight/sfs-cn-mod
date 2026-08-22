<script lang="ts" setup>
import { toastText, toastVisiable, toastCount } from './useToast';

</script>
<template>
  <Teleport to="body">
    <div class="fixed pointer-events-none inset-0 z-999 select-none flex justify-center items-end">
      <Transition name="toast-fade" mode="out-in">
        <div v-if="toastVisiable" :key="toastCount" class="mb-16
                 bg-neutral-800/60 dark:bg-neutral-50/60
                 text-white dark:text-black
                 pointer-events-auto
                 px-3 py-1.5 text-sm rounded-lg
                 backdrop-blur-lg">
          {{ toastText }}
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition:
    opacity .2s,
    transform .2s;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: scale(.9);
}

.toast-fade-enter-to,
.toast-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
