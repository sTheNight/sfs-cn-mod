import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'
export type TransitionPreference = 'x-fade' | 'y-fade' | 'opacity-fade'
export type BackgroundPreference = 'none' | 'grid' | 'custom-image'

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const useSettingsStore = defineStore('settings', () => {
  const neverShowWarningDialog = ref<boolean>(false)

  function setNeverShowWarningDialog(val: boolean) {
    neverShowWarningDialog.value = val
  }
  function resetAllSetting() {
    localStorage.removeItem('sfs-settings')
  }
  // 外观
  const theme = ref<ThemePreference>('system')
  const enableAnimations = ref<boolean>(true)
  const enableRippleEffect = ref<boolean>(true)
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
  const transition = ref<TransitionPreference>("x-fade")
  const background = ref<BackgroundPreference>("grid")
  const customBackgroundName = ref('')
  const customBackgroundRevision = ref(0)

  function applyMotionPreference() {
    document.documentElement.dataset.reduceMotion = String(!enableAnimations.value)
  }
  function setBackground(val: BackgroundPreference) {
    background.value = val
  }
  function setCustomBackgroundName(value: string) {
    customBackgroundName.value = value
    customBackgroundRevision.value += 1
  }
  return {
    theme,
    neverShowWarningDialog,
    enableAnimations,
    enableRippleEffect,
    background,
    customBackgroundName,
    customBackgroundRevision,
    setTheme,
    setBackground,
    setCustomBackgroundName,
    initializeTheme,
    setEnableRippleEffect,
    setNeverShowWarningDialog,
    setEnableAnimations,
    initializeMotionPreference,
    resetAllSetting,
    transition,
    setTransition
  }
}, {
  persist: {
    key: 'sfs-settings',
    pick: ['theme', 'neverShowWarningDialog', 'enableAnimations', 'transition', 'enableRippleEffect', 'background', 'customBackgroundName'],
  },
})
