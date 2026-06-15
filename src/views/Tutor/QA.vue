<script setup lang="ts">
import './tutorCommon.css'
import AlertMessage from '../../components/AlertMessage.vue';
import TutorSetup from '../../components/TutorSetup.vue';

</script>
<template>
  <div>
    <TutorSetup tag="?" class="mt-2" title="部件名称显示为空白">
      <p>这是汉化模组的常见问题，说明汉化文件未正确加载或编码格式不匹配。</p>
      <p>解决方法：确保下载的是对应游戏版本的汉化包；尝试重新安装汉化模组。</p>
    </TutorSetup>
    <TutorSetup tag="?" class="mt-2" title="模组部件不显示或显示异常">
      <p>可能原因：贴图文件缺失；模型文件损坏；与其他模组冲突。</p>
      <p>解决方法：检查模组文件是否完整；关闭其他模组测试；查看游戏日志获取详细错误信息。</p>
    </TutorSetup>
    <TutorSetup tag="?" class="mt-2" title="如何卸载模组？">
      <p>找到游戏目录中对应的模组文件/文件夹，直接删除即可。</p>
      <p>建议：安装新模组前截图记录原有文件，方便卸载时恢复。</p>
    </TutorSetup>
    <TutorSetup tag="?" class="mt-2" title="多个模组能否同时安装？">
      <p>可以，但需要注意模组之间可能存在冲突。</p>
      <p>建议：一次只安装一个新模组，测试正常后再安装下一个；避免同时安装功能重复的模组。</p>
    </TutorSetup>
    <TutorSetup tag="?" class="mt-2" title="存档会受模组影响吗？">
      <p>使用模组部件建造的火箭存档，在卸载模组后可能无法正常加载（部件会消失）。</p>
      <p>建议：使用模组前备份存档；重要作品建议导出蓝图保存。</p>
    </TutorSetup>
    <AlertMessage class="mt-2" type="info" content="123">
      <b>反馈交流：</b>如遇其他问题，欢迎加入QQ群 923038827 交流讨论，或向模组作者反馈bug。
    </AlertMessage>
  </div>
</template>
