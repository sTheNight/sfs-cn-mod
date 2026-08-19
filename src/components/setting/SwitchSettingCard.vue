<script setup lang="ts">
import Switch from '../ui/switch/Switch.vue';
import BasicSettingCard from './BasicSettingCard.vue';
import type { BasicSettingCardProps } from './index.ts';

type SwitchSettingCardProps = Omit<BasicSettingCardProps, 'showUndo'> & {
  modelValue: boolean
}

interface SwitchSettingCardEmits {
  (event: 'update:modelValue', value: boolean): void
}

const emit = defineEmits<SwitchSettingCardEmits>()
const props = defineProps<SwitchSettingCardProps>()

function updateValue(value: boolean) {
  if (!props.disabled) emit('update:modelValue', value)
}

function toggle() {
  updateValue(!props.modelValue)
}
</script>
<template>
  <BasicSettingCard @click="toggle" :title="props.title" :description="props.description"
    :disabled="props.disabled">
    <Switch @click.stop :disabled="props.disabled" :model-value="props.modelValue" @update:model-value="updateValue">
    </Switch>
  </BasicSettingCard>
</template>
