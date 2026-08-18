<script setup lang="ts">
import InfoCard from '@/components/ModInfo/InfoCard.vue';
import InfoTitle from '@/components/ModInfo/InfoTitle.vue';
import { MyCustomButton } from '@/components/MyCustomButton';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { ModInfo } from '@/models/ModInfo';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HistoryIcon,
  Image,
  LoaderCircle,
  SaveIcon,
  Star,
  UserRound,
  X,
  ZoomInIcon,
} from '@lucide/vue';
import axios, { isAxiosError } from 'axios';
import { computed, ref, watch } from 'vue';

interface ModInfoDialogProps {
  mod: ModInfo
}
interface Rating {
  count?: number,
  average?: number
}

const props = defineProps<ModInfoDialogProps>()
const emit = defineEmits<{
  download: [url: string]
}>()
const open = defineModel<boolean>('open', { default: false })

const isImagePreviewShow = ref(false)
const previewImageIndex = ref(0)

const rating = ref<Rating | undefined>()
const isRatingLoading = ref(false)
const ratingLoadFailed = ref(false)
let ratingRequestId = 0

const currentPreviewImage = computed(() => props.mod.images?.[previewImageIndex.value])
const hasMultiplePreviewImages = computed(() => (props.mod.images?.length ?? 0) > 1)
const normalizedRating = computed(() => Math.min(5, Math.max(0, Number(rating.value?.average) || 0)))
const hasRating = computed(() => (rating.value?.count ?? 0) > 0)
const formattedRating = computed(() => normalizedRating.value.toFixed(1))

function close() {
  open.value = false
}

function openImagePreview(index: number) {
  if (!props.mod.images?.length) return

  previewImageIndex.value = index
  isImagePreviewShow.value = true
}

function switchPreviewImage(offset: number) {
  const images = props.mod.images
  if (!images?.length) return

  previewImageIndex.value = (previewImageIndex.value + offset + images.length) % images.length
}

async function fetchModRating(name: string) {
  const requestId = ++ratingRequestId
  rating.value = undefined
  isRatingLoading.value = true
  ratingLoadFailed.value = false

  try {
    const response = await axios.get<Rating>(
      "https://sfszhmod.pages.dev/api/ratings",
      {
        params: {
          mod: name
        }
      }
    )
    if (requestId === ratingRequestId) rating.value = response.data
  } catch (e) {
    if (requestId === ratingRequestId) ratingLoadFailed.value = true
    if (isAxiosError(e)) {
      console.log(e)
    } else {
      console.log("???")
    }
  } finally {
    if (requestId === ratingRequestId) isRatingLoading.value = false
  }
}

watch(open, (isOpen) => {
  if (!isOpen) isImagePreviewShow.value = false
})

