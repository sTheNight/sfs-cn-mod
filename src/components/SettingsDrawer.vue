<script setup lang="ts">
import { MyCustomButton } from '@/components/MyCustomButton'
import { CompactButton } from '@/components/CompactButton'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import { DEFAULT_SETTINGS, useSettingsStore } from '@/stores/settings'
import { Trash2, X } from '@lucide/vue'
import SelectSettingCard from './setting/SelectSettingCard.vue'
import SettingSection from './setting/SettingSection.vue'
import BasicSettingCard from './setting/BasicSettingCard.vue'
import SwitchSettingCard from './setting/SwitchSettingCard.vue'
import SliderSettingCard from './setting/SliderSettingCard.vue'
import { themeOptions } from '@/data/themeOptions.ts'
import { transitionOptions } from '@/data/transitionOptions.ts'
import { backgroundOptions, imageSourceOptions } from '@/data/backgroundOptions.ts'
import { removeCustomBackground, saveCustomBackground } from '@/utils/customBackgroundStorage'
import { onMounted, ref, useTemplateRef } from 'vue'
import CollapseTransition from './CollapseTransition.vue'
import Input from './ui/input/Input.vue'
import { showToast } from './Toast/useToast.ts'

const open = defineModel<boolean>('open', { default: false })
const settingsStore = useSettingsStore()
const backgroundInput = useTemplateRef<HTMLInputElement>('background-input')
const backgroundError = ref('')
const MAX_BACKGROUND_SIZE = 10 * 1024 * 1024
const url = ref("")

async function handleResetAllSetting() {
  await removeCustomBackground()
  settingsStore.resetAllSetting()
  location.reload()
}

function selectBackgroundImage() {
  backgroundInput.value?.click()
}

async function handleBackgroundFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showToast("你选择的好像不是图片")
    return
  }
  if (file.size > MAX_BACKGROUND_SIZE) {
    showToast("这背景图有点大了吧")
    return
  }

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

async function handleSaveBackgroundUrl(e: KeyboardEvent) {
  if (e.key === 'Enter') settingsStore.setCustomBackgroundName(url.value)
}

onMounted(() => {
  if (
    settingsStore.imageBackgroundState.imageSource == 'url'
    && settingsStore.imageBackgroundState.name !== ''
  ) {
    url.value = settingsStore.imageBackgroundState.name
  }
})
</script>

