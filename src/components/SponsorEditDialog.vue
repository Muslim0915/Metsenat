<template>
  <div
      class="bg-black/30 fixed inset-0 flex items-center justify-center z-10"
      @click="closeDialog()"
  >
    <div
        @click.stop
        class="w-1/2 flex flex-col gap-4 bg-white p-6 rounded-md"
    >
      <div class="flex items-center justify-between">
        <h2 class="font-rubik font-extrabold text-2xl">Tahrirlash</h2>
        <img
            src="@/assets/images/svg/close.svg"
            alt="close"
            class="cursor-pointer"
            @click="closeDialog()"
        />
      </div>

      <hr class="w-full border border-gray-200" />
      <div class="w-full grid grid-cols-2 border-2 border-blue-100 rounded-md overflow-hidden cursor-pointer">
        <div
            :class="[
            !form.is_legal
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500',
            'flex items-center justify-center font-medium font-rubik text-xl uppercase tracking-widest py-2',
          ]"
            @click="form.is_legal = false"
        >
          <span>Jismoniy shaxs</span>
        </div>
        <div
            :class="[
            form.is_legal
              ? 'bg-blue-500 text-white'
              : 'bg-white text-blue-500',
            'flex items-center justify-center font-medium font-rubik text-xl uppercase tracking-widest py-2',
          ]"
            @click="form.is_legal = true"
        >
          <span>Yuridik shaxs</span>
        </div>
      </div>
      <div class="flex flex-col gap-7">
        <AppInput
            v-model="form.full_name"
            id="fullName"
            label="F.I.Sh. (Familiya Ism Sharifingiz)"
            placeholder="Ism Familiya"
            :error="errors.full_name"
        />

        <AppInput
            v-model="form.phone"
            id="phone"
            label="Telefon raqami"
            placeholder="Telefon raqami"
            maxlength="15"
            :error="errors.phone"
            @input="onlyPhoneNumber($event)"
        />

        <AppInput
            v-model.number="form.sum"
            id="sum"
            type="number"
            label="Summasi"
            placeholder="Summasi"
            :error="errors.sum"
        />
        <AppInput
            v-if="form.is_legal"
            v-model.number="form.firm"
            id="firm"
            type="text"
            label="tashkilot nomi"
            placeholder="tashkilot nomi"
            :error="errors.firm"
        />
        <AppInput
            v-model="form.comment"
            id="comment"
            label="Izoh"
            placeholder="Izoh"
            isTextarea
            rows="3"
        />
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button
            class="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            @click="closeDialog()"
        >
          Bekor qilish
        </button>
        <button
            class="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600"
            @click="submitForm"
        >
          Saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { ISponsor } from "@/typing/interfaces";
import { useToast } from "vue-toastification";
import AppInput from "@/components/ui/AppInput.vue";

interface IProps {
  sponsor?: ISponsor;
}
const props = defineProps<IProps>();
const emit = defineEmits(["close-dialog", "submit"]);
const toast = useToast();

const form = reactive({
  full_name: props.sponsor?.full_name ?? "",
  phone: props.sponsor?.phone ?? "",
  sum: props.sponsor?.sum ?? 0,
  is_legal: props.sponsor?.is_legal ?? false,
  firm: props.sponsor?.firm ?? "",
  comment: props.sponsor?.comment ?? "",
});
const errors = reactive({
  full_name: "",
  phone: "",
  sum: "",
  firm: ""
});

const phoneRegex = /^\+998\s?\(?\d{2}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/;

const onlyPhoneNumber = (event: Event) => {
  const target = event.target as HTMLInputElement;
  target.value = target.value.replace(/[^+\d]/g, "");
  form.phone = target.value;
};

const resetErrors = () => {
  errors.full_name = "";
  errors.phone = "";
  errors.sum = "";
  errors.firm = "";
};

const validateForm = () => {
  let valid = true;
  resetErrors();
  if (!form.full_name.trim()) {
    errors.full_name = "Bu maydon majburiy";
    valid = false;
  }
  if (!form.phone.trim()) {
    errors.phone = "Bu maydon majburiy";
    valid = false;
  } else if (!phoneRegex.test(form.phone)) {
    errors.phone = "Telefon raqam noto‘g‘ri. Masalan: +998 (90) 123 45 67";
    valid = false;
  }
  if (!form.sum || form.sum <= 0) {
    errors.sum = "Bu maydon majburiy";
    valid = false;
  }
  if (form.is_legal && !form.firm.trim()) {
    errors.firm = "Bu maydon majburiy";
    valid = false;
  }

  if (!valid) toast.error("Formada xatoliklar mavjud");
  return valid;
};


const closeDialog = () => {
  resetErrors();
  emit("close-dialog");
};

const submitForm = () => {
  if (!validateForm()) return;
  emit("submit", { ...form });
};
</script>



