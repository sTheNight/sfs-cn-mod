import type { SelectValue } from "@/components/setting/SelectSettingCard.vue";
import type { ThemePreference } from "@/stores/settings";
import { Monitor, Moon, Sun } from "@lucide/vue";

export const themeOptions: SelectValue<ThemePreference>[] = [
  { key: 'system', label: '跟随系统', icon: Monitor },
  { key: 'light', label: '浅色模式', icon: Sun },
  { key: 'dark', label: '深色模式', icon: Moon },
]
