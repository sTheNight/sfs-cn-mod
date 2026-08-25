<script setup lang="ts">
import { ref } from 'vue'

import BasicInfoCard from '@/components/Card/BasicInfoCard.vue'
import FloatButton from '@/components/FloatButton.vue'
import MyCustomButton from '@/components/MyCustomButton/MyCustomButton.vue'
import BasicSettingCard from '@/components/setting/BasicSettingCard.vue'
import SettingSection from '@/components/setting/SettingSection.vue'
import { showToast } from '@/components/Toast/useToast'
import { BadgeJapaneseYen } from '@lucide/vue'
import AlertMessage from '@/components/AlertMessage.vue'
import InputSettingCard from '@/components/setting/InputSettingCard.vue'

const bannerX = ref(0)
const bannerY = ref(0)
const bannerHovered = ref(false)

const testText = ref("Hello")
function handleSaveText(value: string) {
  testText.value = value
}

function handleBannerMouseMove(event: MouseEvent) {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  bannerX.value = event.clientX - rect.left
  bannerY.value = event.clientY - rect.top
}
</script>

<template>
  <div class="max-w-2xl mx-auto flex flex-col gap-2">
    <BasicInfoCard title="Toast">
      <MyCustomButton size="sm" class="text-xs" @click="showToast('Hello World')">
        Show
      </MyCustomButton>
      <AlertMessage class="mt-2">如果你能在生产环境看到我那说明我可能犯了个很傻逼的错误</AlertMessage>
    </BasicInfoCard>

    <BasicInfoCard title="Settings">
      <SettingSection name="Hello" class="max-w-100">
        <BasicSettingCard title="Hello World" description="你好，世界！">
          <FloatButton :icon="BadgeJapaneseYen" />
        </BasicSettingCard>

        <BasicSettingCard show-undo title="Hello World" description="你好，世界！">
          <MyCustomButton size="sm" class="text-xs" variant="outline">
            Click Me
          </MyCustomButton>
        </BasicSettingCard>

        <BasicSettingCard is-experiment title="Hello World" description="你好，世界！">
          <MyCustomButton size="sm" class="text-xs" variant="outline">
            Click Me
          </MyCustomButton>
        </BasicSettingCard>
        <InputSettingCard default-value="Hello World" title="Input Test" description="没有绑定外部值，内部值改变了就会显示撤销" />
        <InputSettingCard default-value="Hello World" :current-text="testText" @save="handleSaveText" title="Input Test"
          description="绑定了一个外部值，外部值改变了才会显示撤销" />
        <InputSettingCard default-value="Hello World" :save-while-undo="false" :current-text="testText"
          @save="handleSaveText" title="Input Test" description="绑定外部值，但撤销的时候不会立刻保存" />
      </SettingSection>
    </BasicInfoCard>

    <BasicInfoCard title="Banner">
      <div class="w-full h-50 rounded-2xl shadow-xs border overflow-hidden relative" @mousemove="handleBannerMouseMove"
        @mouseenter="bannerHovered = true" @mouseleave="bannerHovered = false">
        <div class="absolute inset-0 bg-cover bg-center bg-[url('/szm.png')]" />
        <div class="
            pointer-events-none
            absolute inset-0 z-10 backdrop-blur-xl
            bg-[radial-gradient(transparent_1px,var(--background)_1px)]
            bg-size-[4px_4px]
            transition-opacity duration-200
          " :class="bannerHovered ? 'opacity-40' : 'opacity-0'" :style="{
            maskImage: `radial-gradient(
              circle 120px at ${bannerX}px ${bannerY}px,
              black 0%,
              black 35%,
              transparent 100%
            )`,
            WebkitMaskImage: `radial-gradient(
              circle 120px at ${bannerX}px ${bannerY}px,
              black 0%,
              black 35%,
              transparent 100%
            )`,
          }" />
      </div>
    </BasicInfoCard>
  </div>
</template>
