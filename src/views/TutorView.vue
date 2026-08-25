<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import type { TutorType } from '@/models/Tutor';
import {
  AppleIcon,
  BotIcon,
  Laptop,
  MessageCircleQuestionIcon,
} from '@lucide/vue';
import { ref, type Component, type Ref } from 'vue';
import AndroidTutor from './Tutorial/AndroidTutor.vue';
import IOSTutor from './Tutorial/iOSTutor.vue';
import PCTutor from './Tutorial/PCTutor.vue';
import QA from './Tutorial/QA.vue';
import { useSettingsStore } from '@/stores/settings.ts';

const currentTutor: Ref<TutorType> = ref("android")
const setting = useSettingsStore()

const tutorTabs: { type: TutorType, label: string, icon: Component }[] = [
  { type: "android", label: "安卓", icon: BotIcon },
  { type: "ios", label: "iOS", icon: AppleIcon },
  { type: "pc", label: "PC", icon: Laptop },
  { type: "qa", label: "常见问题", icon: MessageCircleQuestionIcon },
]

function isActiveTutorSection(tutor: TutorType): boolean {
  return currentTutor.value == tutor
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto relative">
    <ButtonGroup class="ml-auto mr-auto sticky top-4 z-5">
      <Button class="bg-background/80 backdrop-blur-xs backdrop-saturate-200" v-for="tab in tutorTabs" :key="tab.type"
        variant="outline" @click="currentTutor = tab.type"
        :class="{ 'text-blue-600 hover:text-blue-600 bg-blue-50/80 hover:bg-blue-50/80 dark:text-blue-400 dark:hover:text-blue-400 dark:bg-blue-950/60 dark:hover:bg-blue-950/60': isActiveTutorSection(tab.type) }">
        <component :is="tab.icon" :size="14" />
        {{ tab.label }}
      </Button>
    </ButtonGroup>
    <div class="mt-4">
      <Transition mode="out-in" :name="setting.transition">
        <AndroidTutor v-if="currentTutor == 'android'" />
        <IOSTutor v-else-if="currentTutor == 'ios'" />
        <PCTutor v-else-if="currentTutor == 'pc'" />
        <QA v-else />
      </Transition>
    </div>
  </div>
</template>
