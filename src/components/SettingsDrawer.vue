<script setup lang="ts">
import { MyCustomButton } from '@/components/MyCustomButton'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { type ThemePreference, useSettingsStore } from '@/stores/settings'
import { Monitor, Moon, Sun, X } from '@lucide/vue'
import SelectSettingCard, { type SelectValue } from './setting/SelectSettingCard.vue'
import SettingSection from './setting/SettingSection.vue'
import BasicSettingCard from './setting/BasicSettingCard.vue'
import SwitchSettingCard from './setting/SwitchSettingCard.vue'

const open = defineModel<boolean>('open', { default: false })
const settingsStore = useSettingsStore()

const themeOptions: SelectValue[] = [
  { key: 'system', label: '跟随系统', icon: Monitor },
  { key: 'light', label: '浅色模式', icon: Sun },
  { key: 'dark', label: '深色模式', icon: Moon },
]

function isThemePreference(value: string): value is ThemePreference {
  return value === 'system' || value === 'light' || value === 'dark'
}

function handleThemeSelect(key: string) {
  if (isThemePreference(key)) {
    settingsStore.setTheme(key)
  }
}

function handleResetAllSetting() {
  settingsStore.resetAllSetting()
  location.reload()
}

function handleSelect(val: boolean) {
  settingsStore.setEnableAnimations(val)
}
</script>

<template>
  <Drawer v-model:open="open" direction="right" :handle-only="true">
    <DrawerContent class="w-full!">
      <div class="scrollbar-hidden relative h-dvh w-full overflow-y-scroll box-border">
        <div
          class="sticky top-0 left-0 z-2 flex h-16 w-full items-center justify-between border-b bg-background/80 px-6 backdrop-blur-xs box-border">
          <h2 class="text-xl font-bold text-foreground">设置</h2>
          <MyCustomButton class="h-8 w-8" variant="outline" aria-label="关闭设置" @click="open = false">
            <X />
          </MyCustomButton>
        </div>
        <div class="w-full box-border pb-2">
          <SettingSection name="外观">
            <SelectSettingCard description="选择主题模式" :value="settingsStore.theme" :select="themeOptions" title="主题"
              @select="handleThemeSelect" />
            <SwitchSettingCard :model-value="settingsStore.enableAnimations" @on-switch="handleSelect" title="动画效果"
              description="关闭后将减少动画效果，或许能提升一定的页面渲染性能" />
          </SettingSection>
          <SettingSection name="操作">
            <BasicSettingCard title="重置设置" description="清除自定义设置选项">
              <MyCustomButton @click="handleResetAllSetting" variant="destructive" size="sm" class="text-xs">
                重置
              </MyCustomButton>
            </BasicSettingCard>
          </SettingSection>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
