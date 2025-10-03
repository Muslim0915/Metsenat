<template>
  <div class="flex flex-col pt-12 flex-1">
    <div class="container mx-auto">
      <div class="grid grid-cols-3 gap-7">
        <div v-for="card in stateCards" :key="card.id" class="flex items-center gap-4 p-6 bg-white rounded-md">
          <StateIcon :icon-url="card.icon" bg-class="rounded-lg" bg-size="w-12 h-12" :bg-color="card.bgColor"
                     icon-alt="money"/>
          <div class="flex flex-col gap-2">
            <h4 class="font-normal font-rubik text-xs text-gray-500">{{ card.text }}</h4>
            <p class="flex items-center gap-1 text-xl font-rubik font-medium">
              <span>{{ card.value }}</span>
              <span class="text-gray-400">{{ card.currency }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto">
      <LineChart />
    </div>
  </div>
</template>

<script setup lang="ts">

import StateIcon from "@/components/StateIcon.vue";
import moneyBlue from '@/assets/images/png/money-blue.png'
import moneyYellow from '@/assets/images/png/money-yellow.png'
import moneyRed from '@/assets/images/png/money-red.png'
import { computed } from "vue";
import type {IDashboardData} from "@/typing/interfaces";
import LineChart from "@/components/LineChart.vue";

interface IProps {
  dashboardData: IDashboardData;
}

const props = defineProps<IProps>();

const dashboardData = computed(() => props.dashboardData);

const stateCards = computed(() => [
  {
    id: 1,
    icon: moneyBlue,
    text: "Jami to'langan summa",
    value: dashboardData.value.total_paid,
    currency: 'UZS',
    bgColor: '#4C6FFF1A'
  },
  {
    id: 2,
    icon: moneyYellow,
    text: "Jami so‘ralgan summa",
    value: dashboardData.value.total_need,
    currency: 'UZS',
    bgColor: '#EDC7001A'
  },
  {
    id: 3,
    icon: moneyRed,
    text: "To‘lanishi kerak summa",
    value: dashboardData.value.total_must_pay,
    currency: 'UZS',
    bgColor: '#ED72001A'
  },
])
</script>
