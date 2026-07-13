<script setup lang="ts">
import { computed, useSlots } from 'vue'

interface BasicCardProps {
  title: string
}

const { title } = defineProps<BasicCardProps>()
const slots = useSlots()
const hasTag = computed(() => Boolean(slots.tag))
</script>
<template>
  <div class="border rounded-2xl p-4 shadow-xs transition-all duration-150">
    <div class="flex items-center gap-3">
      <div v-if="hasTag" class="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted">
        <slot name="tag"></slot>
      </div>
      <h2 class="font-bold">{{ title }}</h2>
    </div>
    <div class="text-sm mt-4 text-muted-foreground">
      <slot></slot>
    </div>
  </div>
</template>
