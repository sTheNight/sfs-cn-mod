<script setup lang="ts">
import FloatButton from '@/components/FloatButton.vue';
import { MyCustomButton } from '@/components/MyCustomButton';
import SettingsDrawer from '@/components/SettingsDrawer.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { useSettingsStore } from '@/stores/settings';
import { ArrowUp, CircleDollarSign, CompassIcon, InfoIcon, LogIn, PackageIcon, Settings, type LucideIcon } from '@lucide/vue';
import { useWindowScroll } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import GridBackground from '@/components/Background/GridBackground.vue';
import ImageBackground from '@/components/Background/ImageBackground.vue';

const route = useRoute()
const router = useRouter()

const { y } = useWindowScroll({
  behavior: "smooth"
})

const showBackTop = computed(() => y.value >= 400)

const isSponsorDialogShow = ref(false)
const isNeverShowDialogCheck = ref(false)
const isSettingDrawerShow = ref(false);

const settingsStore = useSettingsStore()
const { transition } = storeToRefs(settingsStore)
const { setNeverShowWarningDialog, neverShowWarningDialog } = settingsStore
const showWarningDialog = ref(true)

const floatGroupRef = useTemplateRef("float-group")
const safePadding = ref<number>(0)

const isShowWarningDialog = computed<boolean>({
  get() {
    if (!neverShowWarningDialog && showWarningDialog.value) return true
    else return false
  },
  set(newValue) {
    showWarningDialog.value = newValue
  }
})

interface RouteButton {
  icon: LucideIcon,
  title: string,
  key: string,
  route: string
}

const routeButtons: RouteButton[] = [
  {
    icon: PackageIcon,
    title: "模组",
    key: 'mod',
    route: '/'
  },
  {
    icon: CompassIcon,
    title: '教程',
    key: 'tutorial',
    route: '/tutorial'
  },
  {
    icon: InfoIcon,
    title: '关于',
    key: 'info',
    route: '/info'
  }
]

const activeRouteIndex = computed(() => {
  const index = routeButtons.findIndex(item => isActiveRoute(item.key))
  return index === -1 ? 0 : index
})

function isActiveRoute(name: string) {
  if (name === 'mod') return route.name === 'mod' || route.name === 'mod-details'
  return route.name == name
}

function backToTop() {
  y.value = 0
}

function closeWarningDialog() {
  isShowWarningDialog.value = false
  setNeverShowWarningDialog(isNeverShowDialogCheck.value)
}

