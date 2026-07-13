<script setup lang="ts">
import AlertMessage from '@/components/AlertMessage.vue';
import BasicInfoCard from '@/components/Card/BasicInfoCard.vue';
import MyCode from '@/components/MyCode.vue';
import HighLight from '@/components/HighLight.vue';
</script>
<template>
  <div class="flex flex-col gap-2">
    <BasicInfoCard title="下载模组文件">
      <template #tag>①</template>
      <p>在本站找到需要的模组，点击 <HighLight>下载</HighLight> 按钮，将ZIP文件下载到手机。</p>
    </BasicInfoCard>
    <BasicInfoCard title="解压模组文件">
      <template #tag>②</template>
      <p>使用文件管理器（如MT管理器、ES文件浏览器等）找到下载的ZIP文件，解压后会得到pack文件或文件夹</p>
      <MyCode>模组文件夹：Parts / Textures Packs</MyCode>
    </BasicInfoCard>
    <BasicInfoCard title="定位游戏目录">
      <template #tag>③</template>
      <p>找到SFS游戏数据目录，路径通常为：</p>
      <MyCode>/storage/emulated/0/Android/media/com.StefMorojna.SpaceflightSimulator/Mods/Custom_Assets/Parts/
      </MyCode>
      <p>某些手机系统路径在data内</p>
    </BasicInfoCard>
    <BasicInfoCard title="复制模组文件">
      <template #tag>④</template>
      <p>将解压后的模组文件夹复制到游戏目录下的对应位置：</p>
      <MyCode>
        • pack模组 → Parts/<br />
        • 涂装模组 → Textures Packs/
      </MyCode>
    </BasicInfoCard>
    <BasicInfoCard title="启动游戏验证">
      <template #tag>⑤</template>
      <p>重新启动SFS 在主页面等待一会 待模组加载器内显示该模组即为加载成功(注意下方的报错信息)</p>
    </BasicInfoCard>
    <AlertMessage type="info" content="123">
      <b>小技巧：</b>如果游戏加载模组速度过慢 可以尝试断网重启或开启VPN 交流群923038827
    </AlertMessage>
  </div>
</template>
