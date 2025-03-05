<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="container">
    <div class="">
      <img src="/src/assets/icons/logo.svg" alt="logo" class="logo">
      <img src="/src/assets/icons/Group.svg" alt="logo" class="group">
    </div>

    <header class="header">
      <Button label="Вход" icon="/src/assets/icons/login.svg"></Button>
      <Button style="background-color: var(--color-middle)" label="" round icon="/src/assets/icons/user.svg"></Button>
    </header>
    <header class="header">
      <Button label="Вход" disabled icon="/src/assets/icons/login.svg"></Button>
      <Button label="" disabled round icon="/src/assets/icons/close.svg"></Button>
    </header>
    <a href="asdasd">Зарегистрируйтесь</a>
    <h1 class="title">
      Мои заметки
    </h1>
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
</template>

<style scoped>
.logo {
  width: 218.29px;
  height: 50px;
}
.title {
  width: 208px;
}
header {
  display: flex;
  justify-content: space-between;
  width: fit-content;
  gap: 24px;
}
</style>


