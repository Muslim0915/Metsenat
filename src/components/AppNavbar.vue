<template>
  <div class="bg-white flex items-center justify-center w-full h-16">
    <div class="container flex items-center justify-between">
      <Logo isPro/>
      <div class="flex items-center gap-10">
        <div class="flex items-center cursor-pointer bg-gray-100 rounded-md py-2 pl-5 pr-1 gap-7">
          <span>Shoxrux</span>
          <div class="w-8 h-8 flex items-end justify-center bg-green-600 rounded-sm">
            <img src="@/assets/images/svg/avatar.svg" alt="avatar">
          </div>
        </div>
          <img @click="logout()" src="@/assets/images/svg/logout.svg" alt="logout" class="cursor-pointer">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import Logo from "@/components/Logo.vue";
const logout = ()=>{
  console.log('logout')
}
</script>
