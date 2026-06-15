<script setup lang="ts">
import './tutorCommon.css'
import AlertMessage from '../../components/AlertMessage.vue';
import TutorSetup from '../../components/TutorSetup.vue';

</script>
<template>
  <div>
    <AlertMessage type="error">
      <b>重要提示：</b>Steam版SFS的模组安装路径与手机版不同，请注意区分。
    </AlertMessage>
    <TutorSetup tag="①" class="mt-2" title="下载模组文件">
      <p>从本站下载需要的模组ZIP文件，解压到电脑任意位置。</p>
    </TutorSetup>
    <TutorSetup tag="②" title="找到游戏安装目录" class="mt-2">
      <p>Steam版SFS的存档和模组路径通常为：</p>
      <code>你的steam安装位置\SteamLibrary\steamapps\common\Spaceflight Simulator\Spaceflight Simulator Game</code>
      <p>或在Steam库中右键游戏 → 管理 → 浏览本地文件。</p>
    </TutorSetup>
    <TutorSetup tag="③" title="放置模组文件" class="mt-2">
      <p>在游戏目录下创建或找到以下文件夹，将模组文件放入：</p>
      <code>
        • 部件 → Spaceflight Simulator\Parts\<br/>
        • 涂装 → Spaceflight Simulator\Textures Packs\
      </code>
    </TutorSetup>
    <TutorSetup tag="④" title="启动游戏" class="mt-2">
      <p>通过Steam启动游戏，进入游戏检查新部件是否正常显示。</p>
    </TutorSetup>
    <AlertMessage class="mt-2" type="info" content="123">
      <b>小技巧：</b>PC版是本地加载 加载模组速度极快
    </AlertMessage>
  </div>
</template>
