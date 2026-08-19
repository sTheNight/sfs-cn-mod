<script setup lang="ts">
import { Undo2 } from '@lucide/vue';
import RippleProvider from '../RippleProvider.vue';
import type { BasicSettingCardProps } from './index.ts';
const { title, description, showUndo = false } = defineProps<BasicSettingCardProps>()
</script>
<template>
  <ripple-provider tag="div" :is-dark-ripple="true"
    class="border rounded-xl box-border py-3 px-4 transition-all duration-200 dark:hover:bg-input/50 hover:bg-accent text-sm">
    <div class="flex items-center justify-between gap-3">
      <div class="min-w-0 flex-1">
        <h3 class="flex items-center gap-1">
          {{ title }}
          <undo2 v-if="showUndo" class="cursor-pointer" :size="12" @click.prevent.stop />
        </h3>
        <p v-if="description" class="text-muted-foreground text-xs wrap-break-word">
          {{ description }}
        </p>
      </div>
      <div class="shrink-0 flex items-center">
        <slot></slot>
      </div>
    </div>
  </ripple-provider>
</template>
