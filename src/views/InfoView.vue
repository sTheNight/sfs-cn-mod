<script setup lang="ts">
import { homeCardInfo } from '@/data/homeCardInfo';
import { AlertTriangle, Download, MessageCircle } from '@lucide/vue';

const cardIcons = [Download, AlertTriangle, MessageCircle]
</script>
<template>
  <div class="py-4">
    <section class="mt-4 grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
      <div class="border rounded-2xl p-4 shadow-xs transition-all duration-150 hover:shadow-xl hover:-translate-y-1"
        v-for="(item, index) in homeCardInfo" :key="index">
        <div class="flex items-center gap-3">
          <div class="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-gray-100">
            <component :is="cardIcons[index]" :size="18" />
          </div>
          <h2 class="font-bold">{{ item.title }}</h2>
        </div>
        <p class="mt-4 whitespace-pre-line text-sm leading-6 text-gray-600">{{ item.description }}</p>
      </div>
    </section>
  </div>
</template>
