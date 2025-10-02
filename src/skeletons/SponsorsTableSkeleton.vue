<template>
      <tbody class="animate-pulse">
      <tr v-for="row in rows" :key="row">
        <td
            v-for="col in columns"
            :key="col"
            class="border border-gray-200 py-8 px-4"
        >
          <div class="h-4 w-full bg-gray-300 rounded"></div>
        </td>
      </tr>
      </tbody>
</template>

<script setup lang="ts">
defineProps<{
  columns?: number
  rows?: number
}>()

const columns = 8
const rows = 10
</script>
