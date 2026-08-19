import { computed } from 'vue'

export function useResettableSetting<T>(
  getValue: () => T,
  getDefaultValue: () => T | undefined,
  updateValue: (value: T) => void,
) {
  const canUndo = computed(() => {
    const defaultValue = getDefaultValue()
    return defaultValue !== undefined && !Object.is(getValue(), defaultValue)
  })

  function undo() {
    const defaultValue = getDefaultValue()
    if (defaultValue !== undefined) updateValue(defaultValue)
  }

  return { canUndo, undo }
}
