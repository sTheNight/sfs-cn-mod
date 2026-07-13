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
  emit('onSwitch', !props.modelValue)
}

function onSelect(payload: boolean) {
  emit('onSwitch', payload)
}
</script>
<template>
  <BasicSettingCard @click="toggle" :title="props.title" :description="props.description">
    <Switch @click.stop :model-value="props.modelValue" @update:model-value="onSelect"></Switch>
  </BasicSettingCard>
</template>
