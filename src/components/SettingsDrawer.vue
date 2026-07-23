<script setup lang="ts">
import { MyCustomButton } from '@/components/MyCustomButton'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { type ThemePreference, type TransitionPreference, useSettingsStore } from '@/stores/settings'
import { X } from '@lucide/vue'
import SelectSettingCard from './setting/SelectSettingCard.vue'
import SettingSection from './setting/SettingSection.vue'
import BasicSettingCard from './setting/BasicSettingCard.vue'
import SwitchSettingCard from './setting/SwitchSettingCard.vue'
import { themeOptions } from '@/data/themeOptions.ts'
import { transitionOptions } from '@/data/transitionOptions.ts'

const open = defineModel<boolean>('open', { default: false })
const settingsStore = useSettingsStore()

function handleThemeSelect(key: ThemePreference) {
  settingsStore.setTheme(key)
}

function handleResetAllSetting() {
  settingsStore.resetAllSetting()
  location.reload()
}

function handleSelect(val: boolean) {
  settingsStore.setEnableAnimations(val)
}

function handleTransitionSelect(key: TransitionPreference) {
  settingsStore.setTransition(key)
}

function handleEnableRippleEffectSelect(val: boolean) {
  settingsStore.setEnableRippleEffect(val)
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
            <SwitchSettingCard :model-value="settingsStore.enableRippleEffect"
              @on-switch="handleEnableRippleEffectSelect" title="水波纹效果" description="按住按钮后的水波纹效果" />
          </SettingSection>
          <SettingSection name="界面">
            <SelectSettingCard title="切换动画" description="选择路由切换动画，需要开启动画效果后才能生效" :select="transitionOptions"
              :value="settingsStore.transition" @select="handleTransitionSelect" />
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
