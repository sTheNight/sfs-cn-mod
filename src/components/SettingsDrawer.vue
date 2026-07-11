<script setup lang="ts">
import { MyCustomButton } from '@/components/MyCustomButton'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { useSettingsStore, type ThemePreference } from '@/stores/settings'
import { Monitor, Moon, Sun, X, type LucideIcon } from '@lucide/vue'
import BasicSettingCard from './setting/BasicSettingCard.vue'
import SelectSettingCard from './setting/SelectSettingCard.vue'

const open = defineModel<boolean>('open', { default: false })
const settingsStore = useSettingsStore()

const themeOptions: { value: ThemePreference, label: string, icon: LucideIcon }[] = [
  { value: 'system', label: '跟随系统', icon: Monitor },
  { value: 'light', label: '浅色模式', icon: Sun },
  { value: 'dark', label: '深色模式', icon: Moon },
]
</script>

<template>
  <Drawer v-model:open="open" direction="right">
    <DrawerContent>
      <div class="scrollbar-hidden relative h-dvh w-full overflow-y-scroll box-border">
        <div
          class="sticky top-0 left-0 z-2 flex h-16 w-full items-center justify-between border-b bg-background/80 px-6 backdrop-blur-xs box-border">
          <h2 class="text-xl font-bold text-foreground">设置</h2>
          <MyCustomButton class="h-8 w-8" variant="outline" aria-label="关闭设置" @click="open = false">
            <X />
          </MyCustomButton>
        </div>
        <div class="p-6">
          <div class="mt-4 grid gap-2" role="radiogroup" aria-label="主题模式">
            <BasicSettingCard>

            </BasicSettingCard>
            <SelectSettingCard></SelectSettingCard>
          </div>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
