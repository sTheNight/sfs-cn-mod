<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { useResettableSetting } from '@/composables/useResettableSetting'
import Slider from '../ui/slider/Slider.vue'
import BasicSettingCard from './BasicSettingCard.vue'
import type { ResettableSettingCardProps } from './index.ts'

type SliderSettingCardProps = ResettableSettingCardProps<number> & {
  modelValue: number
  min?: number
  max?: number
  step?: number
  sliderClass?: HTMLAttributes['class']
}

interface SliderSettingCardEmits {
  (event: 'update:modelValue', value: number): void
}

const emit = defineEmits<SliderSettingCardEmits>()
const props = withDefaults(defineProps<SliderSettingCardProps>(), {
  min: 0,
  max: 100,
  step: 1,
  sliderClass: 'w-32 sm:w-40',
})

function updateValue(value: number) {
  if (!props.disabled) emit('update:modelValue', value)
}

const { canUndo, undo } = useResettableSetting(
  () => props.modelValue,
  () => props.defaultValue,
  updateValue,
)

const sliderValue = computed<number[]>({
  get: () => [props.modelValue],
  set: ([value]) => updateValue(value ?? props.min),
})
</script>

<template>
  <BasicSettingCard :title="props.title" :description="props.description" :show-undo="canUndo"
    :disabled="props.disabled" @undo="undo">
    <Slider v-model="sliderValue" :min="props.min" :max="props.max" :step="props.step" :disabled="props.disabled"
      :class="props.sliderClass" />
  </BasicSettingCard>
</template>
