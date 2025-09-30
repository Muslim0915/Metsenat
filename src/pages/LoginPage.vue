<template>
  <div class="flex flex-1 items-center justify-center">
    <Loader v-if="loading"/>
    <div class="flex flex-col gap-12">
      <Logo/>
      <div class="flex flex-col gap-11 p-8 bg-white rounded">
        <h1 class="text-2xl font-bold">Kirish</h1>
        <form class="flex flex-col gap-6" @submit.prevent="login">
          <div class="flex flex-col gap-1">
            <label class="font-rubik uppercase text-xs font-medium" for="login">login</label>
            <input
                type="text"
                id="login"
                v-model="username"
                class="border border-gray-300 focus:border-blue-500 outline-none bg-[#E0E7FF33] rounded p-2"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label class="font-rubik uppercase text-xs font-medium" for="password">parol</label>
            <input
                type="password"
                id="password"
                v-model="password"
                class="border border-gray-300 focus:border-blue-500 outline-none bg-[#E0E7FF33] rounded p-2"
            />
          </div>
          <div class="flex justify-center">
            <VueRecaptcha v-model:token="recaptchaToken" />
          </div>
          <button
            class="bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed cursor-pointer text-white font-rubik font-medium py-2 rounded"
            :disabled="!isValid"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import Logo from "@/components/Logo.vue"
import Loader from "@/components/Loader.vue"
import axiosInstance from "@/api/axios.ts"
import router from "@/router"
import VueRecaptcha from "@/components/VueRecaptcha.vue"

const username = ref("")
const password = ref("")
const loading = ref(false)

const recaptchaToken = ref<string | null>(null)

const isValid = computed(() => {
  return (
    loading.value ||
    username.value ||
    password.value ||
    recaptchaToken.value
  )
})

const login = async () => {
  try {
    loading.value = true

    if(!isValid.value) return;

    const response = await axiosInstance.post("/auth/login/", {
      username: username.value,
      password: password.value,
      recaptcha: recaptchaToken.value,
    })

    localStorage.setItem("token", response.data.access)
    await router.push({ name: "Main" })
  } catch (error) {
    console.error("Login error:", error)
  } finally {
    loading.value = false
  }
}
</script>

