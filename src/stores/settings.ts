import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'
export type TransitionPreference = 'x-fade' | 'y-fade' | 'opacity-fade'

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<ThemePreference>('system')
  const transition = ref<TransitionPreference>("x-fade")
  const neverShowWarningDialog = ref<boolean>(false)
  const enableAnimations = ref<boolean>(true)
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

  function setNeverShowWarningDialog(val: boolean) {
    neverShowWarningDialog.value = val
  }

  function applyMotionPreference() {
    document.documentElement.dataset.reduceMotion = String(!enableAnimations.value)
  }

  function setEnableAnimations(value: boolean) {
    enableAnimations.value = value
    applyMotionPreference()
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

  function resetAllSetting() {
    localStorage.removeItem('sfs-settings')
  }

  return {
    theme,
    neverShowWarningDialog,
    enableAnimations,
    setTheme,
    initializeTheme,
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
    pick: ['theme', 'neverShowWarningDialog', 'enableAnimations', 'transition'],
  },
})
