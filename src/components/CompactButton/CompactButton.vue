<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Comment, Fragment, Text, computed, isVNode, useSlots, type HTMLAttributes } from 'vue'
import RippleProvider from '../RippleProvider.vue'

export type CompactButtonSize = 'xs' | 'sm' | 'md' | 'lg'

interface CompactButtonProps {
  size?: CompactButtonSize
  backdrop?: boolean
  class?: HTMLAttributes['class']
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CompactButtonProps>(), {
  size: 'md',
  backdrop: false,
})

const slots = useSlots()

const sizeClasses: Record<CompactButtonSize, string> = {
  xs: 'h-5 min-w-5 gap-1 px-1.5 text-[11px] [&_svg:not([class*="size-"])]:size-3',
  sm: 'h-7 min-w-7 gap-1.5 px-2.5 text-xs [&_svg:not([class*="size-"])]:size-3.5',
  md: 'h-8 min-w-8 gap-1.5 px-3 text-xs [&_svg:not([class*="size-"])]:size-4',
  lg: 'h-9 min-w-9 gap-2 px-3.5 text-sm [&_svg:not([class*="size-"])]:size-4.5',
}

function vnodeHasText(node: unknown): boolean {
  if (typeof node === 'string') return node.trim().length > 0
  if (Array.isArray(node)) return node.some(vnodeHasText)
  if (!isVNode(node)) return false
  if (node.type === Comment) return false
  if (node.type === Text) return typeof node.children === 'string' && node.children.trim().length > 0
  if (node.type === Fragment) return vnodeHasText(node.children)
  if (typeof node.children === 'string') return node.children.trim().length > 0
  return vnodeHasText(node.children)
}

const hasText = computed(() => slots.default?.().some(vnodeHasText) ?? false)
</script>

<template>
  <RippleProvider v-bind="$attrs" tag="button" :is-dark-ripple="true" :class="cn(
    'inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full border font-medium outline-none transition-all duration-150 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
    props.backdrop
      ? 'border-white/15 bg-black/10 text-white backdrop-blur-lg hover:bg-white/5 hover:text-white'
      : 'border-border bg-background text-foreground shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
    sizeClasses[props.size],
    !hasText && 'w-[--compact-button-size] px-0',
    props.class,
  )" :style="{ '--compact-button-size': ({ xs: '1.25rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' })[props.size] }"
    type="button">
    <slot />
  </RippleProvider>
</template>
