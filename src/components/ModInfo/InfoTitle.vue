<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue';

export interface InfoTitleProps {
  icon: LucideIcon,
  title: string
}

const props = defineProps<InfoTitleProps>()
</script>
<template>
  <div class="flex items-center gap-2 font-bold text-[16px]">
    <div class="border box-border p-1 bg-gray-100 rounded-sm">
      <component :is="props.icon" :size="14" />
    </div>
    {{ props.title }}
  </div>
</template>
