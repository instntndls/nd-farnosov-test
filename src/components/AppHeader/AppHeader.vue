<template>
  <header class="app-header" role="banner">
    <img src="/src/assets/icons/logo.svg" alt="Logo" class="logo" />

    <nav v-if="isAuthenticated" class="app-header__nav" aria-label="User Navigation">
      <span class="email-text" aria-live="polite">{{ userEmail }}</span>
      <Button
        class="user-button"
        style="background: var(--color-middle)"
        round
        @click="toggleDropdown"
        aria-label="User Menu"
      >
        <img src="/src/assets/icons/user.svg" class="icon" alt="User" />
      </Button>
      <div v-if="isDropdownOpen" class="dropdown" role="menu">
        <a @click="logout" role="menuitem">Выйти</a>
      </div>
    </nav>

    <Button
      v-else
      label="Вход"
      @click="isLoginModalOpen = true"
      aria-label="Login"
    >
      <img src="/src/assets/icons/login.svg" alt="User"/>
    </Button>
  </header>

  <!-- Модальное окно для входа -->
  <ModalWindow
    :error-message="errorMessage"
    :isOpen="isLoginModalOpen"
    title="Вход в ваш аккаунт"
    @close="isLoginModalOpen = false"
    role="dialog"
    aria-labelledby="login-dialog-title"
  >
    <Input v-model="email" label="Email" placeholder="Введите email" errorMessage="" aria-required="true" />
    <Input
      v-model="password"
      is-password
      label="Пароль"
      placeholder="Введите пароль"
      errorMessage=""
      aria-required="true"
    />
    <div class="modal-footer">
      <Button class="modal-btn" label="Войти" @click="login" aria-label="Submit Login" />
      <div class="modal-footer-text">
        <p class="text-small">У вас нет аккаунта?</p>
        <a
          @click="
            isRegisterModalOpen = true;
            isLoginModalOpen = false;
            errorMessage = ''
          "
          role="button"
        >
          Зарегистрируйтесь
        </a>
      </div>
    </div>
  </ModalWindow>

  <!-- Модальное окно для регистрации -->
  <ModalWindow
    :error-message="errorMessage"
    :isOpen="isRegisterModalOpen"
    title="Регистрация"
    @close="isRegisterModalOpen = false"
    role="dialog"
    aria-labelledby="register-dialog-title"
  >
    <Input v-model="email" label="Email" placeholder="Введите email" errorMessage="" aria-required="true" />
    <Input
      v-model="password"
      is-password
      label="Пароль"
      placeholder="Ввведите пароль"
      errorMessage=""
      aria-required="true"
    />
    <Input
      v-model="confirmPassword"
      is-password
      label="Пароль еще раз"
      placeholder="Ввведите пароль"
      errorMessage=""
      aria-required="true"
    />
    <div class="modal-footer">
      <Button class="modal-btn" label="Зарегистрироваться" @click="register" aria-label="Submit Registration" />
      <div class="modal-footer-text">
        <p class="text-small">У вас есть аккаунт?</p>
        <a
          @click="
            isLoginModalOpen = true;
            isRegisterModalOpen = false;
            errorMessage = ''
          "
          role="button"
        >
          Войдите
        </a>
      </div>
    </div>
  </ModalWindow>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/Button/Button.vue'
import Input from '@/components/Input/Input.vue'
import ModalWindow from '@/components/ModalWindow/ModalWindow.vue'
import { useRouter } from 'vue-router'

const isDropdownOpen = ref(false)
const isLoginModalOpen = ref(false)
const isRegisterModalOpen = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref()

const authStore = useAuthStore()
const isAuthenticated = ref(false)
const userEmail = ref('')
const router = useRouter()

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const login = async () => {
  const result = await authStore.login(email.value, password.value)

  if (result.success) {
    isLoginModalOpen.value = false
    isAuthenticated.value = await authStore.isAuthenticated
    location.reload()
  } else {
    errorMessage.value = result?.message
  }
}

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают'
    return
  }

  try {
    const result = await authStore.register(email.value, password.value)
    if (result?.success) {
      isRegisterModalOpen.value = false
      isLoginModalOpen.value = true
      errorMessage.value = ''

    } else {
      errorMessage.value = result?.message.toString().replace(/[\[\]"']/g, '')
    }
  } catch (error) {
    console.error(error)
  }
}

const logout = async () => {
  await authStore.logout()
  isAuthenticated.value = authStore.isAuthenticated
  router.push('/')
  isDropdownOpen.value = false
}

onMounted(async () => {
  isAuthenticated.value = authStore.isAuthenticated
  if (isAuthenticated.value) {
    try {
      const user = await authStore.fetchUserInfo()
      userEmail.value = user?.email || ''
    } catch (error) {
      console.error('Ошибка при загрузке информации о пользователе', error)
    }
  }

  router.afterEach((to) => {
    if (to.path === '/app' && !isAuthenticated.value) {
      router.push('/')
    }
  })
})
</script>

<style scoped>
.app-header {
  height: 136px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-dark);
}

.logo {
  width: 218.29px;
  height: 50px;
}

.app-header__nav {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.email-text {
  white-space: nowrap;
  min-width: 0;
  flex-shrink: 1;
}

@media (max-width: 1600px) {
  .app-header {
    height: 96px;
  }
}

/* Стили для дропдауна */
.dropdown {
  position: absolute;
  top: 80px;
  width: 145px;
  height: 108px;
  right: 0;
  background: var(--color-middle);
  color: var(--color-green-light);
  border-radius: 12px;
  box-shadow: 0px 15px 46px -10px rgba(0, 0, 0, 0.6);
  min-width: 145px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.dropdown::before {
  content: '';
  position: absolute;
  top: -10px;
  right: 20px;
  border-width: 0 10px 10px 10px;
  border-style: solid;
  border-color: transparent transparent var(--color-middle) transparent;
}

/* Стили для модальных окон */
.modal-footer {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 8px;
  align-items: center;
  justify-content: space-between;
}

.modal-footer-text {
  width: 60%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.modal-footer-text p {
  margin: 0;
  font-size: 16px;
}
.modal-footer-text a {
  margin: 0;
  font-size: 16px;
}

@media (max-width: 640px) {
  .app-header {
    width: 100%;
  }
  .user-button {
    padding: 0 !important;
    width: 36px !important;
    height: 36px !important;
  }
  .user-button img {
    height: 18px !important;
  }
  .email-text {
    font-size: 0;
    width: 0;
    padding: 0;
    margin: 0;
  }
  .logo {
    width: 154px;
    height: 36px;
  }
  .modal-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .modal-footer-text {
    margin-top: 8px;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
  }
  .modal-footer-text p {
    margin: 0;
    font-size: 14px;
  }
  .modal-footer-text a {
    margin: 0;
    font-size: 14px;
  }
}

@media (min-width: 640px) {
  .user-button {
    height: 56px;
    width: 56px;
  }
  .modal-footer-text {
    width: 100%;
  }

  .modal-footer {
    margin-top: 14px;
    flex-direction: row-reverse;
    align-items: stretch;
  }
  .modal-btn {
    width: fit-content;
  }
}
</style>
