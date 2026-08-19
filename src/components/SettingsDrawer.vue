<script setup lang="ts">
import { MyCustomButton } from '@/components/MyCustomButton'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { type BackgroundPreference, type ThemePreference, type TransitionPreference, useSettingsStore } from '@/stores/settings'
import { Trash2, X } from '@lucide/vue'
import SelectSettingCard from './setting/SelectSettingCard.vue'
import SettingSection from './setting/SettingSection.vue'
import BasicSettingCard from './setting/BasicSettingCard.vue'
import SwitchSettingCard from './setting/SwitchSettingCard.vue'
import { themeOptions } from '@/data/themeOptions.ts'
import { transitionOptions } from '@/data/transitionOptions.ts'
import { backgroundOptions } from '@/data/backgroundOptions.ts'
import { removeCustomBackground, saveCustomBackground } from '@/utils/customBackgroundStorage'
import { computed, ref, useTemplateRef } from 'vue'
import Slider from './ui/slider/Slider.vue'

const open = defineModel<boolean>('open', { default: false })
const settingsStore = useSettingsStore()
const backgroundInput = useTemplateRef<HTMLInputElement>('background-input')
const backgroundError = ref('')
const backgroundBlur = computed<number[]>({
  get: () => [settingsStore.backgroundOverlay.blur],
  set: ([value]) => settingsStore.setBackgroundBlur(value ?? 0),
})
const backgroundOpacity = computed<number[]>({
  get: () => [settingsStore.backgroundOverlay.opacity],
  set: ([value]) => settingsStore.setBackgroundOpacity(value ?? 0),
})

const MAX_BACKGROUND_SIZE = 10 * 1024 * 1024

function handleThemeSelect(key: ThemePreference) {
  settingsStore.setTheme(key)
}

async function handleResetAllSetting() {
  await removeCustomBackground()
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

function handleBackgroundSelect(key: BackgroundPreference) {
  settingsStore.setBackground(key)
}

function selectBackgroundImage() {
  backgroundInput.value?.click()
}

async function handleBackgroundFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  if (!file.type.startsWith('image/'))
    return
  if (file.size > MAX_BACKGROUND_SIZE)
    return

  try {
    await saveCustomBackground(file)
    settingsStore.setCustomBackgroundName(file.name)
    settingsStore.setBackground('custom-image')
    backgroundError.value = ''
  } catch {
    backgroundError.value = '图片保存失败，请检查浏览器存储权限'
  }
}

async function clearBackgroundImage() {
  await removeCustomBackground()
  settingsStore.setCustomBackgroundName('')
  settingsStore.setBackground('grid')
  backgroundError.value = ''
}
</script>

<template>
  <Drawer v-model:open="open" direction="right" :handle-only="true">
    <DrawerContent class="w-full!">
      <div class="scrollbar-hidden relative h-dvh w-full overflow-y-scroll box-border">
        <div
          class="sticky top-0 left-0 z-2 flex h-16 w-full items-center justify-between bg-background/50 px-6 box-border">
          <h2 class="text-xl font-bold text-foreground">设置</h2>
          <MyCustomButton class="h-8 w-8" variant="outline" aria-label="关闭设置" @click="open = false">
            <X />
          </MyCustomButton>
          <div class="absolute inset-0 -z-10">
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(0px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 1; z-index: 0;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(2px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.975; z-index: 1;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(4px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.95; z-index: 2;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(6px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.925; z-index: 3;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(8px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.9; z-index: 4;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="background: linear-gradient(360deg, transparent 0%, hsl(var(--color-background)) 100%);"></div>
          </div>
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
            <SelectSettingCard title="背景样式" description="选择主页背景样式" :select="backgroundOptions"
              :value="settingsStore.background" @select="handleBackgroundSelect">
            </SelectSettingCard>
          </SettingSection>
          <SettingSection name="自定义背景" v-if="settingsStore.background === 'custom-image'">
            <BasicSettingCard title="背景图片"
              :description="backgroundError || settingsStore.customBackgroundName || '从本机选择一张图片，最大 10 MB'">
              <div class="flex gap-2">
                <input ref="background-input" class="hidden" type="file" accept="image/*"
                  @change="handleBackgroundFile" />
                <MyCustomButton variant="outline" size="sm" class="text-xs" @click="selectBackgroundImage">
                  选择
                </MyCustomButton>
                <MyCustomButton v-if="settingsStore.customBackgroundName" variant="outline" size="sm" class="text-xs"
                  aria-label="清除背景图片" @click="clearBackgroundImage">
                  <Trash2 :size="14" />
                </MyCustomButton>
              </div>
            </BasicSettingCard>
            <BasicSettingCard title="模糊强度" :description="`${settingsStore.backgroundOverlay.blur}px`">
              <Slider v-model="backgroundBlur" :min="0" :max="24" :step="1" class="w-32 sm:w-40" />
            </BasicSettingCard>
            <BasicSettingCard title="透明度"
              :description="`${(settingsStore.backgroundOverlay.opacity * 100).toFixed(0)}%`">
              <Slider v-model="backgroundOpacity" :min="0" :max="1" :step="0.01" class="w-32 sm:w-40" />
            </BasicSettingCard>
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
