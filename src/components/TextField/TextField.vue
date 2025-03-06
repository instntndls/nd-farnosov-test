<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  label?: string;
  placeholder?: string;
  modelValue: string;
  maxlength?: number;
  errorMessage?: string;
  isPassword?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const inputType = ref(props.isPassword ? "password" : "text");
const togglePassword = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};

const charCount = computed(() => props.modelValue.length);
const isLimitExceeded = computed(() => props.maxlength && charCount.value >= props.maxlength);
</script>

<template>
  <div class="input-container" :class="{ error: errorMessage }">
    <label v-if="label" style="padding: 0 24px; color: var(--color-gray)" class="text-small">{{ label }}</label>
    <div class="input-wrapper">
      <textarea
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="maxlength"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        class="input-field"
        style="
          color: var(--color-dark);
          font-family: 'Montserrat', sans-serif;
          font-weight: 300;
          font-size: 18px;
          line-height: 28px;
          height: 264px;
          padding: 16px 0 0 28px;
          border-radius: 36px;
          border-width: 2px;
        "
      />
      <button v-if="isPassword" type="button" class="toggle-password" @click="togglePassword">
        <img v-if="inputType !== 'text'" src="/src/assets/icons/off-password.svg" alt="logo" class="logo">
        <img v-else src="/src/assets/icons/on-password.svg" alt="logo" class="logo">
      </button>
    </div>
    <div class="input-meta" >
      <span v-if="errorMessage" style="color: #FF7461" class="text-small">{{ errorMessage }}</span>
      <span v-if="maxlength" class="text-small" :style="{ color: isLimitExceeded ? '#FF7461' : '' }" style="margin-left: auto;">
        {{ charCount }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  border-radius: 3px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;
  padding-right: 40px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.input-field:focus {
  box-shadow: inset 0 0 0 2px var(--color-green);
}

.input-field:hover {
  box-shadow: inset 0 0 0 2px var(--color-green);
}

.input-field::placeholder {
  color: var(--color-gray);
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
}

.toggle-password {
  height: fit-content;
  top: 40%;
  position: absolute;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.input-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 0 24px;
  color: var(--color-gray);
}

.input-container.error .input-field {
  border-color: #FF7461;
}
</style>