watch(
  [open, () => props.mod.name],
  ([isOpen, name]) => {
    if (isOpen && name) void fetchModRating(name)
  },
)
</script>
<template>
  <!-- 模组详情对话框 -->
  <Dialog v-model:open="open">
    <DialogContent
      class="w-[calc(100%-2rem)] max-h-[calc(100vh-2rem)] outline-0 border-0 max-w-150 sm:max-w-150 p-0 overflow-hidden"
      :show-close-button="false">
      <div class="scrollbar-hidden flex-1 overflow-y-auto max-h-[calc(100vh-2rem)] relative">
        <div class="relative">
          <div
            class="w-full z-2 h-full absolute bg-linear-to-t from-black/60 to-transparent flex justify-end flex-col p-4 backdrop-blur-xs">
            <h2 class="mod-title-transition text-white font-bold text-xl">
              {{ mod.name }}
            </h2>
            <div class="flex gap-1 mt-1">
              <span v-for="(tag, index) in mod.tags" :key="index"
                class="inline-block text-white/90 text-xs rounded-full bg-gray-200/20 px-2 py-0.5">
                {{ tag }}
              </span>
            </div>
          </div>
          <img v-if="mod.images?.length" class="w-full h-50 object-cover shrink-0" :src="mod.images[0]" />
          <div v-else class="h-50 flex bg-amber-100 dark:bg-amber-950/60 justify-center items-center text-6xl">
            📦
          </div>
        </div>
        <div class="px-6">
          <div
            class="text-muted-foreground text-sm grid py-4 gap-2 grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))]">
            <InfoCard title="作者" :icon="UserRound">{{ mod.author }}</InfoCard>
            <InfoCard title="版本" :icon="HistoryIcon">{{ mod.version }}</InfoCard>
            <InfoCard title="兼容版本" :icon="HistoryIcon">{{ mod.compat }}</InfoCard>
            <InfoCard title="更新日期" :icon="Calendar">{{ mod.date }}</InfoCard>
            <InfoCard title="大小" :icon="SaveIcon">{{ mod.size }}</InfoCard>
          </div>
          <InfoTitle :icon="FileText" title="简介" />
          <p class="text-muted-foreground text-sm mt-2">{{ mod.desc }}</p>
          <InfoTitle class="mt-4" :icon="Star" title="评分" />
          <div class="mt-2 flex min-h-5 items-center gap-2 text-sm text-muted-foreground">
            <template v-if="isRatingLoading">
              <LoaderCircle :size="14" class="animate-spin" />
              <span>加载中...</span>
            </template>
            <span v-else-if="ratingLoadFailed">评分暂时无法加载</span>
            <template v-else-if="hasRating">
              <span class="font-medium text-foreground tabular-nums">{{ formattedRating }}</span>
              <span>/ 5</span>
              <span class="h-3 w-px bg-border" aria-hidden="true"></span>
              <span>{{ rating?.count }} 人评分</span>
            </template>
            <span v-else>暂无评分</span>
          </div>
          <template v-if="mod.images?.length">
            <InfoTitle class="mt-4" :icon="Image" title="截图" />
            <div class="flex flex-wrap gap-1 mt-2">
              <div v-for="(img, index) in mod.images" :key="index"
                class="group box-border rounded-2xl relative overflow-hidden" @click="openImagePreview(index)">
                <div
                  class="absolute transition-all rounded-2xl duration-200 z-1 opacity-0 group-hover:opacity-100 w-full h-full bg-black/30 flex justify-center items-center">
                  <ZoomInIcon :size="16" color="white" />
                </div>
                <img class="w-48 h-24 object-cover transition-all duration-200 shrink-0 group-hover:scale-105"
                  :src="img" :alt="`${mod.name}截图 ${index + 1}`" loading="lazy" decoding="async">
              </div>
            </div>
          </template>
        </div>
        <div
          class="pointer-events-none sticky bottom-0 z-10 flex w-full justify-end gap-2 bg-linear-to-t from-background/90 via-background/80 via-20% to-transparent p-4">
          <MyCustomButton class="pointer-events-auto" variant="outline" @click.prevent="close">
            <X /> 关闭
          </MyCustomButton>
          <MyCustomButton class="pointer-events-auto" @click.prevent="emit('download', mod.link)">
            <Download />下载
          </MyCustomButton>
        </div>
      </div>
    </DialogContent>
  </Dialog>

  <!-- 截图预览器 -->
  <Dialog v-model:open="isImagePreviewShow">
    <DialogContent class="w-[calc(100%-2rem)] max-w-5xl border-0 bg-transparent p-0 shadow-none sm:max-w-5xl"
      :show-close-button="false">
      <div class="relative grid max-h-[calc(100vh-2rem)] overflow-hidden rounded-lg bg-black">
        <img v-if="currentPreviewImage" class="max-h-[calc(100vh-6rem)] w-full object-contain"
          :src="currentPreviewImage" :alt="`${mod.name}截图 ${previewImageIndex + 1}`">
        <MyCustomButton variant="ghost" size="icon"
          class="absolute right-2 top-2 text-white hover:bg-white/15 hover:text-white backdrop-blur-xl bg-black/10"
          aria-label="关闭预览" @click="isImagePreviewShow = false">
          <X />
        </MyCustomButton>
        <template v-if="hasMultiplePreviewImages">
          <MyCustomButton variant="ghost" size="icon"
            class="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/15 hover:text-white"
            aria-label="上一张截图" @click="switchPreviewImage(-1)">
            <ChevronLeft />
          </MyCustomButton>
          <MyCustomButton variant="ghost" size="icon"
            class="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/15 hover:text-white"
            aria-label="下一张截图" @click="switchPreviewImage(1)">
            <ChevronRight />
          </MyCustomButton>
        </template>
        <div v-if="mod.images?.length"
          class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
          {{ previewImageIndex + 1 }} / {{ mod.images.length }}
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
