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
  ["https://qm.qq.com/q/8kXMyVI00g", "QQ群: 923038827", Users],
  ['https://space.bilibili.com/3546673454254808', 'B站: A-Future-star', Tv],
  ['https://sfszhmod.pages.dev/', '原版站点', Globe]
]

const credits: [string, string, number?, string?][] = [
  ['重铬酸钠', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/%E9%87%8D%E9%93%AC%E9%85%B8%E9%92%A0.webp', 1078113418, "https://qm.qq.com/q/elEN4eyqaY"],
  ['蓝鲸公益', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/%E8%93%9D%E9%B2%B8%E5%85%AC%E7%9B%8A.webp', 879487979, "https://qm.qq.com/q/6J9eoSDyWk"],
  ['PS201_', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/PS201_.webp'],
  ['555_55', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/555_5.webp'],
  ['10086', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/10086.webp']
]
</script>
<template>
  <div class="w-full max-w-2xl mx-auto flex flex-col gap-2">
    <basic-info-card title="关于我们">
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-4">
          <img class=" w-16 h-16 rounded-full"
            src="https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/A%20Future%20star.webp">
          <div>
            <h3 class="font-bold text-accent-foreground text-md">A Future Star</h3>
            <p>请输入文本</p>
          </div>
        </div>
        <p>SFS 汉化模组下载中心，为 Spaceflight Simulator 玩家提供优质汉化模组资源。</p>
        <div class="flex gap-1 flex-wrap">
          <my-custom-button v-for="(item, index) in links" :key="index" class="p-4 text-accent-foreground"
            variant="outline" @click="openUrl(item[0])">
            <component :is="item[2]" />
            {{ item[1] }}
          </my-custom-button>
        </div>
      </div>
    </basic-info-card>
    <basic-info-card title="鸣谢名单">
      <div class="flex flex-col flex-wrap gap-2">
        <div class="grid grid-cols-2" v-for="(item, index) in credits" :key="index">
          <div class="flex items-center gap-2">
            <img class="w-8 h-8 rounded-full border" :src="item[1]" :alt="item[0]">
            <span>{{ item[0] }}</span>
          </div>
          <div>
            <my-custom-button class="w-full text-xs" size="sm" variant="outline" v-if="item[2] && item[3]"
              @click="openUrl(item[3])">
              QQ群：{{ item[2] }}
            </my-custom-button>
          </div>
        </div>
      </div>
    </basic-info-card>
    <h4 class="text-sm text-muted-foreground px-4 mt-2">声明信息</h4>
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
