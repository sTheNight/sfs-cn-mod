<script setup lang="ts">
import type { ModInfo } from '@/models/ModInfo';
import { Calendar, Download, History, Info, Save, UserRound } from '@lucide/vue';
import { ref, useTemplateRef } from 'vue'

export interface ModCardProps {
  item: ModInfo
}

export interface ModCardEmits {
  (e: 'openDetail', mod: ModInfo): void,
  (e: 'onDownloadButtonClicked', url: string): void
}
defineEmits<ModCardEmits>()
defineProps<ModCardProps>()

import { useIntersectionObserver } from '@vueuse/core'
import { MyCustomButton } from '../MyCustomButton';


const cardRef = useTemplateRef<HTMLElement>('card')
const hasEnteredViewport = ref(false)

useIntersectionObserver(
  cardRef,
  ([entry]) => {
    hasEnteredViewport.value = entry?.isIntersecting ?? false
  }
)
</script>
<template>
  <div ref="card"
    class="fade-in-card border rounded-2xl shadow-xs duration-150 transition-all overflow-hidden hover:shadow-xl hover:-translate-y-1 flex flex-col"
    :class="{ 'fade-in-card--visible': hasEnteredViewport }">
    <img @click="$emit('openDetail', item)" class="w-full h-50 object-cover shrink-0" v-if="item.images?.length"
      :src="item.images[0]" :alt="`${item.name}封面`" loading="lazy" decoding="async" />
    <div @click="$emit('openDetail', item)" v-else
      class="h-50 flex bg-amber-100 justify-center items-center text-6xl select-none">📦</div>
    <div class="p-4 flex flex-col flex-1 min-h-0">
      <div class="flex-1 min-h-0">
        <h2 class="mod-title-transition min-w-0 truncate font-bold text-xl">
          {{ item.name }}
        </h2>
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
        <p class="my-4 text-gray-600 text-sm">{{ item.desc }}</p>
      </div>
      <div class="shrink-0">
        <div class="flex justify-evenly gap-2">
          <div class="text-xs flex items-center border rounded-lg p-2 bg-gray-100 flex-1">
            <Save :size="16" class="mr-1" />{{ item.size }}
          </div>
          <div class="text-xs flex items-center border rounded-lg p-2 bg-gray-100 flex-1">
            <Calendar :size="16" class="mr-1" />{{ item.date }}
          </div>
        </div>
        <div class="flex w-full justify-end mt-4 gap-2">
          <MyCustomButton variant="outline" @click="$emit('openDetail', item)">
            <Info />
            详情
          </MyCustomButton>
          <MyCustomButton @click="$emit('onDownloadButtonClicked', item.link)">
            <Download />
            下载
          </MyCustomButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.fade-in-card {
  min-width: 0;
  opacity: 0;
  transform: scale(0.8);
  transition: all .3s;
}

.fade-in-card--visible {
  opacity: 1;
  transform: scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .fade-in-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
