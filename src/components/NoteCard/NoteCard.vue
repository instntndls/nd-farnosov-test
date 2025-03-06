<script setup lang="ts">
import { computed } from 'vue'
import Button from '@/components/Button/Button.vue'

interface Props {
  title: string
  text: string
  buttonText?: string
  buttonIcon?: string
}

const props = defineProps<Props>()

const emit = defineEmits(['delete'])

const truncatedTitle = computed(() =>
  props.title.length > 100 ? props.title.slice(0, 100) + '...' : props.title,
)
const truncatedText = computed(() =>
  props.text.length > 500 ? props.text.slice(0, 500) + '...' : props.text,
)
</script>

<template>
  <article
    class="note-card"
    role="article"
    aria-label="Note card"
    :title="props.title"
  >
    <div class="note-header" role="heading" aria-level="2">
      <div
        style="height: 100%; position: absolute; right: 84px; top: 0; width: 40px"
        role="presentation"
      >
        <div
          style="
            border-radius: 0 0 0 12px;
            height: 40px;
            width: 40px;
            background: linear-gradient(
              to top right,
              var(--color-green) 0%,
              var(--color-green) 50%,
              var(--color-dark) 50%,
              var(--color-dark) 100%
            );
          "
          role="presentation"
        ></div>
      </div>
      <h4 role="heading">{{ truncatedTitle }}</h4>
    </div>

    <div class="note-body" role="document">
      <p
        class="text-normal"
        style="
          margin: 0;
          padding: 20px 28px 28px 28px;
          display: -webkit-box;
          -webkit-line-clamp: 9;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
        "
        role="paragraph"
      >
        {{ truncatedText }}
      </p>
    </div>

    <div class="note-footer" role="contentinfo">
      <Button
        @click="emit('delete')"
        label="Удалить"
        icon="/src/assets/icons/close.svg"
        aria-label="Delete note"
        role="button"
      ></Button>
    </div>
  </article>
</template>

<style scoped>
.note-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 72px;
  height: fit-content;
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
  border-radius: 12px 0 12px 12px;
  overflow: hidden;
}

.note-header {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 20px 56px 20px 28px;
  background: var(--color-green-light);
  border-bottom: 0.08vw solid var(--color-green);
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
