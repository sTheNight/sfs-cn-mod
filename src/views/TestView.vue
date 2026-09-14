<script setup lang="ts">
import { computed, ref } from 'vue'

import BasicInfoCard from '@/components/Card/BasicInfoCard.vue'
import FloatButton from '@/components/FloatButton.vue'
import MyCustomButton from '@/components/MyCustomButton/MyCustomButton.vue'
import BasicSettingCard from '@/components/setting/BasicSettingCard.vue'
import SettingSection from '@/components/setting/SettingSection.vue'
import { showToast } from '@/components/Toast/useToast'
import { BadgeJapaneseYen } from '@lucide/vue'
import AlertMessage from '@/components/AlertMessage.vue'
import InputSettingCard from '@/components/setting/InputSettingCard.vue'
import { useWindowScroll } from '@vueuse/core'

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
const { y } = useWindowScroll({
  behavior: "smooth"
})
const showMinimalToolbar = computed(() => y.value >= 350)
</script>

<template>
  <div class="max-w-2xl mx-auto flex flex-col gap-2">
    <div class="w-full h-50 overflow-hidden rounded-2xl isolate relative">
      <div class="bg-cover rounded-2xl border bg-gray-100 w-full h-full"></div>
      <div class="absolute inset-0 z-2 p-2">{{ showMinimalToolbar }}{{ y }}</div>
    </div>
    <Transition mode="out-in" name="title-fade">
      <div class="fixed p-2 top-1 shadow h-20 border rounded-2xl w-full max-w-2xl z-10 bg-gray-100"
        v-if="showMinimalToolbar">
        123
      </div>
    </Transition>
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
        <InputSettingCard disabled default-value="Hello World" title="Input Test" description="我被禁用了" />
        <InputSettingCard default-value="Hello World" :current-text="testText" @save="handleSaveText" title="Input Test"
          description="绑定了一个外部值，外部值改变了才会显示撤销" />
        <InputSettingCard default-value="Hello World" :save-while-undo="false" :current-text="testText"
          @save="handleSaveText" title="Input Test" description="绑定外部值，但撤销的时候不会立刻保存" />
      </SettingSection>
    </BasicInfoCard>

    <BasicInfoCard title="Banner">
      <div class="w-full h-50 rounded-2xl shadow-xs border overflow-hidden relative" @mousemove="handleBannerMouseMove"
        @mouseenter="bannerHovered = true" @mouseleave="bannerHovered = false">
        <div class="absolute inset-0 bg-cover bg-center bg-[url('/szm.webp')]" />
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
<style lang="css" scoped>
.title-fade-enter-active,
.title-fade-leave-active {
  transition: transform .2s;
}

.title-fade-enter-from,
.title-fade-leave-to {
  transform: translateY(-100px);
}
</style>
