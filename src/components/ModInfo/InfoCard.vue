<script setup lang="ts">
import type { LucideIcon } from '@lucide/vue';

export interface InfoCardProps {
  icon: LucideIcon,
  title: string
}

const props = defineProps<InfoCardProps>()
</script>
<template>
  <div class="box-border border rounded-sm p-2.5 gap-3 flex items-start">
    <div class=" box-border border rounded-sm p-1 bg-gray-100">
      <component :is="props.icon" :size="14" />
    </div>
    <div class="flex flex-col">
      <div class="text-[10px]">
        {{ props.title }}
      </div>
      <slot />
    </div>
  </div>
</template>
