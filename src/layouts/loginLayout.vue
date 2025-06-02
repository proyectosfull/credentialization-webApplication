<template>
  <q-layout class="flex">
    <div class="row full-width">
      <!-- Left Side - Login Form -->
      <div class="col-12 col-md-6 q-pa-none flex flex-center">
        <div class="login-container text-center" style="width: 100%; max-width: 500px">
          <!-- Logo -->
          <div class="text-center q-mb-lg">
            <q-img
              src="~/assets/images/logo.png"
              style="max-width: 60%; height: auto"
              alt="Onboarding Digital Logo"
            />
          </div>

          <h1 class="text-h3 text-weight-bold q-mb-lg text-dark">Bienvenido de nuevo</h1>
          <div class="text-uppercase text-subtitle1 text-primary text-weight-bold q-my-md">
            Inicio de sesión
          </div>

          <!-- Login Form -->
          <q-form @submit="onSubmit" novalidate>
            <q-input
              v-model="form.email"
              outlined
              label="Correo electrónico"
              type="email"
              :error="!!errors.email"
              :error-message="errors.email"
              @blur="validateField('email')"
            />

            <q-input
              v-model="form.password"
              outlined
              label="Contraseña"
              class="q-my-sm"
              :type="isPwd ? 'password' : 'text'"
              :error="!!errors.password"
              :error-message="errors.password"
              @blur="validateField('password')"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-btn
              type="submit"
              color="primary"
              class="full-width q-py-sm q-mt-md text-weight-bold"
              style="background: #1a237e"
              label="Continuar"
              :loading="isLoading"
            >
              <template v-slot:loading>
                <q-spinner-tail />
              </template>
            </q-btn>
          </q-form>
        </div>
      </div>

      <!-- Right Side - Illustration -->
      <div class="col-12 col-md-6 bg-grey-1 flex flex-center">
        <div class="illustration-container q-pa-md">
          <!-- Update Notice -->
          <div class="text-right q-mb-xl">
            <div class="text-h6">Gestión inteligente, seguridad garantizada.</div>
            <p class="text-grey-7 q-mb-sm">La tecnología que protege quién eres.</p>
          </div>

          <!-- Main Illustration -->
          <q-img
            src="~/assets/svg/background.svg"
            style="max-width: 100%; height: auto"
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  </q-layout>
  <q-dialog v-model="dialogNotifyModel" position="top">
    <notify-dialog
      @answer="dialogNotifyModel = false"
      :title="onTitle"
      :messages="onComment"
      :color="onColor"
    />
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

import { login } from 'src/services/authService'
import { notify } from '../config/notifications'
import NotifyDialog from '../components/dialogs/notifyDialog.vue'
import { validateForm, validateFieldSchema } from '../utils/validations/useLoginForm'

/** Component Notify */
const onColor = ref('')
const onTitle = ref('')
const onComment = ref('')
const dialogNotifyModel = ref(false)

const router = useRouter()

const form = ref({
  email: '',
  password: '',
})

const errors = ref({})
const isPwd = ref(true)
const isLoading = ref(false)

const validateField = async (fieldName) => {
  try {
    await validateFieldSchema(fieldName, form.value[fieldName])
    errors.value[fieldName] = null
  } catch (error) {
    errors.value[fieldName] = error.message
  }
}

const onSubmit = async () => {
  const { isValid, errors: validationErrors } = await validateForm(form.value)

  if (isValid) {
    errors.value = {}
    try {
      isLoading.value = true
      const response = await login(form.value)

      if (response.data.status) {
        const roles = LocalStorage.getItem('roles')

        if (roles === 'administrador') {
          router.replace('/usuarios/listado')
        } else showNotify(notify.TITLE.BASE, notify.LOGIN.NOT_ADMIN, notify.COLOR.FALSE)
      } else showNotify(notify.TITLE.BASE, response.data.errors, notify.COLOR.FALSE)
    } catch (error) {
      console.error(error)
      showNotify(notify.TITLE.BASE, notify.ERROR, notify.COLOR.FALSE)
    } finally {
      isLoading.value = false
    }
  } else {
    errors.value = validationErrors
  }
}

const showNotify = (title, comment, color) => {
  onTitle.value = title
  onComment.value = comment
  onColor.value = color
  dialogNotifyModel.value = true
}
</script>

<style scoped>
.login-container {
  padding: 1rem;
}

.illustration-container {
  max-width: 600px;
  width: 100%;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .illustration-container {
    max-width: 400px;
  }
}
</style>
