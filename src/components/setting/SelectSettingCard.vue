<script setup lang="ts">
import { Moon } from '@lucide/vue';
import { Select } from '../ui/select/index.ts';
import SelectContent from '../ui/select/SelectContent.vue';
import SelectItem from '../ui/select/SelectItem.vue';
import SelectTrigger from '../ui/select/SelectTrigger.vue';
import SelectValue from '../ui/select/SelectValue.vue';
import BasicSettingCard from './BasicSettingCard.vue';
</script>
<template>
  <BasicSettingCard>
    <div class="flex items-center justify-between">
      <h2>123</h2>
      <Select>
        <SelectTrigger>
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="123">
            <Moon />
            123
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </BasicSettingCard>
</template>
