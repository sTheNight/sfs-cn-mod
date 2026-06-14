<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { files } from '@/data/modInfo';
import { Calendar, Download, History, Info, Save, UserRound } from '@lucide/vue';
function openUrl(url: string) {
  window.open(url, "_blank")
}
</script>
<template>
  <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-4">
    <div
      class="border rounded-2xl shadow-xs duration-150 transition-all h-[600px] overflow-hidden hover:shadow-xl hover:-translate-y-2 flex flex-col"
      v-for="(item, index) in files" :key="index">
      <img class="w-full h-50 object-cover shrink-0" v-if="item.images" :src="item.images[0]" />
      <div v-else class="h-50 flex bg-amber-100 justify-center items-center text-6xl">📦</div>
      <div class="p-4 flex flex-col flex-1 min-h-0">
        <div class="flex-1 min-h-0">
          <h2 class="font-bold text-[18px]">{{ item.name }}</h2>
          <div class="text-xs text-gray-600 mt-2 flex items-center gap-2">
            <span class="flex items-center justify-center gap-1">
              <UserRound :size="12" /><span>{{ item.author }}</span>
            </span>
            <span class="flex items-center justify-center gap-1">
              <History :size="12" /><span>{{ item.version }}</span>
            </span>
          </div>
          <div class="flex gap-2 mt-2">
            <div class="inline-block text-[12px] rounded-full bg-gray-200 text-gray-600 px-2 py-0.5"
              v-for="(tag, index) in item.tags" :key="index">
              {{ tag }}
            </div>
          </div>
          <p class="mt-4 text-gray-600 text-sm">{{ item.desc }}</p>
        </div>
        <div class="shrink-0">
          <div class="text-xs flex items-center border rounded-lg p-2 bg-gray-100">
            <Save :size="16" class="mr-1" />{{ item.size }}
          </div>
          <div class="text-xs flex items-center border rounded-lg p-2 bg-gray-100 mt-2">
            <Calendar :size="16" class="mr-1" />{{ item.date }}
          </div>
          <div class="flex w-full justify-end mt-4 gap-2">
            <Button variant="outline">
              <Info />
              详情
            </Button>
            <Button @click="openUrl(item.link)">
              <Download />
              下载
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="css" scoped></style>
