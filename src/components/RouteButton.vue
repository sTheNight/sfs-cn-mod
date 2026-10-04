<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue';
import { useElementSize } from '@vueuse/core';
import { useTemplateRef } from 'vue';
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

const textElement = useTemplateRef('text-element')
const { width: textWidth } = useElementSize(textElement, undefined, { box: 'border-box' })
</script>
<template>
  <RippleProvider tag="button" type="button" is-dark-ripple :aria-label="text"
    :aria-current="isChecked ? 'page' : undefined"
    class="px-3 py-2 cursor-pointer select-none rounded-full flex shrink-0 items-center text-accent-foreground transition-[background-color,color,scale] duration-[180ms,180ms,160ms] ease-[ease,ease,cubic-bezier(0.22,1,0.36,1)] active:scale-96 motion-reduce:transition-none motion-reduce:active:scale-100"
    :class="{ 'bg-blue-50 text-blue-600': isChecked }" @click="$emit('onRouteButtonClick')">
    <component :is="icon" :size="16" class="shrink-0" aria-hidden="true" />
    <span
      class="flex-none overflow-hidden transition-[width] duration-260 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      :style="{ width: `${isChecked ? textWidth : 0}px` }" aria-hidden="true">
      <span ref="text-element"
        class="block w-max pl-2 text-sm font-medium whitespace-nowrap transition-[opacity,translate] duration-[180ms,260ms] ease-[ease,cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        :class="isChecked ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'">
        {{ text }}
      </span>
    </span>
  </RippleProvider>
</template>
