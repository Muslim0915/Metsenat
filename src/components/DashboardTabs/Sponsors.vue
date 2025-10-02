<template>
  <div class="flex flex-1 flex-col gap-6">
    <div class="container mx-auto">
      <!-- Таблица -->
      <table class="w-full">
        <thead>
        <tr>
          <th v-for="header in tableHeader" :key="header.id"
              class="text-xs text-left uppercase text-gray-400 font-rubik font-medium py-2 px-4">
            {{ header.text }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(sponsor, index) in (sponsorData.results ?? [])" :key="sponsor.id" class="bg-white">
          <td class="text-xs font-rubik font-medium py-8 px-4">{{ (parameters.page - 1) * parameters.page_size + index + 1 }}</td>
          <td class="text-xs font-rubik font-medium py-8 px-4">{{ sponsor.full_name }}</td>
          <td class="text-xs font-rubik font-medium py-8 px-4">{{ sponsor.phone }}</td>
          <td class="text-xs font-rubik font-medium py-8 px-4">{{ sponsor.sum }}</td>
          <td class="text-xs font-rubik font-medium py-8 px-4">{{ sponsor.spent }}</td>
          <td class="text-xs font-rubik font-medium py-8 px-4">{{ getFormDate(sponsor.created_at) }}</td>
          <td class="text-xs font-rubik font-medium py-8 px-4">{{ sponsor.get_status_display }}</td>
          <td class="flex items-center w-full h-full justify-between py-8 px-4">
            <img class="cursor-pointer hover:scale-105" src="@/assets/images/svg/eye.svg" alt="eye">
            <img class="cursor-pointer hover:scale-105" src="@/assets/images/svg/edit.svg" alt="edit">
            <img class="cursor-pointer hover:scale-105" src="@/assets/images/svg/trash.svg" alt="delete">
          </td>
        </tr>
        </tbody>
      </table>
      <div class="flex justify-between items-center mt-4">
        <div class="flex items-center gap-4">
          <span>{{ sponsorData.count ?? 0 }} ta yozuvdan</span>
          <span>
            {{ (parameters.page - 1) * parameters.page_size + 1 }} -
            {{ Math.min(parameters.page * parameters.page_size, sponsorData.count ?? 0) }}
            ko'rsatilmoqda
          </span>
        </div>

        <!-- Справа: пагинация -->
        <div class="flex items-center gap-4">
          <!-- Select для page_size -->
          <div class="flex items-center gap-2">
            <span>Ko'rsatish</span>
            <select :value="parameters.page_size" @change="onPageSizeChange" class="border rounded px-2 py-1">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="30">30</option>
            </select>
          </div>
          <div class="flex items-center gap-2">
            <button
                class="px-2 py-1 rounded cursor-pointer"
                :disabled="parameters.page === 1"
                @click="changePage(parameters.page - 1)">
              <img src="@/assets/images/svg/arrow-left.svg" alt="arrow-left">
            </button>

            <button
                v-for="page in visiblePages"
                :key="page"
                class="px-3 py-1 rounded border bg-white  cursor-pointer"
                :class="parameters.page === page ? 'border-blue-400 text-blue-600' : 'border-gray-200'"
                @click="changePage(Number(page))"
            >
              {{ page }}
            </button>

            <button
                class="px-2 py-1 rounded cursor-pointer"
                :disabled="parameters.page === totalPages"
                @click="changePage(parameters.page + 1)">
              <img src="@/assets/images/svg/arrow-right.svg" alt="arrow-right">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, toRefs} from "vue"
import type { IPagination, ISponsorList } from "@/typing/interfaces"

interface IProps {
  sponsorData: Partial<IPagination<ISponsorList>>;
  parameters: {
    search: string;
    ordering: null | string;
    page: number;
    page_size: number;
  };
}

const props = defineProps<IProps>()
const { parameters, sponsorData } = toRefs(props)
const emit = defineEmits(["changePage", "updatePageSize"])

const tableHeader = [
  { id: 1, text: "#" },
  { id: 2, text: "F.I.SH." },
  { id: 3, text: "Tel.raqami" },
  { id: 4, text: "Homiylik summasi" },
  { id: 5, text: "Sarflangan summa" },
  { id: 6, text: "Sana" },
  { id: 7, text: "Holati" },
  { id: 8, text: "Amallar" },
]

const getFormDate = (date: string) => {
  const dateObj = new Date(date)
  return dateObj.toLocaleDateString("ru-RU")
}

const totalPages = computed(() => {
  return Math.ceil((sponsorData.value.count ?? 0) / parameters.value.page_size)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = parameters.value.page
  const total = totalPages.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", total)
    } else if (current >= total - 3) {
      pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, "...", current - 1, current, current + 1, "...", total)
    }
  }
  return pages
})




const changePage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    emit("changePage", page)
  }
}

const onPageSizeChange = (e: Event) => {
  const value = Number((e.target as HTMLSelectElement).value)
  emit("updatePageSize", value)
}
</script>
