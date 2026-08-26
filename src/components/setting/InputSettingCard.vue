<script setup lang="ts">
import { Save } from '@lucide/vue';
import MyCustomButton from '../MyCustomButton/MyCustomButton.vue';
import Input from '../ui/input/Input.vue';
import BasicSettingCard from './BasicSettingCard.vue';
import type { ResettableSettingCardProps } from './index.ts';
import { ref, watch } from 'vue';
import { useResettableSetting } from '@/composables/useResettableSetting.ts';
import CollapseTransition from '../CollapseTransition.vue';

type InputSettingCardProps = ResettableSettingCardProps<string> & {
  currentText?: string,
  saveWhileUndo?: boolean
}
interface InputSettingCardEmits {
  (event: 'save', value: string): void
}

const props = withDefaults(defineProps<InputSettingCardProps>(), {
  saveWhileUndo: true
})
const emits = defineEmits<InputSettingCardEmits>()

const inputText = ref<string>("")
const isChanged = ref(false)

const { canUndo, undo } = useResettableSetting(
  () => props.currentText !== undefined ? props.currentText : inputText.value,
  () => props.defaultValue,
  setInputText
)

watch(
  () => props.currentText,
  (currentText) => {
    if (currentText !== undefined) {
      inputText.value = currentText
    }
  },
  { immediate: true },
)

function setInputText(value: string) {
  inputText.value = value
}

function handleTextChanged() {
  isChanged.value = true
}

function realUndo() {
  undo()
  if (props.saveWhileUndo) {
    emits('save', inputText.value)
    isChanged.value = false
  } else {
    isChanged.value = true
  }
}
function handleSave() {
  emits('save', inputText.value)
  isChanged.value = false
}
</script>
<template>
  <BasicSettingCard vertical :show-undo="canUndo" @undo="realUndo" :is-experiment="props.isExperiment"
    :title="props.title" :description="props.description" :disabled="props.disabled">
    <div class="w-full">
      <div class="flex gap-2 text-accent-foreground">
        <Input @update:model-value="handleTextChanged" v-model:model-value="inputText"
          class="flex-1 min-w-0 text-xs"></Input>
        <div class="shrink-0">
          <MyCustomButton :class="{ 'cursor-not-allowed bg-zinc-600 hover:bg-zinc-600 dark:bg-zinc-400': !isChanged }"
            :show-ripple="isChanged" class="w-9 h-9" @click="handleSave">
            <Save />
          </MyCustomButton>
        </div>
      </div>
      <CollapseTransition :show="isChanged">
        <p class="text-xs text-red-600 mt-2">已更改但未保存</p>
      </CollapseTransition>
    </div>
  </BasicSettingCard>
</template>
