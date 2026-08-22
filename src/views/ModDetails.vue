<script setup lang="ts">
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import FloatButton from '@/components/FloatButton.vue';
import InfoCard from '@/components/ModInfo/InfoCard.vue';
import { MyCustomButton } from '@/components/MyCustomButton';
import { showToast } from '@/components/Toast/useToast';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { files, getModInfo } from '@/data/modInfo';
import type { ModInfo } from '@/models/ModInfo';
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  HistoryIcon,
  Image,
  LoaderCircle,
  PackageX,
  SaveIcon,
  Share2,
  SquarePen,
  Star,
  UserRound,
  X,
  ZoomInIcon,
} from '@lucide/vue';
import axios, { isAxiosError } from 'axios';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Rating {
  count: number
  average: number,
  myScore: number
}

const route = useRoute()
const router = useRouter()

const mod = ref<ModInfo>()
const isLoading = ref(true)
const loadError = ref('')

const rating = ref<Rating>()
const isRatingLoading = ref(false)
const ratingLoadFailed = ref(false)
let ratingRequestId = 0

const isImagePreviewShow = ref(false)
const previewImageIndex = ref(0)

const currentPreviewImage = computed(() => mod.value?.images?.[previewImageIndex.value])
const hasMultiplePreviewImages = computed(() => (mod.value?.images?.length ?? 0) > 1)
const normalizedRating = computed(() => Math.min(5, Math.max(0, Number(rating.value?.average) || 0)))
const formattedRating = computed(() => normalizedRating.value.toFixed(1))
const hasRating = computed(() => (rating.value?.count ?? 0) > 0)

const isRatingDialogShow = ref(false)
const pendingRating = ref(0)

function goBack() {
  if (window.history.length > 1) router.back()
  else void router.push('/')
}

function openUrl(url: string) {
  window.open(url, '_blank')
}

function openImagePreview(index: number) {
  if (!mod.value?.images?.length) return

  previewImageIndex.value = index
  isImagePreviewShow.value = true
}

function switchPreviewImage(offset: number) {
  const images = mod.value?.images
  if (!images?.length) return

  previewImageIndex.value = (previewImageIndex.value + offset + images.length) % images.length
}

function getStarFill(index: number) {
  const fill = Math.min(1, Math.max(0, normalizedRating.value - index + 1))
  return `${fill * 100}%`
}

async function share() {
  const url = window.location.href
  if (!navigator.share) {
    navigator.clipboard.writeText(url)
    showToast("已复制链接")
    return;
  }
  showToast("正在调起分享")
  await navigator.share({
    title: '分享这个模组',
    url: url
  })
}

async function submitScore(score: number) {
  if (!mod.value) return;
  try {
    const response = await axios.post(
      "https://sfszhmod.pages.dev/api/ratings",
      {
        mod: mod.value?.name,
        score
      }
    )
    rating.value = response.data
  } catch (e) {
    console.log(e)
  } finally {
    isRatingDialogShow.value = false
  }
}

async function loadMod(name: string) {
  isLoading.value = true
  loadError.value = ''
  mod.value = undefined

  try {
    await getModInfo()
    mod.value = files.find((item) => item.name === name)
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : '加载失败'
  } finally {
    isLoading.value = false
  }
}

async function fetchModRating(name: string) {
  const requestId = ++ratingRequestId
  rating.value = undefined
  isRatingLoading.value = true
  ratingLoadFailed.value = false

  try {
    const response = await axios.get<Rating>('https://sfszhmod.pages.dev/api/ratings', {
      params: { mod: name },
    })
    if (requestId === ratingRequestId) {
      rating.value = response.data
      if (rating.value.myScore > 0)
        pendingRating.value = rating.value.myScore
    }
  } catch (error) {
    if (requestId === ratingRequestId) ratingLoadFailed.value = true
    if (isAxiosError(error)) console.error(error)
  } finally {
    if (requestId === ratingRequestId) isRatingLoading.value = false
  }
}

watch(
  () => String(route.params.name ?? ''),
  (name) => {
    if (name) void loadMod(name)
  },
  { immediate: true },
)

watch(
  () => mod.value?.name,
  (name) => {
    if (name) void fetchModRating(name)
  },
)
</script>

