<script setup lang="ts">
import BlueprintCard from '@/components/Blueprint/BlueprintCard.vue';
import { buttonVariants } from '@/components/MyCustomButton';
import MyCustomButton from '@/components/MyCustomButton/MyCustomButton.vue';
import type { Blueprint, BlueprintData } from '@/models/Blueprint';
import { RefreshCcw } from '@lucide/vue';
import axios from 'axios';
import { onMounted, ref, shallowRef } from 'vue';
import { useI18n } from 'vue-i18n';

const BLUEPRINT_URL = 'https://sfszhmod.pages.dev/data/blueprints.json'
const blueprints = shallowRef<Blueprint[]>([])
const isLoading = ref(true)
const loadError = ref('')
const { t } = useI18n()

async function loadBlueprintData() {
  isLoading.value = true
  loadError.value = ''

  try {
    const { data } = await axios.get<BlueprintData>(BLUEPRINT_URL, { timeout: 15000 })
    if (!Array.isArray(data?.blueprints)) {
      throw new TypeError(t('blueprints.invalidData'))
    }
    blueprints.value = data.blueprints
  } catch (error) {
    blueprints.value = []
    loadError.value = error instanceof Error ? error.message : t('blueprints.unknownError')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadBlueprintData()
})
function goDownload(url: string) {
  window.open(url, "_blank")
}
</script>

<template>
  <div>
    <div v-if="isLoading || loadError || blueprints.length === 0"
      class="p-16 mx-auto w-full max-w-2xl flex items-center justify-center text-sm text-muted-foreground select-none"
      role="status" aria-live="polite">
      <div v-if="isLoading">{{ t('common.loading') }}</div>
      <div v-else-if="loadError"
        class="text-red-600 dark:text-red-400 flex flex-col items-center gap-2 text-center break-all">
        <div>{{ t('blueprints.loadFailed', { error: loadError }) }}</div>
        <MyCustomButton type="button" :class="buttonVariants({ size: 'sm' })" @click="loadBlueprintData">
          <RefreshCcw />
          {{ t('common.retry') }}
        </MyCustomButton>
      </div>
      <div v-else>{{ t('blueprints.empty') }}</div>
    </div>

    <div v-else
      class="mt-4 grid w-full grid-cols-[minmax(0,1fr)] gap-4 mx-auto tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
      <BlueprintCard v-for="item in blueprints" :key="item.id" :item="item"
        @on-download-button-clicked="goDownload(item.link)" />
    </div>
  </div>
</template>
