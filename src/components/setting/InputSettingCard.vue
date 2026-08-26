<script setup lang="ts">
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
const editStartText = ref<string>("")
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
      editStartText.value = currentText
      isChanged.value = false
    }
  },
  { immediate: true },
)

function setInputText(value: string) {
  inputText.value = value
}

function handleTextChanged(value: string | number) {
  if (!isChanged.value) {
    editStartText.value = inputText.value
  }

  inputText.value = String(value)
  isChanged.value = inputText.value !== editStartText.value
}

function handleCancel() {
  inputText.value = editStartText.value
  isChanged.value = false
}

function realUndo() {
  undo()
  if (props.saveWhileUndo) {
    emits('save', inputText.value)
    editStartText.value = inputText.value
    isChanged.value = false
  } else {
    isChanged.value = inputText.value !== editStartText.value
  }
}
function handleSave() {
  emits('save', inputText.value)
  editStartText.value = inputText.value
  isChanged.value = false
}
</script>
<template>
  <BasicSettingCard vertical :show-undo="canUndo" @undo="realUndo" :is-experiment="props.isExperiment"
    :title="props.title" :description="props.description" :disabled="props.disabled">
    <div class="w-full">
      <Input :model-value="inputText" @update:model-value="handleTextChanged"
        class="w-full text-accent-foreground text-xs"></Input>
      <CollapseTransition :show="isChanged">
        <div class="flex justify-between items-center mt-2">
          <p class="text-xs text-red-600">已更改但未保存</p>
          <div class="flex gap-1">
            <MyCustomButton class="text-xs" variant="outline" size="sm" @click="handleCancel">
              取消
            </MyCustomButton>
            <MyCustomButton class="text-xs" :show-ripple="isChanged" size="sm" @click="handleSave">
              保存
            </MyCustomButton>
          </div>
        </div>
      </CollapseTransition>
    </div>
  </BasicSettingCard>
</template>
