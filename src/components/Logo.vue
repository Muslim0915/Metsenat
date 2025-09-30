<template>
  <div class="flex items-center gap-2">
    <img src="@/assets/images/svg/logo.svg" alt="logo">
    <span v-if="isPro" class="text-green-500 text-sm">PRO</span>
    <span v-else class="text-white font-alerta py-2 px-4 rounded-md bg-red-500">CLUB</span>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  isPro?: boolean
}
withDefaults(defineProps<IProps>(), {
  isPro: false
})
</script>>