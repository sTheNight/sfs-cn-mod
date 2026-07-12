<script setup lang="ts">
import RippleProvider from '../RippleProvider.vue';
import type { BasicSettingCardProps } from './index.ts';
const props = defineProps<BasicSettingCardProps>()
</script>
<template>
  <ripple-provider tag="div" :is-dark-ripple="true"
    class="border rounded-xl box-border py-3 px-4 transition-all duration-200 dark:hover:bg-input/50 hover:bg-accent text-sm">
    <div class="flex items-center justify-between gap-3">
      <div class="min-w-0 flex-1">
        <h2>{{ props.title }}</h2>
        <p v-if="props.description" class="text-muted-foreground text-xs wrap-break-word">
          {{ props.description }}
        </p>
      </div>
      <div class="shrink-0 flex items-center">
        <slot></slot>
      </div>
    </div>
  </ripple-provider>
</template>
