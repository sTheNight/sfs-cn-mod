<script setup lang="ts">
import { ref, type Ref } from 'vue';

type TutorType = "android" | "ios" | "pc" | "qa"
const currentTuttor: Ref<TutorType> = ref("android")
</script>
<template>
  <div class="mt-4">{{ currentTuttor }}</div>
</template>
<style lang="css" scoped></style>
