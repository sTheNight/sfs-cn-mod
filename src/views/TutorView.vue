<script setup lang="ts">
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
import MyCustomButton from '@/components/MyCustomButton/MyCustomButton.vue';

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
    <div class="flex gap-2 flex-wrap">
      <MyCustomButton variant="outline" class="rounded-full" v-for="tab in tutorTabs" :key="tab.type"
        @click="currentTutor = tab.type"
        :class="{ 'text-blue-600 hover:text-blue-600 bg-blue-50 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-400 dark:bg-blue-950 dark:hover:bg-blue-950': isActiveTutorSection(tab.type) }">
        <component :is="tab.icon" :size="14" />
        {{ tab.label }}
      </MyCustomButton>
    </div>
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
