<template>
  <div class="flex flex-1 flex-col pb-20">
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
              <img @click="fetchSponsorsList()" src="@/assets/images/svg/search.svg" alt="search"
                   class="w-6 h-6 cursor-pointer">
              <input
                  v-model="search" type="text" placeholder="Izlash"
                  class="bg-transparent font-rubik flex-1 outline-none border-0">
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
    <Dashboard :dashboardData="dashboardData" v-if="activeTab === 1"/>
    <Sponsors
        v-if="activeTab === 2"
        :sponsorData="sponsorsData ?? {}"
        :parameters="parameters"
        :loading="loading"
        @changePage="onChangePage"
        @updatePageSize="onUpdatePageSize"
    />

    <Students v-if="activeTab === 3"/>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import Dashboard from "@/components/DashboardTabs/Dashboard.vue";
import Sponsors from "@/components/DashboardTabs/Sponsors.vue";
import Students from "@/components/DashboardTabs/Students.vue";
import axiosInstance from "@/api/axios.ts";
import type {IPagination, ISponsorList} from "@/typing/interfaces";
import type {IDashboardData} from "@/typing/interfaces";

const activeTab = ref(1);
const search = ref("");
const loading = ref(false)
const dashboardData = ref<IDashboardData>({
  total_paid: 0,
  total_need: 0,
  total_must_pay: 0,
})

const tabs = [
  {id: 1, text: 'Dashboard'},
  {id: 2, text: 'Homiylar'},
  {id: 3, text: 'Talabalar'}
]

const sponsorsData = ref<Partial<IPagination<ISponsorList>>>({});

const parameters = computed(() => ({
  search: search.value,
  ordering: null,
  page: 1,
  page_size: 10
}))

const fetchSponsorsList = async () => {
  loading.value = true
  try {
    const response = await axiosInstance.get('/sponsor-list/', {
      params: parameters.value
    })
    sponsorsData.value = response.data
  } catch (error) {
    console.error(error, 'error')
  } finally {
    loading.value = false
  }
}

const fetchDashboardData = async () => {
  try {
    const response = await axiosInstance.get('/dashboard/');
    dashboardData.value = response.data;
  } catch (error) {
    console.error(error)
  }
}

const onChangePage = (page: number) => {
  parameters.value.page = page
  fetchSponsorsList()
}

const onUpdatePageSize = (size: number) => {
  parameters.value.page_size = size
  fetchSponsorsList()
}

onMounted(() => {
  fetchSponsorsList();
  fetchDashboardData();
})
</script>
