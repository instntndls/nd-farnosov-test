<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NoteCard from '@/components/NoteCard/NoteCard.vue'
import { useNotesStore } from '@/stores/notes.ts'

const notesStore = useNotesStore()

const notes = ref()

onMounted(async () => {
  await handleFetchNotes()
})

const handleFetchNotes = async () => {
  try {
    await notesStore.fetchNotes()
    notes.value = notesStore.notes
  } catch (error) {
    alert('Ошибка при получении заметок')
  }
}

const handleDeleteNote = async (noteId: number) => {
  try {
    await notesStore.deleteNote(noteId)
    await handleFetchNotes()
  } catch (error) {
    alert('Ошибка при удалении заметки')
  }
}
</script>

<template>
  <div class="container">
    <div class="card-grid">
      <NoteCard
        v-for="note in notes"
        :key="note"
        :title="note?.title"
        :text="note?.content"
        buttonText="Подробнее"
        buttonIcon="/src/assets/icons/arrow-right.svg"
        @delete="handleDeleteNote(note.id)"
      />
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  width: fit-content;
  gap: 24px;
}
.card-grid {
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1000px) {
  .card-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