<template>
  <div class="mx-auto w-full max-w-4xl relative">
    <div v-if="isLoading" class="flex min-h-60 items-center justify-center text-sm text-muted-foreground">
      <LoaderCircle :size="18" class="mr-2 animate-spin" />
      正在加载模组信息...
    </div>

    <div v-else-if="loadError" class="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
      <PackageX :size="36" class="text-muted-foreground" />
      <p class="text-sm text-red-600 dark:text-red-400">加载失败：{{ loadError }}</p>
      <MyCustomButton variant="outline" @click="router.push('/')">
        <ArrowLeft />返回模组列表
      </MyCustomButton>
    </div>

    <div v-else-if="!mod" class="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
      <PackageX :size="36" class="text-muted-foreground" />
      <div>
        <h2 class="font-semibold">没有找到这个模组</h2>
        <p class="mt-1 text-sm text-muted-foreground">也许不存在，也许你打错名字了</p>
      </div>
      <MyCustomButton variant="outline" @click="router.push('/')">
        <ArrowLeft />返回模组列表
      </MyCustomButton>
    </div>

    <template v-else>
      <div class="flex items-center gap-3 py-4">
        <MyCustomButton class="backdrop-blur-lg" variant="outline" @click="goBack">
          <ArrowLeft />返回
        </MyCustomButton>
        <MyCustomButton @click="openUrl(mod.link)">
          <Download />下载
        </MyCustomButton>
        <div class="bg-border w-px h-5"></div>
        <MyCustomButton class="w-9 h-9 rounded-full" variant="ghost" @click="share">
          <Share2 />
        </MyCustomButton>
      </div>
      <div class="flex flex-col gap-4">
        <!-- 封面与基础信息 -->
        <section class="bg-card-surface overflow-hidden rounded-2xl border shadow-xs">
          <div class="relative h-64 bg-amber-100 dark:bg-amber-950/60 sm:h-72">
            <img v-if="mod.images?.length" class="absolute inset-0 h-full w-full object-cover select-none"
              :src="mod.images[0]" :alt="`${mod.name}封面`" />
            <div v-else class="flex h-full items-center justify-center text-7xl">📦</div>
            <div class="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent">
              <div class="absolute inset-0 backdrop-blur-sm mask-t-from-10%"></div>
            </div>
            <div class="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h1 class="mod-title-transition text-2xl font-bold leading-tight text-white sm:text-3xl">
                {{ mod.name }}
              </h1>
              <div v-if="mod.tags.length" class="mt-2 flex flex-wrap gap-1.5">
                <span v-for="tag in mod.tags" :key="tag"
                  class="rounded-full bg-white/15 px-2.5 py-0.5 text-xs text-white/90 backdrop-blur-sm">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </section>
        <div class="grid gap-2 text-sm text-muted-foreground grid-cols-[repeat(auto-fit,minmax(min(140px,100%),1fr))]">
          <InfoCard title="作者" :icon="UserRound">{{ mod.author }}</InfoCard>
          <InfoCard title="版本" :icon="HistoryIcon">{{ mod.version }}</InfoCard>
          <InfoCard title="兼容版本" :icon="HistoryIcon">{{ mod.compat }}</InfoCard>
          <InfoCard title="更新日期" :icon="Calendar">{{ mod.date }}</InfoCard>
          <InfoCard title="大小" :icon="SaveIcon">{{ mod.size }}</InfoCard>
        </div>

        <div class="grid gap-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- 简介 -->
            <BasicInfoCard title="模组简介">
              <template #tag>
                <FileText :size="18" />
              </template>
              <p class="whitespace-pre-line leading-6">{{ mod.desc }}</p>
            </BasicInfoCard>

            <!-- 评分 -->
            <BasicInfoCard title="评分">
              <template #tag>
                <Star :size="18" />
              </template>
              <template #prefix>
                <MyCustomButton class="w-8 h-8 rounded-full" variant="ghost" size="sm"
                  @click="isRatingDialogShow = !isRatingDialogShow">
                  <SquarePen :size="16"></SquarePen>
                </MyCustomButton>
              </template>
              <div class="flex min-h-7 items-center">
                <template v-if="isRatingLoading">
                  <LoaderCircle :size="15" class="mr-2 animate-spin" />
                  正在加载评分...
                </template>
                <span v-else-if="ratingLoadFailed">评分暂时无法加载</span>
                <div v-else-if="hasRating" class="flex flex-col gap-2">
                  <div class="flex items-baseline gap-1">
                    <span class="text-xl font-semibold tabular-nums text-foreground">{{ formattedRating }}</span>
                  </div>
                  <div class="flex gap-0.5" :aria-label="`平均分数 ${formattedRating} 分`">
                    <span v-for="index in 5" :key="index" class="relative block h-4 w-4">
                      <Star :size="16" class="absolute inset-0 text-muted-foreground/25" />
                      <span class="absolute inset-0 overflow-hidden text-amber-500"
                        :style="{ width: getStarFill(index) }">
                        <Star :size="16" class="fill-current" />
                      </span>
                    </span>
                  </div>
                  <span>{{ rating?.count }} 人评分</span>
                </div>
                <span v-else>暂无评分</span>
              </div>
            </BasicInfoCard>
          </div>

          <!-- 截图 -->
          <BasicInfoCard v-if="mod.images?.length" title="模组截图">
            <template #tag>
              <Image :size="18" />
            </template>
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <button v-for="(img, index) in mod.images" :key="index" type="button"
                class="group relative aspect-video overflow-hidden rounded-lg border bg-muted text-left outline-none ring-ring transition-shadow hover:shadow-md focus-visible:ring-2"
                :aria-label="`预览${mod.name}截图 ${index + 1}`" @click="openImagePreview(index)">
                <img class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  :src="img" :alt="`${mod.name}截图 ${index + 1}`" loading="lazy" decoding="async">
                <span
                  class="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all group-hover:bg-black/30 group-hover:opacity-100 group-focus-visible:bg-black/30 group-focus-visible:opacity-100">
                  <ZoomInIcon :size="18" />
                </span>
              </button>
            </div>
          </BasicInfoCard>
        </div>
      </div>
    </template>

    <!-- 截图预览器 -->
    <Dialog v-model:open="isImagePreviewShow">
      <DialogContent class="w-[calc(100%-2rem)] max-w-5xl border-0 bg-transparent p-0 shadow-none sm:max-w-5xl"
        :show-close-button="false">
        <div class="relative grid max-h-[calc(100vh-2rem)] overflow-hidden rounded-lg bg-black">
          <img v-if="currentPreviewImage" class="max-h-[calc(100vh-6rem)] w-full object-contain"
            :src="currentPreviewImage" :alt="`${mod?.name}截图 ${previewImageIndex + 1}`">
          <MyCustomButton variant="ghost" size="icon"
            class="absolute right-2 top-2 bg-black/10 text-white backdrop-blur-xl hover:bg-white/15 hover:text-white"
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
          <div v-if="mod?.images?.length"
            class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
            {{ previewImageIndex + 1 }} / {{ mod.images.length }}
          </div>
        </div>
      </DialogContent>
    </Dialog>
    <Dialog v-model:open="isRatingDialogShow">
      <DialogContent class="w-[calc(100%-2rem)] max-w-sm rounded-2xl p-6 sm:max-w-sm" :show-close-button="false">
        <div class="pr-8">
          <h2 class="mt-4 text-lg font-bold">为模组评分</h2>
          <p class="mt-1 truncate text-sm text-muted-foreground">{{ mod?.name }}</p>
        </div>
        <template v-if="rating">
          <div class="py-5 text-center">
            <div class="flex justify-center gap-2">
              <Star v-for="index in 5" :key="index" :size="32" class="transition-transform duration-150 hover:scale-110"
                @click="pendingRating = index"
                :class="index <= pendingRating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'" />
            </div>
          </div>
          <div class="flex justify-end gap-2">
            <MyCustomButton variant="outline" @click="isRatingDialogShow = false">取消</MyCustomButton>
            <MyCustomButton :disabled="pendingRating === 0" @click="submitScore(pendingRating)">
              提交
            </MyCustomButton>
          </div>
        </template>
      </DialogContent>
    </Dialog>
  </div>
</template>
