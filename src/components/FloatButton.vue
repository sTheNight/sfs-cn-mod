<script setup lang="ts">
import { type LucideIcon } from '@lucide/vue';
import RippleProvider from './RippleProvider.vue';

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
  <RippleProvider
    class="bg-blue-600 rounded-full active:scale-90 p-3 cursor-pointer shadow-[0_12px_32px_rgba(37,99,235,0.35)] transition-all duration-150 hover:shadow-[0_16px_40px_rgba(37,99,235,0.45)]"
    @click="$emit('onButtonClick')" :follow-theme="false">
    <component :is="icon" color="#fff" />
  </RippleProvider>
</template>
