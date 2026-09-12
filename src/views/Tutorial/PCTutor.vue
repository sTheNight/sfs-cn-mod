<script setup lang="ts">
import AlertMessage from '@/components/AlertMessage.vue';
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import MyCode from '@/components/MyCode.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
<template>
  <div class="flex flex-col gap-2">
    <AlertMessage type="error">
      {{ t('tutorialContent.pc.warning') }}
    </AlertMessage>
    <BasicInfoCard :title="t('tutorialContent.pc.steps.0.title')">
      <template #tag>①</template>
      <p>{{ t('tutorialContent.pc.steps.0.description') }}</p>
    </BasicInfoCard>
    <BasicInfoCard :title="t('tutorialContent.pc.steps.1.title')">
      <template #tag>②</template>
      <p>{{ t('tutorialContent.pc.steps.1.description') }}</p>
      <MyCode>{{ t('tutorialContent.pc.steps.1.code') }}</MyCode>
    </BasicInfoCard>
    <BasicInfoCard :title="t('tutorialContent.pc.steps.2.title')">
      <template #tag>③</template>
      <p>{{ t('tutorialContent.pc.steps.2.description') }}</p>
      <MyCode>{{ t('tutorialContent.pc.steps.2.code') }}</MyCode>
    </BasicInfoCard>
    <BasicInfoCard :title="t('tutorialContent.pc.steps.3.title')">
      <template #tag>④</template>
      <p>{{ t('tutorialContent.pc.steps.3.description') }}</p>
    </BasicInfoCard>
    <AlertMessage type="info">
      <b>{{ t('tutorialContent.tipLabel') }}</b>{{ t('tutorialContent.pc.tip') }}
    </AlertMessage>
  </div>
</template>
