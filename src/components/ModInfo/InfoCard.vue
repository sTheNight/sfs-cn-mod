<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import type { LucideIcon } from '@lucide/vue';

export interface InfoCardProps {
  icon: LucideIcon,
  title: string
}

const props = defineProps<InfoCardProps>()
const setting = useSettingsStore()
</script>
<template>
  <div class="bg-card-surface box-border border rounded-sm p-2.5 gap-3 flex items-start"
    :class="setting.cardBlurEffect ? 'backdrop-blur-lg' : ''">
    <div class=" box-border border rounded-sm p-1 bg-muted">
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
