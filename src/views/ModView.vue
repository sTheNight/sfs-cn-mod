<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { files, getModInfo } from '@/data/modInfo';
import { categoryRecord, type ModCategory } from '@/models/Category';
import type { ModInfo } from '@/models/ModInfo';
import { Calendar, ChevronLeft, ChevronRight, Download, FileText, Filter, Folder, HistoryIcon, Image, InfoIcon, RefreshCcw, SaveIcon, Search, UserRound, X, ZoomInIcon } from '@lucide/vue';
import { computed, onMounted, ref, watch } from 'vue';
import InfoCard from '@/components/ModInfo/InfoCard.vue';
import InfoTitle from '@/components/ModInfo/InfoTitle.vue';
import ModCard from './Mod/ModCard.vue';
import FadeInCardProvider from '@/components/FadeInCardProvider.vue';

const shownList = ref<ModInfo[]>([])
const penddingFile = ref<ModInfo>({} as ModInfo)
const isModDetailDialogShow = ref(false)
const isImagePreviewShow = ref(false)
const isLoading = ref(true)
const loadError = ref("")
const previewImageIndex = ref(0)
const categoryFilter = ref<ModCategory>("all")
const searchText = ref("")

const currentPreviewImage = computed(() => penddingFile.value.images?.[previewImageIndex.value])
const hasMultiplePreviewImages = computed(() => (penddingFile.value.images?.length ?? 0) > 1)

function getModListByCategory(category: ModCategory, source: ModInfo[] = files): ModInfo[] {
  if (category == "all") return source
  return source.filter((mod) => mod.category == category)
}

function getModListByKeyword(keyword: string, source: ModInfo[] = files): ModInfo[] {
  keyword = keyword.trim()
  if (keyword === "") return source
  return source.filter((mod) =>
    mod.author.includes(keyword) ||
    mod.name.includes(keyword) ||
    mod.desc.includes(keyword) ||
    mod.tags.some((tag) => tag.includes(keyword))
  )
}

// 常规事件
async function openModDetail(mod: ModInfo) {
  penddingFile.value = mod;
  isModDetailDialogShow.value = true;
}

function closeModDetail() {
  isModDetailDialogShow.value = false
  isImagePreviewShow.value = false
}

function openImagePreview(index: number) {
  if (!penddingFile.value.images?.length) return

  previewImageIndex.value = index
  isImagePreviewShow.value = true
}

function switchPreviewImage(offset: number) {
  const images = penddingFile.value.images
  if (!images?.length) return

  previewImageIndex.value = (previewImageIndex.value + offset + images.length) % images.length
}

function openUrl(url: string) {
  window.open(url, "_blank")
}

function applyFilter() {
  shownList.value = getModListByKeyword(searchText.value, getModListByCategory(categoryFilter.value))
}

function handleKeywordFilterKeyDown(e: KeyboardEvent) {
  if (e.code == "Enter") applyFilter()
}

async function loadModInfo(forceRefresh = false) {
  isLoading.value = true
  loadError.value = ""

  try {
    await getModInfo(forceRefresh)
    applyFilter()
  } catch (error) {
    shownList.value = []
    loadError.value = error instanceof Error ? error.message : "加载失败"
  } finally {
    isLoading.value = false
  }
}

watch(categoryFilter, applyFilter)

