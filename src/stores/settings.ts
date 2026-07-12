import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<ThemePreference>('system')
  const neverShowWarningDialog = ref<boolean>(false)
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

  function setNeverShowWarningDialog(val: boolean) {
    neverShowWarningDialog.value = val
  }

  function initializeTheme() {
    applyTheme()
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (theme.value === 'system') applyTheme()
    })
  }

  function resetAllSetting() {
    theme.value = 'system';
    neverShowWarningDialog.value = false
  }

  return {
    theme,
    neverShowWarningDialog,
    setTheme,
    initializeTheme,
    setNeverShowWarningDialog,
    resetAllSetting
  }
}, {
  persist: {
    key: 'sfs-settings',
    pick: ['theme', 'neverShowWarningDialog'],
  },
})
