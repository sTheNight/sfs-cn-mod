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
import { computed, ref, type Component, type Ref } from 'vue';
import AndroidTutor from './Tutorial/AndroidTutor.vue';
import IOSTutor from './Tutorial/iOSTutor.vue';
import PCTutor from './Tutorial/PCTutor.vue';
import QA from './Tutorial/QA.vue';
import { useSettingsStore } from '@/stores/settings.ts';
import { useI18n } from 'vue-i18n';

const currentTutor: Ref<TutorType> = ref("android")
const setting = useSettingsStore()
const { t } = useI18n()

const tutorTabs = computed<{ type: TutorType, label: string, icon: Component }[]>(() => [
  { type: "android", label: t('tutorial.android'), icon: BotIcon },
  { type: "ios", label: t('tutorial.ios'), icon: AppleIcon },
  { type: "pc", label: t('tutorial.pc'), icon: Laptop },
  { type: "qa", label: t('tutorial.qa'), icon: MessageCircleQuestionIcon },
])

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
