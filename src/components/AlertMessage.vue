<script setup lang="ts">
import { AlertCircle, CheckCircle2, Info, TriangleAlert, type LucideIcon } from '@lucide/vue';
import { computed } from 'vue';

export type AlertType = "info" | "warning" | "error" | "success"

export interface AlertMessageProps {
  type?: AlertType
}

type AlertStyle = {
  icon: LucideIcon
  wrapperClass: string
  iconClass: string
}

const props = withDefaults(defineProps<AlertMessageProps>(), {
  type: "info",
})

const alertStyleMap: Record<AlertType, AlertStyle> = {
  info: {
    icon: Info,
    wrapperClass: "border-blue-100 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
    iconClass: "border-blue-100 bg-white text-blue-600 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  },
  warning: {
    icon: TriangleAlert,
    wrapperClass: "border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    iconClass: "border-amber-100 bg-white text-amber-600 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  },
  error: {
    icon: AlertCircle,
    wrapperClass: "border-red-100 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    iconClass: "border-red-100 bg-white text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
  },
  success: {
    icon: CheckCircle2,
    wrapperClass: "border-green-100 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
    iconClass: "border-green-100 bg-white text-green-600 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
  },
}

const currentStyle = computed(() => alertStyleMap[props.type])
</script>
<template>
  <div class="grid w-full grid-cols-[auto_minmax(0,1fr)] gap-3 overflow-hidden rounded-2xl border p-4 shadow-xs"
    :class="currentStyle.wrapperClass">
    <div class="flex size-9 shrink-0 items-center justify-center self-start rounded-lg border"
      :class="currentStyle.iconClass">
      <component :is="currentStyle.icon" :size="18" />
    </div>
    <div class="min-w-0 flex flex-wrap items-center text-sm leading-6">
      <slot />
    </div>
  </div>
</template>
