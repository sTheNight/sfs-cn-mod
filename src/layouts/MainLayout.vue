<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { CircleDollarSign, LogIn } from '@lucide/vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

const isSponseDialogShow = ref(false)
const isWarningDialogShow = ref(true)

function exitTheSite() {
  window.close()
}
</script>
<template>
  <div class="w-full h-full">
    <div class="fixed bottom-10 right-10 bg-blue-600 rounded-full p-4 z-10 cursor-pointer"
      @click="isSponseDialogShow = !isSponseDialogShow">
      <CircleDollarSign color="#fff" />
    </div>
    <Dialog v-model:open="isSponseDialogShow">
      <DialogContent>
        <div class="w-full h-full">
          <h2 class="text-5xl text-center">❤️</h2>
          <h2 class="text-xl mt-2 font-bold text-center">赞助支持</h2>
          <p class="text-center text-sm m-2 text-gray-600">感谢你的支持，我们会继续更新优质汉化模组！</p>
          <div class="flex justify-center mt-2">
            <div class="border rounded-2xl p-4">
              <img src="https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/5.png" width="250">
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <Dialog v-model:open="isWarningDialogShow">
      <DialogContent>
        <DialogHeader>
          <h2 class="text-xl font-bold">欢迎访问 SFS 汉化模组站</h2>
        </DialogHeader>
        <p>
          本站所有模组均为汉化版本，仅供学习交流使用。<br />
          请于下载后24小时内删除，禁止用于商业用途。<br />
          下载前请确认您已了解模组安装方法。<br />
          点击确认进入下载中心。<br />
          upQQ交流反馈群923038827<br />
        </p>
        <DialogFooter>
          <div class="flex items-center justify-end gap-2.5">
            <Button @click="isWarningDialogShow = false">
              <LogIn /> 进入
            </Button>
            <Button @click="exitTheSite" variant="outline">退出</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <div class="w-full max-w-6xl h-full ml-auto mr-auto pl-2 pr-2">
      <header class="w-full py-12 box-border flex items-center justify-center flex-col">
        <h2 class="animated-title text-3xl font-bold">汉化模组下载中心</h2>
      </header>
      <div class="flex gap-1 items-center justify-center">
        <Button id="home" variant="ghost" @click="router.push('/')">首页</Button>
        <Button id="mod" variant="ghost" @click="router.push('/mods')">模组</Button>
        <Button id="tutor" variant="ghost" @click="router.push('/tutor')">教程</Button>
      </div>
      <RouterView v-slot="{ Component }">
        <Transition name="mainlayout-page-fade" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
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
  transition: all .2s;
}

.mainlayout-page-fade-enter-from,
.mainlayout-page-fade-leave-to {
  opacity: 0;
  filter: blur(4px);
}

.mainlayout-page-fade-enter-to,
.mainlayout-page-fade-leave-from {
  opacity: 1;
  filter: blur(0);
}
</style>
