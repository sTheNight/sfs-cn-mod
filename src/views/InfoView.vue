<script setup lang="ts">
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import CreditCard from '@/components/CreditCard.vue';
import { MyCustomButton } from '@/components/MyCustomButton';
import { AlertTriangle, Download, Globe, MessageCircle, Tv, Users, type LucideIcon } from '@lucide/vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const cardIcons = [Download, AlertTriangle, MessageCircle]
const { t } = useI18n()

function openUrl(link: string) {
  window.open(link)
}
const links = computed<[string, string, LucideIcon][]>(() => [
  ["https://qm.qq.com/q/8kXMyVI00g", t('info.qqGroup'), Users],
  ['https://space.bilibili.com/3546673454254808', t('info.bilibili'), Tv],
  ['https://sfszhmod.pages.dev/', t('info.originalSite'), Globe]
])

const credits = computed<[string, string, string?, number?, string?][]>(() => [
  ['重铬酸钠', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/%E9%87%8D%E9%93%AC%E9%85%B8%E9%92%A0.webp', t('info.assist'), 1078113418, "https://qm.qq.com/q/elEN4eyqaY"],
  ['蓝鲸公益', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/%E8%93%9D%E9%B2%B8%E5%85%AC%E7%9B%8A.webp', t('info.hosting'), 879487979, "https://qm.qq.com/q/6J9eoSDyWk"],
  ['PS201_', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/PS201_.webp', t('info.testing')],
  ['555_55', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/555_5.webp', t('info.testing')],
  ['10086', 'https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/10086.webp', t('info.testing')]
])

const homeCards = computed(() => [
  { title: t('info.cards.downloadTitle'), description: t('info.cards.downloadDesc') },
  { title: t('info.cards.disclaimerTitle'), description: t('info.cards.disclaimerDesc') },
  { title: t('info.cards.feedbackTitle'), description: t('info.cards.feedbackDesc') },
])
</script>
<template>
  <div class="w-full max-w-2xl mx-auto flex flex-col gap-2">
    <basic-info-card :title="t('info.aboutUs')">
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-4">
          <img class=" w-16 h-16 rounded-full"
            src="https://testingcf.jsdelivr.net/gh/aaaa111ssf/images@main/A%20Future%20star.webp">
          <div>
            <h3 class="font-bold text-accent-foreground text-md">A Future Star</h3>
            <p>{{ t('info.introPlaceholder') }}</p>
          </div>
        </div>
        <p>{{ t('info.intro') }}</p>
        <div class="flex gap-1 flex-wrap">
          <my-custom-button v-for="(item, index) in links" :key="index" class="p-4 text-accent-foreground"
            variant="outline" @click="openUrl(item[0])">
            <component :is="item[2]" />
            {{ item[1] }}
          </my-custom-button>
        </div>
      </div>
    </basic-info-card>
    <basic-info-card :title="t('info.credits')">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <CreditCard :badge-text="item[2]" v-for="(item, index) in credits" :key="index" :name="item[0]"
          :avatar="item[1]" :group-number="item[3]" :group-url="item[4]" />
      </div>
    </basic-info-card>
    <h4 class="text-sm text-muted-foreground px-4 mt-2">{{ t('info.statements') }}</h4>
    <section class="grid gap-2 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))]">
      <basic-info-card v-for="(item, index) in homeCards" :key="index" :title="item.title">
        <template #tag>
          <component :is="cardIcons[index]" :size="18" />
        </template>
        <p class="whitespace-pre-line leading-6">{{ item.description }}</p>
      </basic-info-card>
    </section>
  </div>
</template>
