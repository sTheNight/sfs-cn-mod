<script setup lang="ts">
import MyCustomButton from '@/components/MyCustomButton/MyCustomButton.vue';
import { ArrowLeft, PackageX } from '@lucide/vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const router = useRouter()
const { t } = useI18n()
</script>
<template>
  <div class="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
    <PackageX :size="36" class="text-muted-foreground" />
    <div>
      <h2 class="font-semibold">{{ t('notFound.title') }}</h2>
      <p class="mt-1 text-sm text-muted-foreground">{{ t('notFound.description') }}</p>
    </div>
    <MyCustomButton variant="outline" @click="router.push('/')">
      <ArrowLeft />{{ t('notFound.home') }}
    </MyCustomButton>
  </div>
</template>
