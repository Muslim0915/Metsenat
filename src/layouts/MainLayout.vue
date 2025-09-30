<template>
  <div class="flex flex-col flex-1 gap-2">
    <AppNavbar />
    <main class="flex flex-col flex-1">
      <router-view />
    </main>
    <footer></footer>
  </div>
</template>

<script setup lang="ts">

import AppNavbar from "@/components/AppNavbar.vue";
</script>
