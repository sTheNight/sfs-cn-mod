<script setup lang="ts">
import AlertMessage from '@/components/AlertMessage.vue';
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
<template>
  <div class="flex flex-col gap-2">
    <BasicInfoCard :title="t('tutorialContent.qa.steps.0.title')">
      <template #tag>?</template>
      <p>{{ t('tutorialContent.qa.steps.0.description') }}</p>
    </BasicInfoCard>
    <BasicInfoCard :title="t('tutorialContent.qa.steps.1.title')">
      <template #tag>?</template>
      <p>{{ t('tutorialContent.qa.steps.1.description') }}</p>
    </BasicInfoCard>
    <BasicInfoCard :title="t('tutorialContent.qa.steps.2.title')">
      <template #tag>?</template>
      <p>{{ t('tutorialContent.qa.steps.2.description') }}</p>
    </BasicInfoCard>
    <BasicInfoCard :title="t('tutorialContent.qa.steps.3.title')">
      <template #tag>?</template>
      <p>{{ t('tutorialContent.qa.steps.3.description') }}</p>
    </BasicInfoCard>
    <BasicInfoCard :title="t('tutorialContent.qa.steps.4.title')">
      <template #tag>?</template>
      <p>{{ t('tutorialContent.qa.steps.4.description') }}</p>
    </BasicInfoCard>
    <AlertMessage type="info">
      {{ t('tutorialContent.qa.feedback') }}
    </AlertMessage>
  </div>
</template>
