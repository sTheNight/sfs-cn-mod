<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import Slider from '../ui/slider/Slider.vue'
import BasicSettingCard from './BasicSettingCard.vue'
import type { BasicSettingCardProps } from './index.ts'

interface SliderSettingCardProps extends BasicSettingCardProps {
  modelValue: number
  min?: number
  max?: number
  step?: number
  sliderClass?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<SliderSettingCardProps>(), {
  min: 0,
  max: 100,
  step: 1,
  sliderClass: 'w-32 sm:w-40',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const sliderValue = computed<number[]>({
  get: () => [props.modelValue],
  set: ([value]) => emit('update:modelValue', value ?? props.min),
})
</script>

<template>
  <BasicSettingCard :title="props.title" :description="props.description" :show-undo="props.showUndo"
    :disabled="props.disabled">
    <Slider v-model="sliderValue" :min="props.min" :max="props.max" :step="props.step"
      :disabled="props.disabled" :class="props.sliderClass" />
  </BasicSettingCard>
</template>
