<template>
  <div :class="[bgClass, bgSize]" class="flex items-center justify-center" :style="{ backgroundColor: $props.bgColor }">
    <img :src="$props.iconUrl" :class="$props.iconCLass" :alt="$props.iconAlt">
  </div>
</template>

<script setup lang="ts">

interface IProps {
  iconUrl: string;
  iconCLass?: string;
  iconAlt: string;
  bgSize?: string;
  bgColor?: string;
  bgClass?: string;
}
withDefaults(defineProps<IProps>(), {
  bgColor: "#EAECF0",
  bgSize: "w-16 h-16"
})
</script>
