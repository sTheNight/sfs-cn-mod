<script setup lang="ts">
import './tutorCommon.css'
import AlertMessage from '../../components/AlertMessage.vue';
import TutorSetup from '../../components/TutorSetup.vue';

</script>
<template>
  <div>
    <TutorSetup tag="①" title="下载模组文件">
      <p>在本站找到需要的模组，点击"⬇️ 下载"按钮，将ZIP文件下载到手机。</p>
    </TutorSetup>
    <TutorSetup tag="②" title="解压模组文件" class="mt-2">
      <p>使用文件管理器（如MT管理器、ES文件浏览器等）找到下载的ZIP文件，解压后会得到pack文件或文件夹</p>
      <code>模组文件夹：Parts / Textures Packs</code>
    </TutorSetup>
    <TutorSetup tag="③" title="定位游戏目录" class="mt-2">
      <p>找到SFS游戏数据目录，路径通常为：</p>
      <code>/storage/emulated/0/Android/media/com.StefMorojna.SpaceflightSimulator/Mods/Custom_Assets/Parts/</code>
      <p>某些手机系统路径在data内</p>
    </TutorSetup>
    <TutorSetup tag="④" title="复制模组文件" class="mt-2">
      <p>将解压后的模组文件夹复制到游戏目录下的对应位置：</p>
      <code>
        • pack模组 → Parts/<br/>
        • 涂装模组 → Textures Packs/
      </code>
    </TutorSetup>
    <TutorSetup tag="⑤" title="启动游戏验证" class="mt-2">
      <p>重新启动SFS 在主页面等待一会 待模组加载器内显示该模组即为加载成功(注意下方的报错信息)</p>
    </TutorSetup>
    <AlertMessage class="mt-2" type="info" content="123">
      <b>小技巧：</b>如果游戏加载模组速度过慢 可以尝试断网重启或开启VPN 交流群923038827
    </AlertMessage>
  </div>
</template>
