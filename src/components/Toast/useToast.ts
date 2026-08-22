import { ref } from "vue";

export const toastVisiable = ref(false)
export const toastText = ref("")
export const toastCount = ref(0)
export function showToast(message: string) {
  toastVisiable.value = true
  toastText.value = message
  toastCount.value++
  start()
}
function start() {
  const currentCount = toastCount.value
  setTimeout(() => {
    if (currentCount != toastCount.value) return
    toastVisiable.value = false
  }, 2000)
}

