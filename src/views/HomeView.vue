<script setup lang="ts">
import { homeCardInfo } from '@/data/homeCardInfo';
</script>
<template>
  <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] mt-4">
    <div class="border rounded-2xl p-4 shadow-xs" v-for="(item, index) in homeCardInfo" :key="index">
      <h2 class="font-bold">{{ item.title }}</h2>
      <p class="mt-4">{{ item.description }}</p>
    </div>
  </div>
</template>
