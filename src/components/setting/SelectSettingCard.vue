<script lang="ts">
import type { LucideIcon } from '@lucide/vue'
import type { AcceptableValue } from 'reka-ui'

export interface SelectValue<T extends AcceptableValue = string> {
  label: string
  key: T
  icon?: LucideIcon
}
</script>

<script setup lang="ts" generic="T extends AcceptableValue = string">
import { ref } from 'vue'
import { Select } from '../ui/select/index.ts'
import SelectContent from '../ui/select/SelectContent.vue'
import SelectItem from '../ui/select/SelectItem.vue'
import SelectTrigger from '../ui/select/SelectTrigger.vue'
import SelectPrimitiveValue from '../ui/select/SelectValue.vue'
import BasicSettingCard from './BasicSettingCard.vue'
import type { BasicSettingCardProps } from './index.ts'

interface SelectSettingCardProps {
  select: SelectValue<T>[]
  value: T
  placeholder?: string
}
interface SelectSettingCardEmits {
  (e: 'select', key: T): void
}

const props = defineProps<BasicSettingCardProps & SelectSettingCardProps>()
const emit = defineEmits<SelectSettingCardEmits>()
const isOpen = ref(false)

function handleSelect(value: AcceptableValue) {
  const selectedItem = props.select.find((item) => Object.is(item.key, value))
  if (selectedItem) {
    emit('select', selectedItem.key)
  }
}

function openSelect() {
  if (props.disabled) return
  isOpen.value = true
}
</script>
<template>
  <BasicSettingCard :title="props.title" :description="props.description" :show-undo="props.showUndo"
    :disabled="props.disabled" @click="openSelect">
    <Select v-model:open="isOpen" :disabled="props.disabled" :model-value="props.value"
      @update:model-value="handleSelect">
      <SelectTrigger @click.stop>
        <SelectPrimitiveValue class="text-xs" :placeholder="placeholder ?? undefined" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem class="text-xs" v-for="(item, index) in props.select" :key="index" :value="item.key">
          <component v-if="item.icon" :is="item.icon" />
          {{ item.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </BasicSettingCard>
</template>
