<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue';
import RippleProvider from './RippleProvider.vue';
interface RouteButtonProps {
  isChecked: boolean,
  text: string,
  icon: LucideIcon
}
interface RouteButtonEmits {
  (e: 'onRouteButtonClick'): void
}
defineProps<RouteButtonProps>()
defineEmits<RouteButtonEmits>()
</script>
<template>
  <RippleProvider tag="div" is-dark-ripple
    class="p-2.5 cursor-pointer active:scale-90 select-none rounded-full flex items-center text-accent-foreground transition-all"
    :class="{ 'bg-blue-50 text-blue-500': isChecked }" @click="$emit('onRouteButtonClick')">
    <Info :size="16" />
    <component :is="icon" :size="16" />
    <Transition name="toggle-fade">
      <span v-if="isChecked" class="toggle-card">
        <span class="toggle-text text-xs">
          {{ text }}
        </span>
      </span>
    </Transition>
  </RippleProvider>
</template>
<style lang="css" scoped>
.toggle-card {
  display: grid;
  grid-template-columns: 1fr;
  opacity: 1;
  overflow: hidden;
}

.toggle-text {
  min-width: 0;
  margin-inline: 0.25rem;

  white-space: nowrap;
  overflow: hidden;
}

.toggle-fade-enter-active,
.toggle-fade-leave-active {
  transition:
    grid-template-columns 0.2s ease,
    opacity 0.2s ease;
}

.toggle-fade-enter-from,
.toggle-fade-leave-to {
  grid-template-columns: 0fr;
  opacity: 0;
}
</style>
