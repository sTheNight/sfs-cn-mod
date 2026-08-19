<script setup lang="ts">
import { getCustomBackground } from '@/utils/customBackgroundStorage'
import { useSettingsStore } from '@/stores/settings'
import { onBeforeUnmount, ref, watch } from 'vue'

const settingsStore = useSettingsStore()
const imageUrl = ref('')

async function loadImage() {
  const previousUrl = imageUrl.value
  const image = await getCustomBackground()
  imageUrl.value = image ? URL.createObjectURL(image) : ''

  if (previousUrl) URL.revokeObjectURL(previousUrl)
}

watch(() => settingsStore.customBackgroundRevision, loadImage, { immediate: true })

onBeforeUnmount(() => {
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value)
})
</script>
<template>
  <div class="fixed inset-0 -z-1 overflow-hidden pointer-events-none" aria-hidden="true">
    <img v-if="imageUrl" :src="imageUrl" alt="" class="h-full w-full object-cover" />
    <div v-if="imageUrl" class="absolute inset-0"></div>
  </div>
</template>
