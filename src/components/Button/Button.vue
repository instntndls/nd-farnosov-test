<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string
  icon?: string
  round?: boolean
  disabled?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['click'])

const buttonClass = computed(() => [
  'base-button',
  { round: props.round, disabled: props.disabled },
])
</script>

<template>
  <button :class="buttonClass" :disabled="disabled" @click="emit('click')">
    <img v-if="icon" :src="`/nd-farnosov-test${icon}`" alt="icon" class="icon" />
    <p v-if="label" style="" class="text-normal">
      {{ label }}
    </p>
  </button>
</template>

<style scoped>
.base-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 56px;
  padding: 0 24px;
  background: var(--color-green-light);
  border: none;
  border-radius: 32px;
  color: white;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  transition: 0.2s;
}

.base-button.round {
  width: 56px;
  height: 56px;
  justify-content: center;
}

.base-button:hover {
  background: var(--color-green-middle);
}

.base-button:active {
  background: var(--color-green-dark);
}

.base-button.disabled {
  background: var(--color-gray);
  cursor: not-allowed;
}
</style>
