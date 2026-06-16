<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { House } from '@lucide/vue';
import { useRouter } from 'vue-router';
const router = useRouter()
</script>
<template>
  <div class="flex w-full flex-col items-center justify-center px-4 py-20 text-center">
    <div class=" select-none text-5xl font-semibold leading-none text-gray-200">404</div>
    <p class="mt-4 text-sm text-gray-600">你好像来到了一个错误的地方</p>
    <Button class="mt-6" size="sm" @click="router.push('/')">
      <House :size="14" /> 回到正确的路上
    </Button>
  </div>
</template>
