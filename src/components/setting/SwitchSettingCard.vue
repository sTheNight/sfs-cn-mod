<script setup lang="ts">
import Switch from '../ui/switch/Switch.vue';
import BasicSettingCard from './BasicSettingCard.vue';
import type { BasicSettingCardProps } from './index.ts';

interface SwitchSettingCardEmits {
  (e: "onSwitch", value: boolean): void
}
interface SwitchSettingCardProps {
  modelValue: boolean
}

const emit = defineEmits<SwitchSettingCardEmits>()
const props = defineProps<BasicSettingCardProps & SwitchSettingCardProps>()

function toggle() {
  if (props.disabled) return
  emit('onSwitch', !props.modelValue)
}

function onSelect(payload: boolean) {
  if (props.disabled) return
  emit('onSwitch', payload)
}
</script>
<template>
  <BasicSettingCard @click="toggle" :title="props.title" :description="props.description"
    :show-undo="props.showUndo" :disabled="props.disabled">
    <Switch @click.stop :disabled="props.disabled" :model-value="props.modelValue"
      @update:model-value="onSelect"></Switch>
  </BasicSettingCard>
</template>
