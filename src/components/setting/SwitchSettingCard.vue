<script setup lang="ts">
import Switch from '../ui/switch/Switch.vue';
import BasicSettingCard from './BasicSettingCard.vue';
import type { BasicSettingCardProps } from './index.ts';

interface SwitchSettingCardEmits {
  (e: "onSwitch", value: boolean): void
}
const emit = defineEmits<SwitchSettingCardEmits>()

const props = defineProps<BasicSettingCardProps & { modelValue: boolean }>()

function onSelect(payload: boolean) {
  emit('onSwitch', payload)
}
</script>
<template>
  <BasicSettingCard :title="props.title" :description="props.description">
    <Switch :model-value="props.modelValue" @update:model-value="onSelect"></Switch>
  </BasicSettingCard>
</template>
