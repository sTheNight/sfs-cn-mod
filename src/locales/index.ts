import zhCN from './zh-CN'
import zhHK from './zh-HK'
import zhTW from './zh-TW'

export const messages = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'zh-HK': zhHK,
} as const

export type AppLocale = keyof typeof messages
