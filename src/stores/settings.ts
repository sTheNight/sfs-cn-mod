import { removeCustomBackground } from '@/utils/customBackgroundStorage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'
export type TransitionPreference = 'x-fade' | 'y-fade' | 'opacity-fade'

export type BackgroundPreference = 'none' | 'grid' | 'custom-image'
export type ImageSource = 'local' | 'url'

export interface ImageBackgroundState {
  imageSource: ImageSource,
  name: string,
  blur: number,
  opacity: number
}

export const DEFAULT_SETTINGS = {
  theme: 'system' as ThemePreference,
  neverShowWarningDialog: false,
  enableAnimations: true,
  enableRippleEffect: true,
  enableTitleGlow: true,
  transition: 'x-fade' as TransitionPreference,
  background: 'grid' as BackgroundPreference,
  imageBackgroundState: {
    imageSource: 'url' as ImageSource,
    name: '/szm.png',
    blur: 0,
    opacity: 0.8,
  },
} as const

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const useSettingsStore = defineStore('settings', () => {
  const neverShowWarningDialog = ref<boolean>(DEFAULT_SETTINGS.neverShowWarningDialog)

  function setNeverShowWarningDialog(val: boolean) {
    neverShowWarningDialog.value = val
  }
  function resetAllSetting() {
    localStorage.removeItem('sfs-settings')
  }
  // 外观
  const theme = ref<ThemePreference>(DEFAULT_SETTINGS.theme)
  const enableAnimations = ref<boolean>(DEFAULT_SETTINGS.enableAnimations)
  const enableRippleEffect = ref<boolean>(DEFAULT_SETTINGS.enableRippleEffect)
  const enableTitleGlow = ref<boolean>(DEFAULT_SETTINGS.enableTitleGlow)
  const isDark = computed(() => theme.value === 'dark' || (theme.value === 'system' && prefersDark()))

  function applyTheme() {
    const dark = isDark.value
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }
  function setTheme(value: ThemePreference) {
    theme.value = value
    applyTheme()
  }
  function setTransition(value: TransitionPreference) {
    transition.value = value
  }
  function setEnableAnimations(value: boolean) {
    enableAnimations.value = value
    applyMotionPreference()
  }
  function setEnableRippleEffect(value: boolean) {
    enableRippleEffect.value = value
  }
  function setEnableTitleGlow(value: boolean) {
    enableTitleGlow.value = value
  }
  function initializeTheme() {
    applyTheme()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') applyTheme()
    })
  }
  function initializeMotionPreference() {
    applyMotionPreference()
  }

  // 界面 &  背景
  const transition = ref<TransitionPreference>(DEFAULT_SETTINGS.transition)
  const background = ref<BackgroundPreference>(DEFAULT_SETTINGS.background)
  const customBackgroundRevision = ref(0)
  const imageBackgroundState = ref<ImageBackgroundState>({
    ...DEFAULT_SETTINGS.imageBackgroundState,
  })

  function applyMotionPreference() {
    document.documentElement.dataset.reduceMotion = String(!enableAnimations.value)
  }
  function setBackground(val: BackgroundPreference) {
    background.value = val
  }
  function setCustomBackgroundName(value: string | number) {
    value = value.toString()
    imageBackgroundState.value.name = value
    customBackgroundRevision.value += 1
  }
  function setBackgroundBlur(value: number) {
    imageBackgroundState.value.blur = value
  }
  function setBackgroundOpacity(value: number) {
    imageBackgroundState.value.opacity = value
  }
  async function setImageSource(value: ImageSource) {
    imageBackgroundState.value.name = '';
    if (value == 'url') {
      await removeCustomBackground()
    }
    imageBackgroundState.value.imageSource = value
  }
  return {
    theme,
    neverShowWarningDialog,
    enableAnimations,
    enableRippleEffect,
    enableTitleGlow,
    background,
    customBackgroundRevision,
    transition,
    imageBackgroundState,
    setTheme,
    setBackground,
    setCustomBackgroundName,
    setBackgroundBlur,
    initializeTheme,
    setEnableRippleEffect,
    setEnableTitleGlow,
    setNeverShowWarningDialog,
    setEnableAnimations,
    initializeMotionPreference,
    resetAllSetting,
    setTransition,
    setBackgroundOpacity,
    setImageSource
  }
}, {
  persist: {
    key: 'sfs-settings',
    pick: ['theme', 'neverShowWarningDialog', 'enableAnimations', 'transition', 'enableRippleEffect', 'enableTitleGlow', 'background', 'customBackgroundName', 'imageBackgroundState'],
  },
})
