import type { SelectValue } from "@/components/setting/SelectSettingCard.vue";
import type { TransitionPreference } from "@/stores/settings";

export const transitionOptions: SelectValue<TransitionPreference>[] = [
  { key: "x-fade", label: "X 轴切换" },
  { key: "y-fade", label: "Y 轴切换" },
  { key: "opacity-fade", label: "淡入淡出" },
  { key: "none", label: "无动画" }
]