<template>
  <Drawer v-model:open="open" direction="right" :handle-only="true">
    <DrawerContent class="w-full!">
      <div class="scrollbar-hidden relative h-dvh w-full overflow-y-scroll box-border">
        <div class="sticky top-0 left-0 z-2 flex h-16 w-full items-center justify-between px-6 box-border">
          <h2 class="text-xl font-bold text-foreground">设置</h2>
          <CompactButton aria-label="关闭设置" @click="open = false">
            <X />
          </CompactButton>
          <div class="absolute inset-0 -z-10 bg-linear-to-b from-background/60 to-transparent">
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(0px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 1; z-index: 0;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(2px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.975; z-index: 1;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(3px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.95; z-index: 2;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(4px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.925; z-index: 3;">
            </div>
            <div class="pointer-events-none absolute inset-0"
              style="backdrop-filter: blur(5px); mask-image: linear-gradient(360deg, transparent 0%, black 100%); opacity: 0.9; z-index: 4;">
            </div>
          </div>
        </div>
        <div class="w-full box-border pb-2">
          <SettingSection name="界面">
            <SelectSettingCard description="选择主题模式" :model-value="settingsStore.theme"
              :default-value="DEFAULT_SETTINGS.theme" :select="themeOptions" title="主题"
              @update:model-value="settingsStore.setTheme" />
            <SliderSettingCard title="卡片透明度"
              :description="`${settingsStore.cardOpacity <= 0.6 && settingsStore.background == 'custom-image' ? settingsStore.cardOpacity <= 0.3 ? '你喜欢就好：' : '真的要这样吗：' : ''}${(settingsStore.cardOpacity * 100).toFixed(0)}%`"
              :model-value="settingsStore.cardOpacity" :default-value="DEFAULT_SETTINGS.cardOpacity" :max="1"
              :step="0.01" @update:model-value="settingsStore.setCardOpacity" />
            <SelectSettingCard title="背景样式" description="选择主页背景样式" :select="backgroundOptions"
              :model-value="settingsStore.background" :default-value="DEFAULT_SETTINGS.background"
              @update:model-value="settingsStore.setBackground">
            </SelectSettingCard>
            <SwitchSettingCard is-experiment title="卡片模糊效果" description="实验性功能，建议降低卡片透明度食用"
              :model-value="settingsStore.cardBlurEffect" @update:model-value="settingsStore.setCardBlurEffect">
            </SwitchSettingCard>
          </SettingSection>
          <CollapseTransition :show="settingsStore.background === 'custom-image'">
            <SettingSection name="自定义背景">
              <SelectSettingCard title="图片来源" description="背景图片从哪里来呢" :select="imageSourceOptions"
                @update:model-value="settingsStore.setImageSource"
                :model-value="settingsStore.imageBackgroundState.imageSource">
              </SelectSettingCard>
              <BasicSettingCard v-if="settingsStore.imageBackgroundState.imageSource === 'local'" title="背景图片"
                :description="backgroundError || settingsStore.imageBackgroundState.name || '从本机选择一张图片，最大 10 MB'">
                <div class="flex gap-2">
                  <input ref="background-input" class="hidden" type="file" accept="image/*"
                    @change="handleBackgroundFile" />
                  <MyCustomButton variant="outline" size="sm" class="text-xs" @click="selectBackgroundImage">
                    选择
                  </MyCustomButton>
                  <CompactButton v-if="settingsStore.imageBackgroundState.name" size="sm" aria-label="清除背景图片"
                    @click="clearBackgroundImage">
                    <Trash2 :size="14" />
                  </CompactButton>
                </div>
              </BasicSettingCard>
              <BasicSettingCard v-else title="背景图片" description="输入后请按回车保存">
                <Input class="text-xs" v-model="url" @keydown="handleSaveBackgroundUrl"></Input>
              </BasicSettingCard>
              <SliderSettingCard title="模糊强度" :description="`${settingsStore.imageBackgroundState.blur}px`"
                :model-value="settingsStore.imageBackgroundState.blur"
                :default-value="DEFAULT_SETTINGS.imageBackgroundState.blur" :min="0" :max="24" :step="1"
                @update:model-value="settingsStore.setBackgroundBlur" />
              <SliderSettingCard title="透明度"
                :description="`${settingsStore.imageBackgroundState.opacity < 0.4 ? '这合适吗：' : ''}${(settingsStore.imageBackgroundState.opacity * 100).toFixed(0)}%`"
                :model-value="settingsStore.imageBackgroundState.opacity"
                :default-value="DEFAULT_SETTINGS.imageBackgroundState.opacity" :min="0" :max="1" :step="0.01"
                @update:model-value="settingsStore.setBackgroundOpacity" />
            </SettingSection>
          </CollapseTransition>
          <SettingSection name="效果">
            <SwitchSettingCard :model-value="settingsStore.enableAnimations" title="动画效果"
              description="关闭后将减少动画效果，或许能提升一定的页面渲染性能" @update:model-value="settingsStore.setEnableAnimations" />
            <SelectSettingCard :disabled="!settingsStore.enableAnimations" title="切换动画"
              description="选择路由切换动画，需要开启动画效果后才能生效" :select="transitionOptions" :model-value="settingsStore.transition"
              :default-value="DEFAULT_SETTINGS.transition" @update:model-value="settingsStore.setTransition" />
            <SwitchSettingCard :disabled="!settingsStore.enableAnimations"
              :model-value="settingsStore.enableRippleEffect" title="水波纹效果" description="按住按钮后的水波纹效果"
              @update:model-value="settingsStore.setEnableRippleEffect" />
            <SwitchSettingCard :disabled="!settingsStore.enableAnimations" :model-value="settingsStore.enableTitleGlow"
              title="标题发光" description="主页标题的发光效果，可能有兼容性问题" @update:model-value="settingsStore.setEnableTitleGlow" />
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
