<script setup lang="ts">
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import MyCode from '@/components/MyCode.vue';
</script>
<template>
  <div>
    <BasicInfoCard title="下载并解压文件">
      <template #tag>①</template>
      <div class="mt-4 text-sm text-muted-foreground">
        <p>下载模组ZIP文件后，解压。</p>
      </div>
    </BasicInfoCard>
    <BasicInfoCard title="定位游戏目录" class="mt-2">
      <template #tag>②</template>
      <div class="mt-4 text-sm text-muted-foreground">
        <p>iOS游戏数据路径为：</p>
        <MyCode>我的设备\Spaceflight Simulator</MyCode>
      </div>
    </BasicInfoCard>
    <BasicInfoCard title="放置模组文件" class="mt-2">
      <template #tag>③</template>
      <div class="mt-4 text-sm text-muted-foreground">
        <p>将解压后的模组移动到游戏目录的Parts或Textures Packs文件夹中，操作方式与Android类似。</p>
      </div>
    </BasicInfoCard>
    <BasicInfoCard title="验证与排错" class="mt-2">
      <template #tag>④</template>
      <div class="mt-4 text-sm text-muted-foreground">
        <p>重启游戏检查模组是否生效。iOS系统对文件权限要求严格，如遇问题请检查文件读写权限。</p>
      </div>
    </BasicInfoCard>
  </div>
</template>
