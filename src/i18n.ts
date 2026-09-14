import { createI18n } from 'vue-i18n'
import { messages, type AppLocale } from './locales'

export type { AppLocale } from './locales'

const savedLocale = localStorage.getItem('sfs-locale')
const initialLocale: AppLocale = savedLocale === 'zh-TW' || savedLocale === 'zh-CN' || savedLocale === 'zh-HK'
  ? savedLocale
  : navigator.language.toLowerCase().includes('hk') || navigator.language.toLowerCase().includes('mo')
    ? 'zh-HK'
    : navigator.language.toLowerCase().includes('tw')
      ? 'zh-TW'
      : 'zh-CN'

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: {
    'zh-HK': ['zh-TW'],
    default: ['zh-CN'],
  },
  messages,
})

export function setDocumentLocale(locale: AppLocale) {
  localStorage.setItem('sfs-locale', locale)
  document.documentElement.lang = locale
}

setDocumentLocale(initialLocale)
