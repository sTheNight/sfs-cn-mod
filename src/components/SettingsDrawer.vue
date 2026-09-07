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
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import CollapseTransition from './CollapseTransition.vue'
import { showToast } from './Toast/useToast.ts'
import InputSettingCard from './setting/InputSettingCard.vue'
import { useI18n } from 'vue-i18n'
import { setDocumentLocale, type AppLocale } from '@/i18n'

const open = defineModel<boolean>('open', { default: false })
const settingsStore = useSettingsStore()
const backgroundInput = useTemplateRef<HTMLInputElement>('background-input')
const MAX_BACKGROUND_SIZE = 10 * 1024 * 1024
const url = ref("")
const { t, locale } = useI18n()

const languageOptions = computed(() => [
  { key: 'zh-CN', label: t('language.name', {}, { locale: 'zh-CN' }) },
  { key: 'zh-TW', label: t('language.name', {}, { locale: 'zh-TW' }) },
  { key: 'zh-HK', label: t('language.name', {}, { locale: 'zh-HK' }) },
])
const translatedThemeOptions = computed(() => themeOptions.map(item => ({ ...item, label: t(`options.theme.${item.key}`) })))
const translatedTransitionOptions = computed(() => transitionOptions.map(item => ({ ...item, label: t(`options.transition.${item.key}`) })))
const translatedBackgroundOptions = computed(() => backgroundOptions.map(item => ({ ...item, label: t(`options.background.${item.key}`) })))
const translatedImageSourceOptions = computed(() => imageSourceOptions.map(item => ({ ...item, label: t(`options.imageSource.${item.key}`) })))

function setLocale(value: string | number) {
  locale.value = value as AppLocale
  setDocumentLocale(locale.value as AppLocale)
}

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
    showToast(t('settings.notImage'))
    return
  }
  if (file.size > MAX_BACKGROUND_SIZE) {
    showToast(t('settings.imageTooLarge'))
    return
  }

  try {
    await saveCustomBackground(file)
    settingsStore.setCustomBackgroundName(file.name)
    settingsStore.setBackground('custom-image')
  } catch {
    showToast(t('settings.imageSaveFailed'))
  }
}

async function clearBackgroundImage() {
  await removeCustomBackground()
  settingsStore.setCustomBackgroundName('')
}