onMounted(() => {
  void loadModInfo()
})
</script>
<template>
  <div>
    <!-- 模组详情对话框 -->
    <Dialog v-model:open="isModDetailDialogShow">
      <DialogContent
        class="w-[calc(100%-2rem)] max-h-[calc(100vh-2rem)] outline-0 border-0 max-w-150 sm:max-w-150 p-0 overflow-hidden"
        :show-close-button="false">
        <div class="scrollbar-hidden flex-1 overflow-y-auto max-h-[calc(100vh-2rem)] relative">
          <div class="relative">
            <div
              class="w-full z-2 h-full absolute bg-linear-to-t from-black/60 to-transparent flex justify-end flex-col p-4 backdrop-blur-xs">
              <h2 class="mod-title-transition text-white font-bold text-xl">
                {{ penddingFile.name }}
              </h2>
              <div class="flex gap-1 mt-1">
                <span v-for="(tag, index) in penddingFile.tags" :key="index"
                  class="inline-block text-white/90 text-xs rounded-full bg-gray-200/20 px-2 py-0.5">{{
                    tag
                  }}</span>
              </div>
            </div>
            <img class="w-full h-50 object-cover shrink-0" v-if="penddingFile.images?.length"
              :src="penddingFile.images[0]" />
            <div v-else class="h-50 flex bg-amber-100 justify-center items-center text-6xl">📦</div>
          </div>
          <div class="p-6">
            <InfoTitle :icon="FileText" title="简介" />
            <p class="text-gray-600 text-sm mt-2">{{ penddingFile.desc }}</p>
            <InfoTitle class="mt-4" :icon="InfoIcon" title="信息" />
            <div class="text-gray-600 text-sm mt-2 grid gap-2 grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))]">
              <InfoCard title="作者" :icon="UserRound">{{ penddingFile.author }}</InfoCard>
              <InfoCard title="版本" :icon="HistoryIcon">{{ penddingFile.version }}</InfoCard>
              <InfoCard title="兼容版本" :icon="HistoryIcon">{{ penddingFile.compat }}</InfoCard>
              <InfoCard title="更新日期" :icon="Calendar">{{ penddingFile.date }}</InfoCard>
              <InfoCard title="大小" :icon="SaveIcon">{{ penddingFile.size }}</InfoCard>
            </div>
            <template v-if="penddingFile.images?.length">
              <InfoTitle class="mt-4" :icon="Image" title="截图" />
              <div class="flex flex-wrap gap-1 mt-2">
                <div class="group box-border rounded-2xl relative overflow-hidden" @click="openImagePreview(index)"
                  v-for="(img, index) in penddingFile.images" :key="index">
                  <div
                    class="absolute transition-all rounded-2xl duration-200 z-1 opacity-0 group-hover:opacity-100 w-full h-full bg-black/30 flex justify-center items-center">
                    <ZoomInIcon :size="16" color="white" />
                  </div>
                  <img class="w-48 h-24 object-cover transition-all duration-200 shrink-0 group-hover:scale-105"
                    :src="img" :alt="`${penddingFile.name}截图 ${index + 1}`" loading="lazy" decoding="async">
                </div>
              </div>
            </template>
          </div>
          <div
            class="pointer-events-none sticky bottom-0 z-10 flex w-full justify-end gap-2 bg-linear-to-t from-white via-white/90 via-20% to-transparent p-4">
            <Button class="pointer-events-auto" variant="outline" @click.prevent="closeModDetail">
              <X /> 关闭
            </Button>
            <Button class="pointer-events-auto" @click.prevent="openUrl(penddingFile.link)">
              <Download />下载
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <!-- 截图预览器 -->
    <Dialog :open="isImagePreviewShow" @update:open="isImagePreviewShow = $event">
      <DialogContent class="w-[calc(100%-2rem)] max-w-5xl border-0 bg-transparent p-0 shadow-none sm:max-w-5xl"
        :show-close-button="false">
        <div class="relative grid max-h-[calc(100vh-2rem)] overflow-hidden rounded-lg bg-black">
          <img v-if="currentPreviewImage" class="max-h-[calc(100vh-6rem)] w-full object-contain"
            :src="currentPreviewImage" :alt="`${penddingFile.name}截图 ${previewImageIndex + 1}`">
          <Button variant="ghost" size="icon"
            class="absolute right-2 top-2 text-white hover:bg-white/15 hover:text-white" aria-label="关闭预览"
            @click="isImagePreviewShow = false">
            <X />
          </Button>
          <template v-if="hasMultiplePreviewImages">
            <Button variant="ghost" size="icon"
              class="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/15 hover:text-white"
              aria-label="上一张截图" @click="switchPreviewImage(-1)">
              <ChevronLeft />
            </Button>
            <Button variant="ghost" size="icon"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/15 hover:text-white"
              aria-label="下一张截图" @click="switchPreviewImage(1)">
              <ChevronRight />
            </Button>
          </template>
          <div v-if="penddingFile.images?.length"
            class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
            {{ previewImageIndex + 1 }} / {{ penddingFile.images.length }}
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <!-- 检索栏 -->
    <div class="grid gap-2 text-sm sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center flex-wrap justify-between gap-2 sm:justify-start">
        <div
          class="border-input flex h-9 w-fit items-center gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs">
          <Folder :size="16" />
          <Transition name="switch-fade" mode="out-in">
            <span :key="shownList.length">共 {{ shownList.length }} 个文件</span>
          </Transition>
        </div>
        <Select v-model:model-value="categoryFilter">
          <SelectTrigger>
            <div class="flex items-center gap-2">
              <Filter :size="16" />
              <span>{{ categoryRecord[categoryFilter] }}</span>
            </div>
          </SelectTrigger>
          <SelectContent class="bg-white/80 backdrop-blur-xs">
            <SelectGroup>
              <SelectLabel>分类</SelectLabel>
              <SelectItem v-for="(value, key) in categoryRecord" :key="key" :value="key">
                {{ value }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
        <Input v-model="searchText" class="min-w-0 text-sm" placeholder="请输入关键字"
          @keydown="handleKeywordFilterKeyDown" />
        <Button class="px-3" @click="applyFilter">
          <Search />
        </Button>
      </div>
    </div>
    <div v-if="isLoading || loadError || shownList.length === 0"
      class="p-16 ml-auto mr-auto w-full max-w-2xl flex items-center justify-center text-sm text-gray-600 select-none">
      <div v-if="isLoading">
        加载中...
      </div>
      <div v-else-if="loadError" class="text-red-600 flex flex-col justify-center items-center gap-2">
        <div>加载失败：{{ loadError }}</div>
        <div>
          <Button size="sm" @click="loadModInfo(true)">
            <RefreshCcw />
            重试
          </Button>
        </div>
      </div>
      <div v-else-if="shownList.length === 0">
        未找到符合条件的模组
      </div>
    </div>
    <div v-else class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] mt-4">
      <!-- 模组信息卡片 -->
      <FadeInCardProvider v-for="(item, index) in shownList" :key="index">
        <ModCard :item="item" @open-detail="openModDetail" @on-download-button-clicked="openUrl" />
      </FadeInCardProvider>
    </div>
  </div>
</template>
<style lang="css" scoped>
.switch-fade-enter-active,
.switch-fade-leave-active {
  transition: all .2s;
}

.switch-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.switch-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.scrollbar-hidden {
  scrollbar-width: none;
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.card-fade-enter-active,
.card-fade-leave-ective {
  transition: all .3s;
}

.card-fade-enter-from {
  transform: translateY(8px);
  opacity: 0;
}
</style>
