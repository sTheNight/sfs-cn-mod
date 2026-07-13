<script lang="ts">
import type { LucideIcon } from '@lucide/vue'

export interface SelectValue {
  label: string
  key: string
  icon: LucideIcon
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '../ui/select/index.ts'
import SelectContent from '../ui/select/SelectContent.vue'
import SelectItem from '../ui/select/SelectItem.vue'
import SelectTrigger from '../ui/select/SelectTrigger.vue'
import SelectValue from '../ui/select/SelectValue.vue'
import BasicSettingCard from './BasicSettingCard.vue'
import type { BasicSettingCardProps } from './index.ts'

interface SelectSettingCardProps {
  select: SelectValue[]
  value: string,
  placeholder?: string
}
interface SelectSettingCardEmits {
  (e: 'select', key: string): void
}

const props = defineProps<BasicSettingCardProps & SelectSettingCardProps>()
const emit = defineEmits<SelectSettingCardEmits>()
const isOpen = ref(false)

function handleSelect(value: unknown) {
  if (typeof value === 'string') {
    emit('select', value)
  }
}

function openSelect() {
  isOpen.value = true
}
</script>
<template>
  <BasicSettingCard :title="props.title" :description="props.description" @click="openSelect">
    <Select v-model:open="isOpen" :model-value="props.value" @update:model-value="handleSelect">
      <SelectTrigger @click.stop>
        <SelectValue class="text-xs" :placeholder="placeholder ?? undefined" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem class="text-xs" v-for="(item, index) in props.select" :key="index" :value="item.key">
          <component :is="item.icon" />
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </BasicSettingCard>
</template>
