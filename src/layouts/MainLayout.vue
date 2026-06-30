<script setup lang="ts">
import FloatButton from '@/components/FloatButton.vue';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { ArrowUp, CircleDollarSign, CompassIcon, InfoIcon, LogIn, PackageIcon, type LucideIcon } from '@lucide/vue';
import { useWindowScroll } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const WARNING_DIALOG_STORAGE_KEY = 'hide-warning-dialog-v1'

const route = useRoute()
const router = useRouter()

const { y } = useWindowScroll({
  behavior: "smooth"
})

const showBackTop = computed(() => y.value >= 400)

const isSponseDialogShow = ref(false)
const isWarningDialogShow = ref(localStorage.getItem(WARNING_DIALOG_STORAGE_KEY) !== 'true')
const isNeverShowDialog = ref(false)

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
    route: 'tutorial'
  },
  {
    icon: InfoIcon,
    title: '关于',
    key: 'info',
    route: 'info'
  }
]

function isActiveRoute(name: string) {
  return route.name == name
}

function exitTheSite() {
  window.close()
}

function backToTop() {
  y.value = 0
}

function closeDialog() {
  if (isNeverShowDialog.value) {
    localStorage.setItem(WARNING_DIALOG_STORAGE_KEY, 'true')
  }
  isWarningDialogShow.value = false
}
</script>
<template>
  <div class="w-full min-h-screen">
    <div class="fixed bottom-0 right-0 px-4 py-8 sm:px-8 sm:py-8 z-10 flex gap-5 flex-col justify-center items-center">
      <Transition name="float-button-fade" mode="out-in">
        <FloatButton @on-button-click="backToTop" :icon="ArrowUp" v-if="showBackTop" />
        <FloatButton v-else :icon="CircleDollarSign" @on-button-click="isSponseDialogShow = !isSponseDialogShow" />
      </Transition>
    </div>
    <Dialog v-model:open="isSponseDialogShow">
      <DialogContent>
        <div class="w-full h-full">
          <h2 class="text-5xl text-center py-4">❤️</h2>
          <h2 class="text-xl mt-2 font-bold text-center">赞助支持</h2>
          <p class="text-center text-sm m-2 text-gray-600">感谢你的支持，我们会继续更新优质汉化模组！</p>
          <div class="flex justify-center mt-2">
            <div class="border rounded-2xl p-4 shadow-md">
              <img src="https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/5.png" width="250">
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <Dialog v-model:open="isWarningDialogShow">
      <DialogContent @interact-outside.prevent @escape-key-down.prevent>
        <DialogHeader>
          <h2 class="text-xl font-bold">欢迎访问 SFS 汉化模组站</h2>
        </DialogHeader>
        <p class="text-gray-600 text-sm">
          本站所有模组均为汉化版本，仅供学习交流使用。<br />
          请于下载后24小时内删除，禁止用于商业用途。<br />
          下载前请确认您已了解模组安装方法。<br />
          点击确认进入下载中心。<br />
          QQ 交流反馈群923038827<br />
        </p>
        <p class="text-sm text-gray-600">
          额外说明：本站为重写版并非原站点，部分功能特性可能未同步，如有需要请访问<a class="px-2 outline-0 underline text-blue-500"
            href="https://sfszhmod.pages.dev/">原站点</a>
        </p>
        <p class="flex w-full justify-end items-center gap-2 text-sm">
          <Checkbox v-model:model-value="isNeverShowDialog" /> 不再显示
        </p>
        <DialogFooter>
          <div class="flex items-center justify-end gap-2.5">
            <Button @click="closeDialog">
              <LogIn /> 进入
            </Button>
            <Button @click="exitTheSite" variant="outline">退出</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <div class="w-full max-w-6xl min-h-screen ml-auto mr-auto px-4">
      <header class="w-full box-border flex items-center justify-center flex-col relative">
        <h2 class="animated-title my-24 text-2xl sm:text-3xl font-bold">汉化模组下载中心</h2>
        <!-- 兼容性问题暂时移除 -->
        <!-- <h2
          class="animated-title absolute top-1/2 left-1/2 -translate-1/2 text-2xl sm:text-3xl font-bold select-none -z-1 blur-2xl">
          汉化模组下载中心
        </h2> -->
      </header>
      <div class="flex gap-2 items-center justify-center mb-4">
        <Button v-for="(item, index) in routeButtons" :key="index"
          class="rounded-full select-none hover:scale-105 active:scale-95" variant="ghost"
          :class="{ 'text-blue-600 hover:text-blue-600 hover:bg-blue-50 bg-blue-50': isActiveRoute(item.key) }"
          @click="router.push(item.route)">
          <component :is="item.icon" :size="14" />
          {{ item.title }}
        </Button>
      </div>
      <RouterView v-slot="{ Component }">
        <Transition name="mainlayout-page-fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
      <div class=" h-28" aria-hidden="true"></div>
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

.mainlayout-page-fade-enter-active,
.mainlayout-page-fade-leave-active {
  transition:
    opacity .15s,
    transform .15s;
}

.mainlayout-page-fade-enter-from {
  opacity: 0;
  transform: translateX(5px);
}

.mainlayout-page-fade-leave-to {
  opacity: 0;
  transform: translateX(-5px);
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
</style>
