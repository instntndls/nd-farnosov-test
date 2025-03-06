<script setup lang="ts">
import { computed } from "vue";
import Button from '@/components/Button/Button.vue'

interface Props {
  title: string;
  text: string;
  buttonText?: string;
  buttonIcon?: string;
}

const props = defineProps<Props>();

const truncatedTitle = computed(() => props.title.length > 100 ? props.title.slice(0, 100) + "..." : props.title);
const truncatedText = computed(() => props.text.length > 500 ? props.text.slice(0, 500) + "..." : props.text);
</script>

<template>
  <div class="note-card">
    <div class="note-header">
      <h4>{{ truncatedTitle }}</h4>
    </div>

    <div class="note-body">
      <p class="text-normal" style="margin: 0;padding: 20px 28px 28px 28px ; display: -webkit-box; -webkit-line-clamp: 9; -webkit-box-orient: vertical; overflow: hidden;">{{ truncatedText }}</p>
      <div style="height: 36px; background: red;"></div>
    </div>

    <div class="note-footer">
      <Button label="Удалить" icon="/src/assets/icons/close.svg"></Button>
    </div>
  </div>
</template>

<style scoped>
.note-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 72px;
  height: fit-content;
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  overflow: hidden;
}

.note-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 56px 20px 28px;
  background: var(--color-green-light);
  border-bottom: 0.08vw solid var(--color-green-middle);
}

.note-body {
  display: flex;
  flex-direction: column;
  max-height: 336px;
  background: var(--color-green-light);
  align-items: flex-start;
}

.note-footer {
  display: flex;
  height: fit-content;
  justify-content: flex-end;
  padding: 8px;
  align-items: center;
  background: var(--color-green-light);
}

</style>
