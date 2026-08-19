<script setup lang="ts">
interface SettingSectionProps {
  name: string
}
const props = defineProps<SettingSectionProps>()
</script>
<template>
  <div class="px-4 mt-4 flex flex-col gap-2">
    <h3 class="text-muted-foreground text-xs pl-3">{{ props.name }}</h3>
    <slot></slot>
  </div>
</template>
