<script setup lang="ts">
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import { homeCardInfo } from '@/data/homeCardInfo';
import { AlertTriangle, Download, MessageCircle } from '@lucide/vue';

const cardIcons = [Download, AlertTriangle, MessageCircle]
</script>
<template>
  <div>
    <section class="mt-4 grid gap-4 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
      <basic-info-card v-for="(item, index) in homeCardInfo" :key="index" :title="item.title">
        <template #tag>
          <component :is="cardIcons[index]" :size="18" />
        </template>
        <p class="mt-4 whitespace-pre-line text-sm leading-6 text-muted-foreground">{{ item.description }}</p>
      </basic-info-card>
    </section>
  </div>
</template>
