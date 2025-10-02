<template>
  <div class="flex flex-1 flex-col">
    <!--tabs-->
    <div class="flex flex-col bg-[#FCFCFC] py-6">
      <div class="container mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center rounded overflow-hidden border-2 border-[#E0E7FF]">
            <button
                v-for="tab in tabs" :key="tab.id"
                class="px-14 py-4 font-rubik border-r-2 border-[#E0E7FF] last:border-r-0 font-medium cursor-pointer hover:bg-blue-400 hover:text-white transition-all ease-in-out duration-300 uppercase text-xs tracking-widest"
                :class="activeTab === tab.id ? 'bg-blue-400 text-white' : 'bg-transparent text-blue-400'"
                @click="activeTab = tab.id">
              <span>{{ tab.text }}</span>

            </button>
          </div>
          <div class="flex items-center gap-5">
            <div class="flex items-center gap-2 bg-gray-200 rounded-md p-2">
              <img src="@/assets/images/svg/search.svg" alt="search" class="w-6 h-6">
              <input type="text" placeholder="Izlash" class="bg-transparent font-rubik flex-1 outline-none border-0">
            </div>
            <div
                class="flex items-center justify-center gap-2 py-3 px-8 bg-blue-100 text-blue-500 font-medium rounded-md cursor-pointer">
              <img src="@/assets/images/svg/filter.svg" alt="filter">
              <span>Filter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <component :is="currentTabComponent" />
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";
import Dashboard from "@/components/DashboardTabs/Dashboard.vue";
import Sponsors from "@/components/DashboardTabs/Sponsors.vue";
import Students from "@/components/DashboardTabs/Students.vue";

const activeTab = ref(2)

const tabs = [
  {id: 1, text: 'Dashboard'},
  {id: 2, text: 'Homiylar'},
  {id: 3, text: 'Talabalar'}
]

const tabComponents = [
  {id: 1, component: Dashboard},
  {id: 2, component: Sponsors},
  {id: 3, component: Students}
]

const currentTabComponent = computed(() => {
  return tabComponents.find(tab => tab.id === activeTab.value)?.component
})
</script>
