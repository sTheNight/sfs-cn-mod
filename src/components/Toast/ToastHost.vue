<script lang="ts" setup>
import { toastText, toastVisiable, toastCount } from './useToast';
</script>
<template>
  <Teleport to="body">
    <div class="fixed pointer-events-none inset-0 z-999 select-none flex justify-center items-end">
      <Transition name="toast-fade" mode="out-in">
        <div v-if="toastVisiable" :key="toastCount" class="mb-16
                 bg-neutral-800/60 dark:bg-neutral-50/60
                 text-neutral-50 dark:text-neutral-900
                 pointer-events-auto
                 px-3 py-1.5 text-sm rounded-lg
                 backdrop-blur-lg
                 shadow-[0_2px_16px_rgba(0,0,0,0.15)]
                 dark:shadow-[0_2px_16px_rgba(255,255,255,0.15)]">
          {{ toastText }}
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all .2s cubic-bezier(0.25, 0.10, 0.22, 1.69);
}

.toast-fade-enter-from {
  opacity: 0;
  transform: rotate(-10deg) scale(.9);
}

.toast-fade-enter-to {
  opacity: 1;
}

.toast-fade-leave-from {
  opacity: 1;
}

.toast-fade-leave-to {
  opacity: 0;
  transform: scale(.9);
}
</style>
