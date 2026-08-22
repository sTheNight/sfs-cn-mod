<script setup lang="ts">
import { Undo2 } from '@lucide/vue';
import RippleProvider from '../RippleProvider.vue';
import type { BasicSettingCardProps } from './index.ts';

interface BasicSettingCardEmits {
  (event: 'undo'): void
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BasicSettingCardProps>(), {
  showUndo: false,
  disabled: false,
  isExperiment: false
})
const emit = defineEmits<BasicSettingCardEmits>()
</script>
<template>
  <div :class="props.disabled && 'cursor-not-allowed'">
    <ripple-provider v-bind="$attrs" tag="div" :is-dark-ripple="true" :inert="props.disabled || undefined"
      :aria-disabled="props.disabled || undefined" :class="[
        'border rounded-xl box-border py-3 px-4 transition-all duration-200 text-sm relative',
        props.disabled ? 'pointer-events-none select-none opacity-50' : 'hover:bg-accent/70 dark:hover:bg-input/50',
      ]">
      <div v-if="isExperiment" class="absolute inset-0 -z-1">
        <div class="
              absolute right-0 w-125 h-37.5
              translate-x-1/2 -translate-y-1/2
              bg-radial
            from-blue-400/20
            via-blue-400/10
              to-transparent
              " />
        <p class="absolute text-blue-500/30 mr-2 mt-1 select-none right-0 font-mono">Experiment</p>
      </div>
      <div class="flex items-center justify-between gap-3">
        <div class="min-w-0 flex-1">
          <h3 class="flex items-center gap-1">
            {{ props.title }}
            <button v-if="props.showUndo" type="button"
              class="cursor-pointer rounded-sm text-muted-foreground hover:text-foreground" aria-label="恢复默认值"
              title="恢复默认值" @click.prevent.stop="emit('undo')">
              <undo2 :size="12" />
            </button>
          </h3>
          <p v-if="props.description" class="text-muted-foreground text-xs wrap-break-word">
            {{ props.description }}
          </p>
        </div>
        <div class="shrink-0 flex items-center">
          <slot></slot>
        </div>
      </div>
    </ripple-provider>
  </div>
</template>
