<template>
  <div class="about" role="main" aria-labelledby="about-title">
    <div class="text-block">
      <h1 id="about-title">Мои заметки</h1>
      <h3>Не забывай о важном, храни его в облаке.</h3>
    </div>
    <img
      src="/src/assets/icons/group.svg"
      alt="group"
      class="group"
      loading="lazy"
      aria-hidden="true"
    />
  </div>
</template>

<style>
@media (max-width: 600px) {
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .about h1 {
    margin: 0;
    text-align: center;
    font-size: 60px;
    line-height: 64px;
    letter-spacing: 0%;
  }
  .about h3 {
    margin: 12px;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0%;
    text-align: center;
    color: var(--color-gray);
  }
  .group {
    width: 75vw;
  }
  .text-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 600px) {
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .about h1 {
    width: 80%;
    margin: 0;
    text-align: center;
    font-size: 104px;
    line-height: 104px;
    letter-spacing: 0%;
  }
  .about h3 {
    margin: 12px;
    font-size: 32px;
    line-height: 48px;
    letter-spacing: 0%;
    text-align: center;
    color: var(--color-gray);
  }
  .group {
    width: 75vw;
  }
  .text-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (min-width: 900px) {
  .about {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .about h1 {
    width: 60%;
    margin: 0;
    text-align: start;
    font-weight: 900;
    font-size: 104px;
    line-height: 104px;
    letter-spacing: 0%;
  }
  .about h3 {
    width: 60%;
    margin: 0;
    letter-spacing: 0%;
    text-align: start;
    font-weight: 400;
    font-size: 32px;
    line-height: 48px;

    color: var(--color-gray);
  }
  .group {
    margin-top: 0;
    width: 45vw;
  }
  .text-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 32px;
    height: 40vh;
  }
}
</style>
<script setup lang="ts"></script>
