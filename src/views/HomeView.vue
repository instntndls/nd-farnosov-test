<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
import Input from '@/components/Input/Input.vue'
import { ref } from 'vue'
import TextField from '@/components/TextField/TextField.vue'
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue'
import NoteCard from '@/components/NoteCard/NoteCard.vue'

const inputData = ref('')
const isModalOpen = ref(false);

const email = ref('')
const password = ref('')
</script>

<template>
  <div class="container">

    <div class="card-grid">
      <NoteCard
        title="Название заметки"
        text="А также явные признаки победы институционализации могут быть объединены в целые кластеры себе подобных."
        buttonText="Подробнее"
        buttonIcon="/src/assets/icons/arrow-right.svg"
      />
      <NoteCard
        title="Название заметки"
        text="Не следует, однако, забывать, что базовый вектор развития предопределяет высокую востребованность позиций, занимаемых участниками в отношении поставленных задач. Вот вам яркий пример современных тенденций — повышение уровня гражданского сознания требует анализа переосмысления внешнеэкономических политик."
        buttonText="Подробнее"
        buttonIcon="/src/assets/icons/arrow-right.svg"
      />
      <NoteCard
        title="Название заметки"
        text="Не следует, однако, забывать, что базовый вектор развития предопределяет высокую востребованность позиций, занимаемых участниками в отношении поставленных задач. Вот вам яркий пример современных тенденций — повышение уровня гражданского сознания требует анализа переосмысления внешнеэкономических политик."
        buttonText="Подробнее"
        buttonIcon="/src/assets/icons/arrow-right.svg"
      />
    </div>


    <header class="header">
      <Button label="Вход" icon="/src/assets/icons/login.svg"></Button>
      <Button style="background-color: var(--color-middle)" label="" round icon="/src/assets/icons/user.svg"></Button>
      <TextField model-value="" placeholder="Поиск" maxlength="20"></TextField>
    </header>
    <header class="header">
      <Button label="Вход" disabled icon="/src/assets/icons/login.svg"></Button>
      <Button label="" disabled round icon="/src/assets/icons/close.svg"></Button>
    </header>

    <a href="asdasd">Зарегистрируйтесь</a>

    <TextField label="Введите значение" v-model="inputData" placeholder="Введите значение" maxlength="500" errorMessage="Сообщение"></TextField>
    <h2>
      Heading H2
    </h2>
    <h3>
      Heading H3
    </h3>
    <h4>
      Heading H4
    </h4>
    <p class="text-normal">
      Text normal
    </p>
    <p class="text-small">
      Text small
    </p>
    <p class="text-small-bold">
      Text small bold
    </p>
  </div>
  <button @click="isModalOpen = true">Открыть модалку</button>


</template>

<style scoped>
.title {
  width: 208px;
}
header {
  display: flex;
  justify-content: space-between;
  width: fit-content;
  gap: 24px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
</style>


