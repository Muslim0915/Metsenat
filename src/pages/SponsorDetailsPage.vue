<template>
  <div class="flex flex-col w-full items-center gap-10 flex-1">
    <div class="flex flex-col w-full items-center bg-[#FCFCFC] py-6">
      <div class="container flex items-center gap-4 mx-auto cursor-pointer" @click="router.back()">
        <img src="@/assets/images/svg/big-arrow-left.svg" alt="arrow-left">
        <h1 class="font-rubik font-extrabold text-2xl">{{sponsor.full_name}}</h1>
      </div>
    </div>
    <div class="flex container  justify-center w-full items-center">
      <div class="flex flex-col p-8 w-full bg-white gap-6 rounded-xl">
        <div class="flex items-center justify-between">
          <h2 class="font-rubik font-extrabold text-2xl">Homiy haqida</h2>
          <button class="py-3 px-8 flex items-center gap-2 cursor-pointer bg-blue-100 rounded-md text-blue-600">
            <img src="@/assets/images/svg/edit.svg" alt="edit">
            <span class="font-rubik font-medium">Tahrirlash</span>
          </button>
        </div>
        <div class="flex items-center gap-4">
          <StateIcon :icon-url="profileIcon" bg-class="rounded-md" icon-alt="profile" />
          <div class="max-w-[165px] w-full font-rubik font-medium whitespace-break-spaces">
            {{sponsor.full_name}}
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-3">
            <h3 class="text-xs text-gray-400 font-medium uppercase tracking-widest">
              telefon raqami
            </h3>
            <span class="font-rubik font-medium">{{sponsor.phone}}</span>
          </div>
          <div class="flex flex-col gap-3">
            <h3 class="text-xs text-gray-400 font-medium uppercase tracking-widest">
              homiylik summasi
            </h3>
            <span class="font-rubik font-medium">{{sponsor.sum}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col items-center justify-end w-full">
      <img src="@/assets/images/png/sponsor-details-bg.png" alt="bg-image" width="820" height="614">
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ISponsorList} from "@/typing/interfaces";
import {onMounted, ref} from "vue";
import axiosInstance from "@/api/axios.ts";
import {useRoute} from "vue-router";
import router from "@/router";
import StateIcon from "@/components/StateIcon.vue";
import profileIcon from '@/assets/images/svg/profile.svg'

const sponsor = ref<Partial<ISponsorList>>({})
const route = useRoute();

const fetchSponsorDetails = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/sponsor-detail/${id}/`)
    sponsor.value = response.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchSponsorDetails(Number(route.params.id))
})
</script>
