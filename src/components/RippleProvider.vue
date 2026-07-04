<script setup lang="ts">
import { ref } from 'vue';

interface RippleProviderProps {
  tag?: keyof HTMLElementTagNameMap
  isdarkripple?: boolean
}

withDefaults(defineProps<RippleProviderProps>(), {
  tag: 'span',
  isdarkripple: false,
})

interface Ripple {
  x: number
  y: number
  size: number
}

const isRippleShow = ref(false)
const rippleKey = ref(0)
const ripple = ref<Ripple>({
  x: 0,
  y: 0,
  size: 0,
})

function onPointerDownHandle(e: PointerEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 2
  const x = e.clientX - rect.left - size / 2
  const y = e.clientY - rect.top - size / 2

  ripple.value.x = x
  ripple.value.y = y
  ripple.value.size = size
  rippleKey.value += 1
  isRippleShow.value = true
}

function hideRipple() {
  isRippleShow.value = false
}
</script>

<template>
  <component :is="tag" class="relative overflow-hidden" @pointerdown="onPointerDownHandle" @pointerup="hideRipple"
    @pointercancel="hideRipple" @pointerout="hideRipple">
    <Transition name="ripple-fade">
      <span v-if="isRippleShow" :key="rippleKey"
        :class="['absolute z-100 rounded-full pointer-events-none', isdarkripple ? 'bg-black/20' : 'bg-white/30']"
        :style="{
          left: `${ripple.x}px`,
          top: `${ripple.y}px`,
          width: `${ripple.size}px`,
          height: `${ripple.size}px`
        }"></span>
    </Transition>
    <slot></slot>
  </component>
</template>

<style lang="css" scoped>
.ripple-fade-enter-active {
  transition: transform .5s;
}

.ripple-fade-enter-from {
  transform: scale(0);
}

.ripple-fade-enter-to {
  transform: scale(1);
}

.ripple-fade-leave-active {
  transition: opacity .5s, transform .5s;
}

.ripple-fade-leave-from {
  opacity: 1;
}

.ripple-fade-leave-to {
  opacity: 0;
  transform: scale(1);
}
</style>
