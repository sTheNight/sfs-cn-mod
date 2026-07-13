<script setup lang="ts">
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import { MyCustomButton } from '@/components/MyCustomButton';
import { homeCardInfo } from '@/data/homeCardInfo';
import { AlertTriangle, Download, Globe, MessageCircle, Tv, Users, type LucideIcon } from '@lucide/vue';

const cardIcons = [Download, AlertTriangle, MessageCircle]

function openUrl(link: string) {
  window.open(link)
}
const links: [string, string, LucideIcon][] = [
  ["https://qm.qq.com/cgi-bin/qm/qr?k=Q3c7K7F7G9x5F5aB8bZ7hS9jK3nM2pL4&jump_from=webapi&authKey=xxx", "QQ群: 923038827", Users],
  ['https://space.bilibili.com/3546673454254808', 'B站: A-Future-star', Tv],
  ['https://sfszhmod.pages.dev/', '原版站点', Globe]
]
</script>
<template>
  <div class="w-full max-w-2xl mx-auto flex flex-col gap-2">
    <basic-info-card title="关于我们">
      <p>SFS 汉化模组下载中心，为 Spaceflight Simulator 玩家提供优质汉化模组资源。</p>
      <div class="flex gap-1 mt-2 flex-wrap">
        <my-custom-button v-for="(item, index) in links" :key="index" class="p-4 text-accent-foreground"
          variant="outline" @click="openUrl(item[0])">
          <component :is="item[2]" />
          {{ item[1] }}
        </my-custom-button>
      </div>
    </basic-info-card>
    <basic-info-card title="鸣谢名单">
      <div class="grid grid-cols-2 items-center">
        <span>重铬酸钠</span>
        <span>蓝鲸公益</span>
        <span>555_55</span>
        <span>10086</span>
      </div>
    </basic-info-card>
    <section class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
      <basic-info-card v-for="(item, index) in homeCardInfo" :key="index" :title="item.title">
        <template #tag>
          <component :is="cardIcons[index]" :size="18" />
        </template>
        <p class="whitespace-pre-line leading-6">{{ item.description }}</p>
      </basic-info-card>
    </section>
  </div>
</template>
