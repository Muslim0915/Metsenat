<template>
  <div class="flex flex-col gap-2">
    <label
        v-if="label"
        :for="id"
        class="text-xs font-medium font-rubik uppercase tracking-widest"
    >
      {{ label }}
    </label>
    <textarea
        v-if="isTextarea"
        v-model="model"
        :id="id"
        :placeholder="placeholder"
        :rows="rows"
        class="border border-[#E0E7FF] bg-[#F9FAFF] focus:ring-1 focus:ring-blue-500 font-rubik rounded-md p-2 w-full outline-none"
    ></textarea>

    <input
        v-else
        v-model="model"
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :maxlength="maxlength"
        class="border font-rubik rounded-md p-2 w-full outline-none border-[#E0E7FF] bg-[#F9FAFF] focus:ring-1 focus:ring-blue-500"
        :class="{ 'border-red-500': error }"
        @input="$emit('update:modelValue', model)"
    />

    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  modelValue: string | number;
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  maxlength?: string;
  error?: string;
  isTextarea?: boolean;
  rows?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const model = ref(props.modelValue);

watch(
    () => props.modelValue,
    (val) => {
      model.value = val;
    }
);

watch(model, (val) => {
  emit("update:modelValue", val);
});
</script>
