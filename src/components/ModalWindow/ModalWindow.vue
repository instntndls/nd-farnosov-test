<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Button from '@/components/Button/Button.vue'

interface Props {
  title?: string
  isOpen: boolean
  errorMessage?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['close'])

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <div v-if="isOpen">
    <div class="overlay"></div>
    <div class="modal-window">
      <div class="modal-content">
        <div class="modal-header">
          <h2 v-if="title">{{ title }}</h2>
          <Button
            style="position: absolute; top: 14px; right: 14px"
            class="close-btn"
            label=""
            @click="emit('close')"
            round
          >
            <img src="/src/assets/icons/close.svg" alt="close" />
          </Button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <p v-if="props.errorMessage" class="error-message">
          {{ props.errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-dark);
  opacity: 0.8;
  z-index: 999;
}

.modal-window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--color-middle);
  border-radius: 4vh;
  height: fit-content;
  z-index: 1000;
  animation: scale-in 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-content {
  padding: 4vh 4vw;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.modal-body {
  display: flex;
  gap: 48px;
  flex-direction: column;
}

.error-message {
  color: #ff7461;
  background: rgba(255, 116, 97, 0.1);
  padding: 8px 20px;
  border-radius: 24px;
}

@media (min-width: 1600px) {
  .modal-window {
    width: 40vw;
  }
}

@media (max-width: 1600px) {
  .modal-window {
    width: 50vw;
  }
}

@media (max-width: 1000px) {
  .modal-content {
    padding: 0 4vw 4vh 4vw;
  }
  .modal-header h2 {
    width: 70%;
    font-weight: 500;
    font-size: 32px;
    line-height: 36px;
    letter-spacing: 0%;
  }
  .modal-window {
    width: 90vw;
  }
}

@keyframes scale-in {
  from {
    transform: translate(-50%, -50%) scale(0.9);
  }
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
