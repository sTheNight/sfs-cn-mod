<script setup lang="ts">
import { MyCustomButton } from '@/components/MyCustomButton'
import { HeartHandshake, Users } from '@lucide/vue'

interface CreditCardProps {
  name: string
  avatar: string
  groupNumber?: number
  groupUrl?: string
}

defineProps<CreditCardProps>()

function openUrl(link: string) {
  window.open(link)
}
</script>

<template>
  <div
    class="group/sponsor-card select-none flex justify-between text-accent-foreground border rounded-2xl p-3 relative z-1 overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div
        class="absolute inset-0 transition-opacity duration-300 bg-linear-to-l from-amber-200 to-amber-50 opacity-10 group-hover/sponsor-card:opacity-25" />
      <HeartHandshake :size="64"
        class="absolute transition-opacity duration-300 group-hover/sponsor-card:opacity-20 text-amber-500 opacity-15 right-0 rotate-20" />
    </div>
    <div class="flex items-center gap-2">
      <img class="w-8 h-8 rounded-full border" :src="avatar" :alt="name">
      <span>{{ name }}</span>
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
