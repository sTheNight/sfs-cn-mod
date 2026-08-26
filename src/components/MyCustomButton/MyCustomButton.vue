<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { cn } from "@/lib/utils"
import { buttonVariants } from "."
import RippleProvider from "../RippleProvider.vue"

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"],
  showRipple?: boolean,
  rippleFollowTheme?: boolean,
  isDarkRipple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  showRipple: true,
  rippleFollowTheme: true,
  isDarkRipple: undefined
})
const isDarkRipple = () => {
  if (props.isDarkRipple !== undefined) return props.isDarkRipple
  switch (props.variant) {
    case "destructive":
    case "ghost":
    case "outline":
      return true;
    default:
      return false;
  }
}
</script>

<template>
  <RippleProvider :follow-theme="rippleFollowTheme" :show-ripple="showRipple" :is-dark-ripple="isDarkRipple()"
    :class="cn(buttonVariants({ variant, size }), props.class)">
    <slot />
  </RippleProvider>
</template>
