import { removeCustomBackground } from '@/utils/customBackgroundStorage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'
export type TransitionPreference = 'x-fade' | 'y-fade' | 'opacity-fade' | 'none'

export type BackgroundPreference = 'none' | 'grid' | 'custom-image'
export type ImageSource = 'local' | 'url'

export interface ImageBackgroundState {
  imageSource: ImageSource,
  name: string,
  blur: number,
  opacity: number
}

export const DEFAULT_SETTINGS = {
  // 界面
  theme: 'system' as ThemePreference,
  cardOpacity: 1,
  background: 'custom-image' as BackgroundPreference,
  cardBlurEffect: false,
  // 自定义背景
  imageBackgroundState: {
    imageSource: 'url' as ImageSource,
    name: '/szm.png',
    blur: 0,
    opacity: 0.8,
  },
  // 效果
  enableAnimations: true,
  transition: 'x-fade' as TransitionPreference,
  enableRippleEffect: true,
  enableTitleGlow: true,
  // 其他页面
  neverShowWarningDialog: false,
} as const

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const useSettingsStore = defineStore('settings', () => {
  // 界面
  const theme = ref<ThemePreference>(DEFAULT_SETTINGS.theme)
  const cardOpacity = ref<number>(DEFAULT_SETTINGS.cardOpacity)
  const background = ref<BackgroundPreference>(DEFAULT_SETTINGS.background)
  const isDark = computed(() => theme.value === 'dark' || (theme.value === 'system' && prefersDark()))
  const cardBlurEffect = ref(false) // 影响范围：ModCard BasicInfoCard MainLayout导航按钮 ModView检索栏 InfoCard

  function applyTheme() {
    const dark = isDark.value
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
  }
  function setTheme(value: ThemePreference) {
    theme.value = value
    applyTheme()
  }
  function setCardBlurEffect(value: boolean) {
    cardBlurEffect.value = value
  }
  function applyCardOpacity() {
    document.documentElement.style.setProperty('--card-opacity', String(cardOpacity.value))
  }
  function setCardOpacity(value: number) {
    cardOpacity.value = value
    applyCardOpacity()
  }
  function initializeCardOpacity() {
    setCardOpacity(cardOpacity.value)
  }
  function initializeTheme() {
    applyTheme()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') applyTheme()
    })
  }
  function setBackground(val: BackgroundPreference) {
    background.value = val
  }

  // 自定义背景
  const customBackgroundRevision = ref(0)
  const imageBackgroundState = ref<ImageBackgroundState>({
    ...DEFAULT_SETTINGS.imageBackgroundState,
  })

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
    imageBackgroundState.value.name = ''
    if (value == 'url') {
      await removeCustomBackground()
    }
    imageBackgroundState.value.imageSource = value
  }

  // 效果
  const enableAnimations = ref<boolean>(DEFAULT_SETTINGS.enableAnimations)
  const transition = ref<TransitionPreference>(DEFAULT_SETTINGS.transition)
  const enableRippleEffect = ref<boolean>(DEFAULT_SETTINGS.enableRippleEffect)
  const enableTitleGlow = ref<boolean>(DEFAULT_SETTINGS.enableTitleGlow)

  function applyMotionPreference() {
    document.documentElement.dataset.reduceMotion = String(!enableAnimations.value)
  }
  function setEnableAnimations(value: boolean) {
    enableAnimations.value = value
    applyMotionPreference()
  }
  function initializeMotionPreference() {
    applyMotionPreference()
  }
  function setTransition(value: TransitionPreference) {
    transition.value = value
  }
  function setEnableRippleEffect(value: boolean) {
    enableRippleEffect.value = value
  }
  function setEnableTitleGlow(value: boolean) {
    enableTitleGlow.value = value
  }

  // 其他页面
  const neverShowWarningDialog = ref<boolean>(DEFAULT_SETTINGS.neverShowWarningDialog)

  function setNeverShowWarningDialog(val: boolean) {
    neverShowWarningDialog.value = val
  }

  // 操作
  function resetAllSetting() {
    localStorage.removeItem('sfs-settings')
  }

  return {
    theme,
    neverShowWarningDialog,
    enableAnimations,
    enableRippleEffect,
    enableTitleGlow,
    cardOpacity,
    background,
    customBackgroundRevision,
    transition,
    imageBackgroundState,
    cardBlurEffect,
    setTheme,
    setBackground,
    setCustomBackgroundName,
    setBackgroundBlur,
    initializeTheme,
    setEnableRippleEffect,
    setEnableTitleGlow,
    setCardOpacity,
    setNeverShowWarningDialog,
    setEnableAnimations,
    initializeMotionPreference,
    initializeCardOpacity,
    resetAllSetting,
    setTransition,
    setBackgroundOpacity,
    setImageSource,
    setCardBlurEffect
  }
}, {
  persist: {
    key: 'sfs-settings',
    pick: ['theme', 'neverShowWarningDialog', 'enableAnimations', 'transition', 'enableRippleEffect', 'enableTitleGlow', 'cardOpacity', 'background', 'customBackgroundName', 'imageBackgroundState', 'cardBlurEffect'],
  },
})
