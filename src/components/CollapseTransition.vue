<script setup lang="ts">
interface CollapseTransitionProps {
  show: boolean,
  scale?: boolean,
  blur?: boolean
}
const props = withDefaults(defineProps<CollapseTransitionProps>(), {
  scale: false,
  blur: false
})
</script>

<template>
  <Transition name="collapse-transition">
    <div v-if="show" class="collapse-transition-grid" :class="{
      'collapse-transition-scale': props.scale,
      'collapse-transition-blur': props.blur
    }">
      <div class="min-h-0 overflow-hidden">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.collapse-transition-grid {
  display: grid;
  grid-template-rows: 1fr;
  transform-origin: top;
}

.collapse-transition-enter-active,
.collapse-transition-leave-active {
  transition: all .3s;
}

.collapse-transition-enter-from,
.collapse-transition-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

.collapse-transition-scale.collapse-transition-enter-from,
.collapse-transition-scale.collapse-transition-leave-to {
  transform: scale(.9);
}

.collapse-transition-blur.collapse-transition-enter-from,
.collapse-transition-blur.collapse-transition-leave-to {
  filter: blur(8px);
}
</style>
