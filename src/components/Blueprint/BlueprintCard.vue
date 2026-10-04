<script setup lang="ts">
import { Calendar, Download, Save } from "@lucide/vue";
import { ref, useTemplateRef } from "vue";
import { type Blueprint } from "@/models/Blueprint.ts";
import { useIntersectionObserver } from "@vueuse/core";
import { MyCustomButton } from "../MyCustomButton";
import RippleProvider from "../RippleProvider.vue";
import { useSettingsStore } from "@/stores/settings.ts";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter()

export interface BluePrintCardProps {
  item: Blueprint;
}

export interface BluePrintCardEmits {
  (e: "onDownloadButtonClicked", url: string): void;
}
defineEmits<BluePrintCardEmits>();
defineProps<BluePrintCardProps>();

const cardRef = useTemplateRef<HTMLElement>("card");
const hasEnteredViewport = ref(false);
const setting = useSettingsStore();
const { t } = useI18n();

useIntersectionObserver(cardRef, ([entry]) => {
  hasEnteredViewport.value = entry?.isIntersecting ?? false;
});
</script>
<template>
  <RippleProvider :is-dark-ripple="true" tag="div" ref="card"
    class="bg-card-surface relative fade-in-card border text-card-foreground select-none rounded-2xl shadow-xs duration-150 transition-all overflow-hidden hover:shadow-xl hover:-translate-y-1 flex flex-col"
    :class="{
      'fade-in-card--visible': hasEnteredViewport,
      'backdrop-blur-lg': setting.cardBlurEffect,
    }">
    <img :draggable="false" class="w-full h-50 object-cover shrink-0" v-if="item.images?.length" :src="item.images[0]"
      :alt="t('mods.coverAlt', { name: item.name })" width="320" height="200" loading="lazy" decoding="async" />
    <div v-else class="h-50 flex bg-amber-100 dark:bg-amber-950/60 justify-center items-center text-6xl select-none">
      📦
    </div>
    <div class="p-4 flex flex-col flex-1 min-h-0">
      <div class="flex-1 min-h-0">
        <h2 class="mod-title-transition min-w-0 truncate font-bold text-xl">
          {{ item.name }}
        </h2>
        <div class="flex gap-2 mt-2">
          <div class="inline-block text-[12px] rounded-full bg-muted text-muted-foreground px-2 py-0.5"
            v-for="(tag, index) in item.tags" :key="index">
            {{ tag }}
          </div>
        </div>
        <div class="my-4 text-muted-foreground text-sm">
          <div>
            {{ item.desc }}
          </div>
          <div
            class="mt-1 text-xs rounded-lg p-2.5 border border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
            需要模组：
            <span class="cursor-pointer hover:text-amber-900 dark:hover:text-amber-100 transition-colors duration-150"
              @click="router.push(`/mods/${req.name}`)" v-for="(req, index) in item.requirements" :key="index">
              {{ req.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="shrink-0">
        <div class="flex justify-evenly gap-2 text-muted-foreground">
          <div class="text-xs flex items-center rounded-lg p-2 bg-muted flex-1">
            <Save :size="16" class="mr-1" />{{ item.size }}
          </div>
          <div class="text-xs flex items-center rounded-lg p-2 bg-muted flex-1">
            <Calendar :size="16" class="mr-1" />{{ item.date }}
          </div>
        </div>
        <div class="w-full flex justify-end mt-4 gap-2">
          <MyCustomButton @click="$emit('onDownloadButtonClicked', item.link)">
            <Download />
            {{ t("common.download") }}
          </MyCustomButton>
        </div>
      </div>
    </div>
  </RippleProvider>
</template>
<style>
.fade-in-card {
  min-width: 0;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s;
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
