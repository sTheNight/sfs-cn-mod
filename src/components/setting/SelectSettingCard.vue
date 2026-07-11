<script lang="ts">
import type { LucideIcon } from '@lucide/vue'

export interface SelectValue {
  label: string
  key: string
  icon: LucideIcon
}

export interface SelectSettingCardProps {
  select: SelectValue[]
  value: string,
  placeholder?: string
}
</script>

<script setup lang="ts">
import { Select } from '../ui/select/index.ts'
import SelectContent from '../ui/select/SelectContent.vue'
import SelectItem from '../ui/select/SelectItem.vue'
import SelectTrigger from '../ui/select/SelectTrigger.vue'
import SelectValue from '../ui/select/SelectValue.vue'
import BasicSettingCard from './BasicSettingCard.vue'
import type { BasicSettingCardProps } from './index.ts'

const props = defineProps<BasicSettingCardProps & SelectSettingCardProps>()
const emit = defineEmits<{
  select: [key: string]
}>()

function handleSelect(value: unknown) {
  if (typeof value === 'string') {
    emit('select', value)
  }
}
</script>
<template>
  <BasicSettingCard>
    <div class="flex items-center justify-between gap-3">
      <div class="min-w-0 flex-1">
        <h2>{{ props.title }}</h2>
        <p v-if="props.description" class="text-muted-foreground text-xs wrap-break-word">
          {{ props.description }}
        </p>
      </div>
      <div class="shrink-0">
        <Select :model-value="props.value" @update:model-value="handleSelect">
          <SelectTrigger>
            <SelectValue class="text-xs" :placeholder="placeholder ?? undefined" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem class="text-xs" v-for="item in props.select" :key="item.key" :value="item.key">
              <component :is="item.icon" />
              {{ item.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </BasicSettingCard>
</template>
