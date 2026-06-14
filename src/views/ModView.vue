<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { files, type ModInfo } from '@/data/modInfo';
import { Calendar, Download, FileText, Filter, Folder, History, Image, Info, Save, UserRound, X } from '@lucide/vue';
import { onMounted, ref, watchEffect } from 'vue';

const shownList = ref<ModInfo[]>([] as ModInfo[])
const penddingFile = ref<ModInfo>({} as ModInfo)
const isModDetailDialogShow = ref(false)
const categoryFilter = ref("none")

const categoryRecord: Record<string, string> = {
  "none": "未选择",
  "engine": "发动机",
  "function": "功能性部件",
  "entertain": "娱乐性部件",
  "skin": "涂装包",
}

function openModDetail(mod: ModInfo) {
  penddingFile.value = mod;
  isModDetailDialogShow.value = true;
}

function openUrl(url: string) {
  window.open(url, "_blank")
}

watchEffect(() => {
  if (categoryFilter.value == "none") {
    shownList.value = files
  } else {
    shownList.value = files.filter((value) => value.category == categoryFilter.value)
  }
})

onMounted(() => {
  shownList.value = files
})
</script>
<template>
  <div class="py-4">
    <Dialog v-model:open="isModDetailDialogShow">
      <DialogContent class="w-[calc(100%-2rem)] outline-0 border-0 max-w-150 sm:max-w-150 p-0 overflow-hidden"
        :show-close-button="false">
        <div>
          <div class="relative">
            <div
              class="w-full h-full absolute bg-linear-to-t from-black/60 to-transparent flex justify-end flex-col p-4">
              <h2 class="text-white font-bold text-xl">{{ penddingFile.name }}</h2>
              <div class="flex gap-1 mt-1">
                <span v-for="(tag, index) in penddingFile.tags" :key="index"
                  class="inline-block text-white/90 text-xs rounded-full bg-gray-200/20 px-2 py-0.5">{{ tag
                  }}</span>
              </div>
            </div>
            <img class="w-full h-50 object-cover shrink-0" v-if="penddingFile.images" :src="penddingFile.images[0]" />
            <div v-else class="h-50 flex bg-amber-100 justify-center items-center text-6xl">📦</div>
          </div>
          <div class="p-6">
            <h2 class="flex items-center gap-1 font-bold mb-1">
              <FileText :size="16" />简介
            </h2>
            <p class="text-gray-600 text-sm mt-2">{{ penddingFile.desc }}</p>
            <h2 class="flex items-center mt-4 gap-1 font-bold mb-1">
              <Info :size="16" />信息
            </h2>
            <p class="text-gray-600 text-sm mt-2">
              版本：{{ penddingFile.version }} |
              作者：{{ penddingFile.author }} |
              兼容版本：{{ penddingFile.compat }} |
              大小：{{ penddingFile.size }} |
              更新日期：{{ penddingFile.date }}
            </p>
            <template v-if="penddingFile.images">
              <h2 class="flex items-center mt-4 gap-1 font-bold mb-1">
                <Image :size="16" />截图
              </h2>
              <div class="flex gap-1 mt-2">
                <div class="box-border rounded-2xl overflow-hidden" v-for="(img, index) in penddingFile.images"
                  :key="index">
                  <img class="w-48 h-24 object-cover shrink-0" :src="img">
                </div>
              </div>
            </template>
            <div class="flex justify-end gap-2 mt-4">
              <Button variant="outline" @click="isModDetailDialogShow = false">
                <X /> 关闭
              </Button>
              <Button @click="openUrl(penddingFile.link)">
                <Download />下载
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <div class="flex items-center text-sm gap-2">
      <div
        class="border-input flex h-9 w-fit items-center gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs">
        <Folder :size="16" />
        共 {{ shownList.length }} 个文件
      </div>
      <Select v-model:model-value="categoryFilter">
        <SelectTrigger>
          <div class="flex items-center gap-2">
            <Filter :size="16" />
            {{ categoryRecord[categoryFilter] }}
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>分类</SelectLabel>
            <SelectItem v-for="(value, key) in categoryRecord" :key="key" :value="key">
              {{ value }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] mt-4">
      <div @click="openModDetail(item)"
        class="border rounded-2xl shadow-xs duration-150 transition-all h-150 overflow-hidden hover:shadow-xl hover:-translate-y-1 flex flex-col"
        v-for="(item, index) in shownList" :key="index">
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
  </div>
</template>
<style lang="css" scoped></style>
