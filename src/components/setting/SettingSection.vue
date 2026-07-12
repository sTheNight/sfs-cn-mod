<script setup lang="ts">
interface SettingSectionProps {
  name: string
}
defineProps<SettingSectionProps>()
</script>
<template>
  <div class="px-4 mt-4">
    <h3 class="text-muted-foreground text-xs pl-3 pb-2">{{ name }}</h3>
    <slot></slot>
  </div>
</template>
