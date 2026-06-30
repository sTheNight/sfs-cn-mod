<script setup lang="ts">
import { type LucideIcon } from '@lucide/vue';

export interface FloatButtonProps {
  icon: LucideIcon
}
export interface FloatButtonEvents {
  (e: "onButtonClick"): void
}
defineProps<FloatButtonProps>()
defineEmits<FloatButtonEvents>()
</script>
<template>
  <div
    class="bg-blue-600 rounded-full scale-90 sm:scale-100 p-4 cursor-pointer shadow-[0_12px_32px_rgba(37,99,235,0.35)] transition-all duration-150 hover:shadow-[0_16px_40px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 active:scale-85 sm:active:scale-95"
    @click="$emit('onButtonClick')">
    <component :is="icon" color="#fff" />
  </div>
</template>
