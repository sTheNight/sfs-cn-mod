<script setup lang="ts">
import { getCustomBackground } from '@/utils/customBackgroundStorage'
import { useSettingsStore } from '@/stores/settings'
import { onBeforeUnmount, ref, watch } from 'vue'

const settingsStore = useSettingsStore()
const imageUrl = ref('')

async function loadImage() {
  if (settingsStore.imageBackgroundState.imageSource == 'url') {
    imageUrl.value = settingsStore.imageBackgroundState.name
    return
  }
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
    <img v-if="imageUrl" :src="imageUrl" alt="" class="absolute inset-0 size-full object-cover" />
    <div v-if="imageUrl" class="bg-img absolute inset-0" :style="{
      '--ol-blur-radius': `${settingsStore.imageBackgroundState.blur}px`
    }"></div>
    <div v-if="imageUrl" class="background-overlay absolute inset-0 bg-background" :style="{
      '--ol-opacity': settingsStore.imageBackgroundState.opacity,
    }"></div>
  </div>
</template>
<style scoped>
.background-overlay {
  opacity: var(--ol-opacity);
}

.bg-img {
  backdrop-filter: blur(var(--ol-blur-radius));
}
</style>
