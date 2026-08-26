<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';
import { computed, ref, useAttrs } from 'vue';

const settingStore = useSettingsStore()

defineOptions({
  inheritAttrs: false,
})

interface RippleProviderProps {
  tag?: keyof HTMLElementTagNameMap
  isDarkRipple?: boolean,
  showRipple?: boolean,
  followTheme?: boolean
}

withDefaults(defineProps<RippleProviderProps>(), {
  tag: 'span',
  isDarkRipple: false,
  showRipple: true,
  followTheme: true
})

const attrs = useAttrs()
const rootAttrs = computed(() => {
  const { class: _class, ...rest } = attrs
  return rest
})
// 判断是否存在 position
const positionClasses = new Set(['static', 'fixed', 'absolute', 'relative', 'sticky'])
const hasPositionClass = computed(() => {
  return normalizeClass(attrs.class).some((className) => {
    const utilityName = className.split(':').pop()?.replace(/^!/, '')
    return utilityName ? positionClasses.has(utilityName) : false
  })
})
// 由于 vue 可以将 class 以对象的形式传递，因此需要将组件 class 统一转成字符串数组便于后续处理
function normalizeClass(value: unknown): string[] {
  if (!value) return []
  if (typeof value === 'string') return value.split(/\s+/).filter(Boolean)
  if (Array.isArray(value)) return value.flatMap(normalizeClass)
  if (typeof value === 'object') {
    return Object.entries(value)
      .filter(([, enabled]) => enabled)
      .map(([className]) => className)
  }
  return []
}

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
  // 获取最先触发事件的对象
  const target = e.currentTarget as HTMLElement
  // 获取当前正在触发事件的对象
  const eventTarget = e.target
  // 获取离 eventTarget 最近的 ripple-provider
  const nearestRippleProvider = eventTarget instanceof Element
    ? eventTarget.closest('[data-ripple-provider]')
    : null
  // 判断最近的 ripple-provider 是否是最先触发事件的对象
  // 防止 ripple 多重触发
  if (nearestRippleProvider && nearestRippleProvider !== target) return

  const rect = target.getBoundingClientRect()
  const pointerX = e.clientX - rect.left
  const pointerY = e.clientY - rect.top
  const maxDistance = Math.max(
    Math.hypot(pointerX, pointerY),
    Math.hypot(rect.width - pointerX, pointerY),
    Math.hypot(pointerX, rect.height - pointerY),
    Math.hypot(rect.width - pointerX, rect.height - pointerY),
  )
  const size = Math.ceil(maxDistance * 2) + 2
  const x = pointerX - size / 2
  const y = pointerY - size / 2

  ripple.value.x = x
  ripple.value.y = y
  ripple.value.size = size
  rippleKey.value += 1
  isRippleShow.value = true
}

function hideRipple() {
  ripple.value.size = 0
  isRippleShow.value = false
}
</script>

<template>
  <component :is="tag" v-bind="rootAttrs" :class="[attrs.class, !hasPositionClass && 'relative', 'overflow-hidden']"
    data-ripple-provider @pointerdown="onPointerDownHandle" @pointerup="hideRipple" @pointercancel="hideRipple"
    @pointerout="hideRipple">
    <Transition name="ripple-fade">
      <span v-if="isRippleShow && settingStore.enableAnimations && settingStore.enableRippleEffect && showRipple"
        :key="rippleKey"
        :class="['absolute z-100 rounded-full pointer-events-none', isDarkRipple ? 'bg-black/20 ' : 'bg-white/30', isDarkRipple && followTheme ? 'dark:bg-white/30' : !isDarkRipple && followTheme ? 'dark:bg-black/20' : '']"
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
  transition: transform .3s;
}

.ripple-fade-enter-from {
  transform: scale(0);
}

.ripple-fade-enter-to {
  transform: scale(1);
}

.ripple-fade-leave-active {
  transition: opacity .3s, transform .3s;
}

.ripple-fade-leave-from {
  opacity: 1;
}

.ripple-fade-leave-to {
  opacity: 0;
  transform: scale(1);
}
</style>
