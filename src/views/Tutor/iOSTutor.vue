<script setup lang="ts">
import './tutorCommon.css'
import TutorSetup from '../../components/TutorSetup.vue';
</script>
<template>
  <div>
    <TutorSetup tag="①" title="下载并解压文件">
      <p>下载模组ZIP文件后，解压。</p>
    </TutorSetup>
    <TutorSetup tag="②" title="定位游戏目录" class="mt-2">
      <p>iOS游戏数据路径为：</p>
      <code>我的设备\Spaceflight Simulator</code>
    </TutorSetup>
    <TutorSetup tag="③" title="放置模组文件" class="mt-2">
      <p>将解压后的模组移动到游戏目录的Parts或Textures Packs文件夹中，操作方式与Android类似。</p>
    </TutorSetup>
    <TutorSetup tag="④" title="验证与排错" class="mt-2">
      <p>重启游戏检查模组是否生效。iOS系统对文件权限要求严格，如遇问题请检查文件读写权限。</p>
    </TutorSetup>
  </div>
</template>
