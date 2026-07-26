import type { SelectValue } from "@/components/setting/SelectSettingCard.vue";
import type { BackgroundPreference } from "@/stores/settings";

export const backgroundOptions: SelectValue<BackgroundPreference>[] = [
  { key: "none", label: "无背景" },
  { key: 'grid', label: "网格背景" }
]
