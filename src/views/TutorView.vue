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
import AnrdoidTutor from './Tutor/AnrdoidTutor.vue';
import IOSTutor from './Tutor/iOSTutor.vue';
import PCTutor from './Tutor/PCTutor.vue';
import QA from './Tutor/QA.vue';

const currentTutor: Ref<TutorType> = ref("android")

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
  <div class="w-full max-w-2xl ml-auto mr-auto relative">
    <ButtonGroup class="ml-auto mr-auto sticky top-4 z-5">
      <Button v-for="tab in tutorTabs" :key="tab.type" variant="outline" @click="currentTutor = tab.type"
        :class="{ 'text-blue-600 hover:text-blue-600': isActiveTutorSection(tab.type) }">
        <component :is="tab.icon" :size="14" />
        {{ tab.label }}
      </Button>
    </ButtonGroup>
    <div class="mt-4">
      <Transition mode="out-in" name="tutor-section-fade">
        <AnrdoidTutor v-if="currentTutor == 'android'" />
        <IOSTutor v-else-if="currentTutor == 'ios'" />
        <PCTutor v-else-if="currentTutor == 'pc'" />
        <QA v-else />
      </Transition>
    </div>
  </div>
</template>

<style lang="css" scoped>
.tutor-section-fade-enter-active,
.tutor-section-fade-leave-active {
  transition: all .15s;
}

.tutor-section-fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.tutor-section-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
