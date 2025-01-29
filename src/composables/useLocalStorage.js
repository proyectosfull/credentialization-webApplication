import { LocalStorage } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()

export const validateRole = () => {
  const roles = LocalStorage.getItem('roles')
  if (roles[0] === 'administrador') {
    router.replace('/usuarios')
    return true
  } else return false
}

export const cleanRoute = () => {
  const token = LocalStorage.getItem('bearer_token')
  if (!token) {
    router.replace('/')
  }
}
