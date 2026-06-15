<script setup lang="ts">
export interface TutorSetupProps {
  tag: string,
  title: string
}
const props = defineProps<TutorSetupProps>()
</script>
<template>
  <div class="border rounded-2xl p-4 shadow-xs w-full box-border">
    <div class="flex items-center gap-3 mb-4">
      <div class="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-gray-100">
        {{ props.tag }}
      </div>
      <h2 class="font-bold">{{ props.title }}</h2>
    </div>
    <div class="text-sm text-gray-600">
      <slot />
    </div>
  </div>
</template>
