<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CircleDollarSign } from '@lucide/vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()

const isSponseDialogShow = ref(false)
</script>
<template>
  <div class="w-full h-full">
    <div class="fixed bottom-8 right-8 p-8">
      <div class="bg-blue-600 rounded-full p-4 z-100" @click="isSponseDialogShow = !isSponseDialogShow">
        <CircleDollarSign color="#fff" />
      </div>
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
    <div class="w-full max-w-6xl h-full ml-auto mr-auto pl-2 pr-2">
      <header class="w-full py-8 box-border flex items-center justify-center flex-col">
        <h2 class=" text-3xl font-bold">SFS Mod Center</h2>
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
