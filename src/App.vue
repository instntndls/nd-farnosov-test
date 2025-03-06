<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Import the auth store
import AppHeader from '@/components/AppHeader/AppHeader.vue'
import { onMounted, ref } from 'vue'
import Button from '@/components/Button/Button.vue'
import Input from '@/components/Input/Input.vue'
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue'
import { useNotesStore } from '@/stores/notes.ts'
import TextField from '@/components/TextField/TextField.vue'
import Landing from '@/views/Landing.vue'
import HomeView from '@/views/HomeView.vue'
const notesStore = useNotesStore()

const authStore = useAuthStore() // Access the auth store
const router = useRouter()

const fetchNotes = () => notesStore.fetchNotes() // Access the router instance

const isCreateModalOpen = ref(false)
const errorMessage = ref()

const newNoteTitle = ref('')
const newNoteContent = ref('')

const handleCreateNote = async () => {
  try {
    await notesStore.createNote(newNoteTitle.value, newNoteContent.value)
    newNoteTitle.value = ''
    newNoteContent.value = ''
    await fetchNotes()
    isCreateModalOpen.value = false
    // Очистка формы
  } catch (error) {
    errorMessage.value = error
  }
}

onMounted(() => {

})
</script>

<template>
  <div class="app" role="main">
    <AppHeader />
    <Landing v-if="!authStore.isAuthenticated"/>
    <HomeView v-else/>
  </div>

  <Button
    v-if="authStore.isAuthenticated"
    class="add-button"
    @click="isCreateModalOpen = true"
    round
    aria-label="Add note"
  >
    <img src="/src/assets/icons/add.svg" alt="Add">
  </Button>

  <ModalWindow
    :error-message="errorMessage"
    :isOpen="isCreateModalOpen"
    title="Добавление заметки"
    @close="isCreateModalOpen = false"
    role="dialog"
    aria-labelledby="create-note-title"
    aria-describedby="create-note-description"
  >
    <div style="width: 100%; display: flex; flex-direction: column; gap: 80px">
      <Input
        v-model="newNoteTitle"
        label="Название заметки"
        placeholder="Введите название"
        errorMessage=""
        :maxlength="100"
        aria-required="true"
      />
      <TextField
        v-model="newNoteContent"
        label="Текст заметки"
        placeholder="Введите текст"
        errorMessage=""
        :maxlength="500"
        aria-required="true"
      />
    </div>

    <div>
      <Button class="modal-btn" label="Добавить" @click="handleCreateNote()" aria-label="Add note" />
    </div>
  </ModalWindow>
</template>

<style scoped>
.modal-btn {
  margin-left: auto;
  margin-top: -12px;
}
.app {
  position: relative;
}
.add-button {
  position: fixed;
  bottom: 24px;
  right: 24px;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 1);
}
@media (min-width: 1600px) {
  .app {
    padding: 0 7vw;
  }
}
@media (max-width: 1600px) {
  .add-button {
    right: 8px;
  }
  .app {
    padding: 0 4vw;
  }
}
@media (max-width: 640px) {
  .modal-btn {
    width: 100%;
  }
}
</style>