onMounted(() => {
  if (floatGroupRef.value?.offsetHeight) {
    safePadding.value = floatGroupRef.value.offsetHeight
  }
})
</script>
<template>
  <div class="relative isolate w-full min-h-screen">
    <template v-if="!(settingsStore.background == 'none')">
      <GridBackground v-if="settingsStore.background == 'grid'" />
      <ImageBackground v-if="settingsStore.background == 'custom-image'" />
    </template>
    <div ref="float-group"
      class="fixed bottom-0 right-0 px-4 py-8 sm:px-8 sm:py-8 z-10 flex gap-5 flex-col justify-center items-center">
      <Transition name="float-button-fade" mode="out-in">
        <FloatButton @on-button-click="backToTop" :icon="ArrowUp" v-if="showBackTop" />
        <FloatButton v-else :icon="CircleDollarSign" @on-button-click="isSponsorDialogShow = !isSponsorDialogShow" />
      </Transition>
      <FloatButton :icon="Settings" @on-button-click="isSettingDrawerShow = true"></FloatButton>
    </div>
    <Dialog v-model:open="isSponsorDialogShow">
      <DialogContent>
        <div class="w-full h-full">
          <h2 class="text-5xl text-center py-4">❤️</h2>
          <h2 class="text-xl mt-2 font-bold text-center">赞助支持</h2>
          <p class="text-center text-sm m-2 text-muted-foreground">感谢你的支持，我们会继续更新优质汉化模组！</p>
          <div class="flex justify-center mt-2">
            <div class="border rounded-2xl p-4 shadow-md">
              <img src="https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/5.png" width="250">
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <SettingsDrawer v-model:open="isSettingDrawerShow" />
    <Dialog v-model:open="isShowWarningDialog">
      <DialogContent @interact-outside.prevent @escape-key-down.prevent>
        <DialogHeader>
          <h2 class="text-xl font-bold">欢迎访问 SFS 汉化模组站</h2>
        </DialogHeader>
        <p class="text-muted-foreground text-sm">
          本站所有模组均为汉化版本，仅供学习交流使用。<br />
          下载前请确认您已了解模组安装方法。<br />
        </p>
        <p class="text-sm text-muted-foreground">
          额外说明：本站为重写版并非原站点，部分功能特性可能未同步，如有需要请访问<a class="px-2 outline-0 underline text-blue-500"
            href="https://sfszhmod.pages.dev/">原站点</a>
        </p>
        <div class="flex w-full justify-end text-sm">
          <div class="flex items-center gap-2 select-none" @click="isNeverShowDialogCheck = !isNeverShowDialogCheck">
            <Checkbox @click.stop.prevent v-model:model-value="isNeverShowDialogCheck" /> 不再显示
          </div>
        </div>
        <DialogFooter>
          <div class="flex items-center justify-end gap-2.5">
            <MyCustomButton @click="closeWarningDialog">
              <LogIn /> 进入
            </MyCustomButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <div class="w-full max-w-7xl min-h-screen ml-auto mr-auto px-4">
      <header class="w-full box-border flex items-center justify-center flex-col relative">
        <h2 class="animated-title my-24 text-2xl sm:text-3xl font-bold">汉化模组下载中心</h2>
        <h2 v-if="settingsStore.enableTitleGlow && settingsStore.enableAnimations"
          class="animated-title absolute top-1/2 left-1/2 -translate-1/2 text-2xl sm:text-3xl font-bold select-none -z-1 blur-2xl">
          汉化模组下载中心
        </h2>
      </header>
      <div class="flex items-center justify-center mb-4">
        <div class="border bg-card-surface p-1.5 rounded-full shadow-xs"
          :class="settingsStore.cardBlurEffect ? 'backdrop-blur-lg' : ''">
          <div class="relative grid grid-cols-3 gap-2 items-center justify-center">
            <span aria-hidden="true"
              class="route-button-indicator absolute inset-y-0 left-0 rounded-full bg-blue-100/50 dark:bg-blue-950/60"
              :class="{ 'route-button-indicator-animated': settingsStore.enableAnimations }"
              :style="{ transform: `translateX(calc(${activeRouteIndex} * (100% + 0.5rem)))` }" />
            <MyCustomButton v-for="(item, index) in routeButtons" :key="index"
              class="relative z-1 rounded-full active:scale-90 select-none cursor-pointer" variant="ghost"
              :class="{ 'text-blue-600 hover:text-blue-600 hover:bg-transparent dark:text-blue-400 dark:hover:text-blue-400 dark:hover:bg-transparent': isActiveRoute(item.key) }"
              @click="router.push(item.route)">
              <component :is="item.icon" :size="14" />
              {{ item.title }}
            </MyCustomButton>
          </div>
        </div>
      </div>
      <RouterView v-slot="{ Component }">
        <Transition :name="transition" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
      <div :style="{ height: `${safePadding}px` }" aria-hidden="true">
        <div class="flex flex-wrap p-3 justify-center gap-3 font-mono">
          <a tabindex="-1"
            class="flex items-center justify-center gap-1 outline-0 text-xs text-muted-foreground cursor-pointer transition-colors hover:text-accent-foreground"
            href="https://github.com/sTheNight/sfs-cn-mod" target="_blank">
            <svg class="w-4 h-4 box-border " role="img" viewBox="0 0 24 24" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Github
          </a>
          <a tabindex="-1"
            class="flex items-center justify-center gap-1 outline-0 text-xs text-muted-foreground cursor-pointer transition-colors hover:text-accent-foreground"
            href="https://qm.qq.com/q/8kXMyVI00g" target="_blank">
            <svg class="w-4 h-4 box-border " role="img" fill="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673" />
            </svg>
            Feedback
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.animated-title {
  background: linear-gradient(90deg, #2563eb, #06b6d4, #8b5cf6, #2563eb);
  background-size: 300% 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: title-gradient 4s ease-in-out infinite;
}

@keyframes title-gradient {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.float-button-fade-enter-active,
.float-button-fade-leave-active {
  transition:
    transform .15s,
    opacity .15s;
}

.float-button-fade-enter-from,
.float-button-fade-leave-to {
  transform: scale(0.2);
  opacity: 0;
}

.route-button-indicator {
  width: calc((100% - 1rem) / 3);
}

.route-button-indicator-animated {
  transition: transform 300ms cubic-bezier(.22, 1, .36, 1);
}
</style>

<style lang="css">
/* X 轴切换过渡动画 */
.x-fade-enter-active,
.x-fade-leave-active {
  transition:
    opacity .15s,
    transform .15s;
}

.x-fade-enter-from {
  opacity: 0;
  transform: translateX(5px);
}

.x-fade-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}

/* Y 轴切换过渡动画 */
.y-fade-enter-active,
.y-fade-leave-active {
  transition:
    opacity .15s,
    transform .15s;
}

.y-fade-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.y-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* 淡入淡出 */
.opacity-fade-enter-active,
.opacity-fade-leave-active {
  transition: opacity .15s;
}

.opacity-fade-enter-from,
.opacity-fade-leave-to {
  opacity: 0;
}
</style>
