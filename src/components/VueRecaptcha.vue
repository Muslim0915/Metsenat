<template>
  <div
    class="g-recaptcha"
    :data-sitekey="siteKey"
    :data-callback="verifiedCallbackName"
    :data-expired-callback="expiredCallbackName"
  ></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ siteKey?: string }>()

const emit = defineEmits<{
  (e: 'update:token', v: string | null): void
  (e: 'verified', v: string): void
  (e: 'expired'): void
}>()

const siteKey = props.siteKey || (import.meta.env.VITE_RECAPTCHA_SITE_KEY as string)

const verifiedCallbackName = '__vueRecaptchaVerified'
const expiredCallbackName = '__vueRecaptchaExpired'

onMounted(() => {
  (window as any)[verifiedCallbackName] = (token: string) => {
    emit('update:token', token)
    emit('verified', token)
  }
  ;(window as any)[expiredCallbackName] = () => {
    emit('update:token', null)
    emit('expired')
  }
  const g: any = (window as any).grecaptcha
  if (g && typeof g.render !== 'function') {
    document.querySelectorAll('script[src*="recaptcha/api.js"]').forEach((el) => el.parentElement?.removeChild(el))
    try { delete (window as any).grecaptcha } catch { (window as any).grecaptcha = undefined }
  }
  if (!document.querySelector('#g-recaptcha-script')) {
    const s = document.createElement('script')
    s.id = 'g-recaptcha-script'
    s.src = 'https://www.google.com/recaptcha/api.js'
    s.async = true
    s.defer = true
    document.head.appendChild(s)
  }
})

onBeforeUnmount(() => {
  try { delete (window as any)[verifiedCallbackName] } catch {}
  try { delete (window as any)[expiredCallbackName] } catch {}
})
</script>