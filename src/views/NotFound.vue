<script setup lang="ts">
import MyCustomButton from '@/components/MyCustomButton/MyCustomButton.vue';
import { ArrowLeft, PackageX } from '@lucide/vue';
import { useRouter } from 'vue-router';
const router = useRouter()
</script>
<template>
  <div class="flex min-h-60 flex-col items-center justify-center gap-3 text-center">
    <PackageX :size="36" class="text-muted-foreground" />
    <div>
      <h2 class="font-semibold">404 没有找到</h2>
      <p class="mt-1 text-sm text-muted-foreground">这是一个比较绝望的错误</p>
    </div>
    <MyCustomButton variant="outline" @click="router.push('/')">
      <ArrowLeft />回到主页
    </MyCustomButton>
  </div>
</template>