async function handleSaveBackgroundUrl(value: string) {
  settingsStore.setCustomBackgroundName(value)
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
          <h2 class="text-xl font-bold text-foreground">{{ t('settings.title') }}</h2>
          <CompactButton :aria-label="t('settings.close')" @click="open = false">
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
          <SettingSection :name="t('settings.interface')">
            <SelectSettingCard :title="t('language.title')" :description="t('language.description')"
              :model-value="locale" default-value="zh-CN" :select="languageOptions" @update:model-value="setLocale" />
            <SelectSettingCard :description="t('settings.themeDesc')" :model-value="settingsStore.theme"
              :default-value="DEFAULT_SETTINGS.theme" :select="translatedThemeOptions" :title="t('settings.theme')"
              @update:model-value="settingsStore.setTheme" />
            <SliderSettingCard :title="t('settings.cardOpacity')"
              :description="`${settingsStore.cardOpacity <= 0.6 && settingsStore.background == 'custom-image' ? settingsStore.cardOpacity <= 0.3 ? t('settings.opacityVeryLow') : t('settings.opacityLow') : ''}${(settingsStore.cardOpacity * 100).toFixed(0)}%`"
              :model-value="settingsStore.cardOpacity" :default-value="DEFAULT_SETTINGS.cardOpacity" :max="1"
              :step="0.01" @update:model-value="settingsStore.setCardOpacity" />
            <SelectSettingCard :title="t('settings.backgroundStyle')" :description="t('settings.backgroundStyleDesc')" :select="translatedBackgroundOptions"
              :model-value="settingsStore.background" :default-value="DEFAULT_SETTINGS.background"
              @update:model-value="settingsStore.setBackground">
            </SelectSettingCard>
            <SwitchSettingCard is-experiment :title="t('settings.cardBlur')" :description="t('settings.cardBlurDesc')"
              :model-value="settingsStore.cardBlurEffect" @update:model-value="settingsStore.setCardBlurEffect">
            </SwitchSettingCard>
          </SettingSection>
          <CollapseTransition :show="settingsStore.background === 'custom-image'">
            <SettingSection :name="t('settings.customBackground')">
              <SelectSettingCard :title="t('settings.imageSource')" :description="t('settings.imageSourceDesc')" :select="translatedImageSourceOptions"
                @update:model-value="settingsStore.setImageSource"
                :model-value="settingsStore.imageBackgroundState.imageSource">
              </SelectSettingCard>
              <BasicSettingCard v-if="settingsStore.imageBackgroundState.imageSource === 'local'" :title="t('settings.backgroundImage')"
                :description="settingsStore.imageBackgroundState.name || t('settings.localImageDesc')">
                <div class="flex gap-2">
                  <input ref="background-input" class="hidden" type="file" accept="image/*"
                    @change="handleBackgroundFile" />
                  <MyCustomButton variant="outline" size="sm" class="text-xs" @click="selectBackgroundImage">
                    {{ t('common.select') }}
                  </MyCustomButton>
                  <MyCustomButton class="w-8 h-8 text-red-500 hover:text-red-500"
                    v-if="settingsStore.imageBackgroundState.name" size="sm" variant="outline" :aria-label="t('settings.clearImage')"
                    @click="clearBackgroundImage">
                    <Trash2 :size="14" />
                  </MyCustomButton>
                </div>
              </BasicSettingCard>
              <InputSettingCard v-if="settingsStore.imageBackgroundState.imageSource === 'url'" :title="t('settings.backgroundImage')"
                :description="t('settings.urlDesc')" :current-text="settingsStore.imageBackgroundState.name"
                :default-value="DEFAULT_SETTINGS.imageBackgroundState.name" @save="handleSaveBackgroundUrl" />
              <SliderSettingCard :title="t('settings.blur')" :description="`${settingsStore.imageBackgroundState.blur}px`"
                :model-value="settingsStore.imageBackgroundState.blur"
                :default-value="DEFAULT_SETTINGS.imageBackgroundState.blur" :min="0" :max="24" :step="1"
                @update:model-value="settingsStore.setBackgroundBlur" />
              <SliderSettingCard :title="t('settings.opacity')"
                :description="`${settingsStore.imageBackgroundState.opacity < 0.4 ? t('settings.opacityWarning') : ''}${(settingsStore.imageBackgroundState.opacity * 100).toFixed(0)}%`"
                :model-value="settingsStore.imageBackgroundState.opacity"
                :default-value="DEFAULT_SETTINGS.imageBackgroundState.opacity" :min="0" :max="1" :step="0.01"
                @update:model-value="settingsStore.setBackgroundOpacity" />
            </SettingSection>
          </CollapseTransition>
          <SettingSection :name="t('settings.effects')">
            <SwitchSettingCard :model-value="settingsStore.enableAnimations" :title="t('settings.animations')"
              :description="t('settings.animationsDesc')" @update:model-value="settingsStore.setEnableAnimations" />
            <SelectSettingCard :disabled="!settingsStore.enableAnimations" :title="t('settings.transition')"
              :description="t('settings.transitionDesc')" :select="translatedTransitionOptions" :model-value="settingsStore.transition"
              :default-value="DEFAULT_SETTINGS.transition" @update:model-value="settingsStore.setTransition" />
            <SwitchSettingCard :disabled="!settingsStore.enableAnimations"
              :model-value="settingsStore.enableRippleEffect" :title="t('settings.ripple')" :description="t('settings.rippleDesc')"
              @update:model-value="settingsStore.setEnableRippleEffect" />
            <SwitchSettingCard :disabled="!settingsStore.enableAnimations" :model-value="settingsStore.enableTitleGlow"
              :title="t('settings.titleGlow')" :description="t('settings.titleGlowDesc')" @update:model-value="settingsStore.setEnableTitleGlow" />
          </SettingSection>
          <SettingSection :name="t('settings.actions')">
            <BasicSettingCard :title="t('settings.reset')" :description="t('settings.resetDesc')">
              <MyCustomButton @click="handleResetAllSetting" variant="destructive" size="sm" class="text-xs">
                {{ t('common.reset') }}
              </MyCustomButton>
            </BasicSettingCard>
          </SettingSection>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
</template>
