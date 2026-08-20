<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select';
import { files, getModInfo } from '@/data/modInfo';
import { categoryRecord, type ModCategory } from '@/models/Category';
import type { ModInfo } from '@/models/ModInfo';
import { Filter, Folder, RefreshCcw, Search, X } from '@lucide/vue';
import { onMounted, ref, watch } from 'vue';
import ModCard from '@/components/ModInfo/ModCard.vue';
import { MyCustomButton } from '@/components/MyCustomButton';
import AlertMessage from '@/components/AlertMessage.vue';
import { useRouter } from 'vue-router';
import CollapseTransition from '@/components/CollapseTransition.vue';

const shownList = ref<ModInfo[]>([])
const isLoading = ref(true)
const loadError = ref("")
const categoryFilter = ref<ModCategory>("all")
const searchText = ref("")
const isWarningAlertShow = ref(true)
const router = useRouter()

function getModListByCategory(category: ModCategory, source: ModInfo[] = files): ModInfo[] {
  if (category == "all") return source
  return source.filter((mod) => mod.category == category)
}

function getModListByKeyword(keyword: string, source: ModInfo[] = files): ModInfo[] {
  keyword = keyword.trim().toLowerCase()
  if (keyword === "") return source
  return source.filter((mod) =>
    mod.author.toLowerCase().includes(keyword) ||
    mod.name.toLowerCase().includes(keyword) ||
    mod.desc.toLowerCase().includes(keyword) ||
    mod.tags.some((tag) => tag.toLowerCase().includes(keyword))
  )
}

// 常规事件
function openModDetail(mod: ModInfo) {
  void router.push({ name: 'mod-details', params: { name: mod.name } })
}

function openUrl(url: string) {
  window.open(url, "_blank")
}

function applyFilter() {
  shownList.value = getModListByKeyword(searchText.value, getModListByCategory(categoryFilter.value))
}

function handleKeywordFilterKeyDown(e: KeyboardEvent) {
  if (e.key == "Enter") applyFilter()
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
    <!-- 检索栏 -->
    <div class="grid gap-2 text-sm sm:flex sm:items-center sm:justify-between select-none">
      <div class="flex items-center flex-wrap justify-between gap-2 sm:justify-start">
        <div
          class="border-input bg-card flex h-9 w-fit items-center gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-xs">
          <Folder :size="16" />
          <Transition name="switch-fade" mode="out-in">
            <span :key="shownList.length">共 {{ shownList.length }} 个文件</span>
          </Transition>
        </div>
        <Select v-model:model-value="categoryFilter">
          <!-- 这默认样式怎么这么奇葩😅 -->
          <SelectTrigger class="bg-card dark:bg-card dark:hover:bg-card">
            <div class="flex items-center gap-2">
              <Filter :size="16" />
              <span>{{ categoryRecord[categoryFilter] }}</span>
            </div>
          </SelectTrigger>
          <SelectContent class="bg-popover/80 backdrop-blur-xs">
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
        <Input v-model="searchText" class="min-w-0 text-sm bg-card dark:bg-card" placeholder="请输入关键字"
          @keydown="handleKeywordFilterKeyDown" />
        <MyCustomButton class="px-3 w-9 h-9" @click="applyFilter">
          <Search />
        </MyCustomButton>
      </div>
    </div>
    <CollapseTransition :show="isWarningAlertShow" scale>
      <AlertMessage class="mt-4 relative" type="warning">
        声明：本站所有汉化模组仅供学习交流，请于下载后24小时内删除，禁止用于商业用途。部分模组存在加载完报错、部件名称描述为空白等bug
        <!-- 这个按钮会遮挡文字 -->
        <MyCustomButton class="w-7 h-7 absolute top-2 right-2 rounded-full text-accent-foreground" variant="outline"
          @click="isWarningAlertShow = false">
          <X />
        </MyCustomButton>
      </AlertMessage>
    </CollapseTransition>
    <div v-if="isLoading || loadError || shownList.length === 0"
      class="p-16 ml-auto mr-auto w-full max-w-2xl flex items-center justify-center text-sm text-muted-foreground select-none">
      <div v-if="isLoading">
        加载中...
      </div>
      <div v-else-if="loadError" class="text-red-600 dark:text-red-400 flex flex-col justify-center items-center gap-2">
        <div>加载失败：{{ loadError }}</div>
        <div>
          <MyCustomButton size="sm" @click="loadModInfo(true)">
            <RefreshCcw />
            重试
          </MyCustomButton>
        </div>
      </div>
      <div v-else-if="shownList.length === 0">
        未找到符合条件的模组
      </div>
    </div>
    <div v-else
      class="mt-4 grid w-full grid-cols-[minmax(0,1fr)] gap-4 mx-auto tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4">
      <!-- 模组信息卡片 -->
      <ModCard v-for="(item, index) in shownList" :key="index" :item="item" @open-detail="openModDetail"
        @on-download-button-clicked="openUrl" />
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

.card-fade-enter-active,
.card-fade-leave-ective {
  transition: all .3s;
}

.card-fade-enter-from {
  transform: translateY(8px);
  opacity: 0;
}
</style>
