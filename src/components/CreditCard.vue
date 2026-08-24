<script setup lang="ts">
import { MyCustomButton } from '@/components/MyCustomButton'
import { HeartHandshake, Users } from '@lucide/vue'

interface CreditCardProps {
  name: string
  avatar: string
  groupNumber?: number
  groupUrl?: string,
  badgeText?: string
}

defineProps<CreditCardProps>()

function openUrl(link: string) {
  window.open(link)
}
</script>

<template>
  <div
    class="group/sponsor-card select-none flex justify-between text-accent-foreground border rounded-2xl p-3 relative isolate overflow-hidden">
    <div class="absolute inset-0 -z-1 pointer-events-none">
      <div
        class="absolute inset-0 transition-opacity duration-300 bg-linear-to-l from-amber-200 to-amber-50 opacity-10 group-hover/sponsor-card:opacity-25" />
      <HeartHandshake :size="64"
        class="absolute transition-opacity duration-300 group-hover/sponsor-card:opacity-20 text-amber-500 opacity-15 right-0 rotate-20" />
    </div>
    <div class="flex items-center gap-2">
      <img class="w-10 h-10 rounded-full border" :src="avatar" :alt="name">
      <div class="flex flex-col justify-center">
        <span>{{ name }}</span>
        <span v-if="badgeText"
          class="mt-0.5 w-fit text-[11px] leading-4 px-1.5 rounded-md border border-amber-500/20 bg-amber-500/8 text-amber-700 dark:text-amber-300">
          {{ badgeText }}
        </span>
      </div>
    </div>
    <div>
      <MyCustomButton v-if="groupNumber && groupUrl" class="text-xs" size="sm" variant="outline"
        @click="openUrl(groupUrl)">
        <Users />
        {{ groupNumber }}
      </MyCustomButton>
    </div>
  </div>
</template>
