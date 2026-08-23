<script setup lang="ts">
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import CreditCard from '@/components/CreditCard.vue';
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
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <CreditCard v-for="(item, index) in credits" :key="index" :name="item[0]" :avatar="item[1]"
          :group-number="item[2]" :group-url="item[3]" />
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
    <div class="flex flex-wrap p-3 justify-center gap-3 font-mono">
      <a tabindex="-1"
        class="flex items-center justify-center gap-1 outline-0 text-xs text-muted-foreground cursor-pointer transition-colors hover:text-accent-foreground"
        href="https://github.com/sTheNight/sfs-cn-mod" target="_blank">
        <svg class="w-4 h-4 box-border " role="img" viewBox="0 0 24 24" fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
        Github
      </a>
      <a tabindex="-1"
        class="flex items-center justify-center gap-1 outline-0 text-xs text-muted-foreground cursor-pointer transition-colors hover:text-accent-foreground"
        href="https://qm.qq.com/q/8kXMyVI00g" target="_blank">
        <svg class="w-4 h-4 box-border " role="img" fill="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673" />
        </svg>
        Feedback
      </a>
    </div>
  </div>
</template>
