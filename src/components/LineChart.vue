<template>
  <div class="p-4 shadow-md rounded-xl">
    <div class="text-xl font-bold mb-2">Homiylar va talabalar soni</div>

    <VueApexCharts
        type="line"
        height="350"
        :options="chartOptions"
        :series="series"
    />
    <button @click="generateRandomNumber" class="cursor-pointer bg-blue-100 rounded-md py-2 px-4">
      Randomizer
    </button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import VueApexCharts from "vue3-apexcharts";

const generateRandomData = () => Array(12).fill(0).map(() => Math.floor(Math.random() * 50000) + 100);

const series = ref([
  {
    name: "Homiylar",
    data: generateRandomData(),
  },
  {
    name: "Talabalar",
    data: generateRandomData(),
  },
]);

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
  },
  colors: ["#3365FC", "#FF6384"],
  stroke: {
    curve: "smooth",
    width: 3,
  },
  markers: {
    size: 4,
    hover: { size: 7 },
  },
  xaxis: {
    categories: [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "Avgust",
      "Sentabr",
      "Oktabr",
      "Noyabr",
      "Dekabr",
    ],
  },
  yaxis: {
    labels: {
      formatter: (val: number) => val.toLocaleString("uz-UZ"),
    },
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    markers: {
      radius: 12,
    },
  },
});

function generateRandomNumber() {
  series.value = series.value.map(serie => ({
    ...serie,
    data: serie.data.map(() => Math.floor(Math.random() * (50000 - 100 + 1)) + 100)
  }));
}

</script>