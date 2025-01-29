import { LocalStorage, Notify } from 'quasar'
import { boot } from 'quasar/wrappers'
import axios from 'axios'

const myBaseURL = 'http://172.241.131.200:3366/demo/credentialization/public/api/'

const api = axios.create({ baseURL: myBaseURL })
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
api.defaults.headers.common['Access-Control-Allow-Credentials'] = false

api.interceptors.request.use(
  function (config) {
    const token = LocalStorage.getItem('auth_token')
    if (token) {
      config.headers = { Authorization: LocalStorage.getItem('auth_token') }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    let myMessage = 'Algo salió mal, vuelva a intentarlo.'
    let icon = 'error'
    if (error.response.status === 401) {
      console.log('Error 401')
    } else if (error.response.status === 403) {
      myMessage = 'No tiene permisos para acceder a este recurso.'
      icon = 'gpp_maybe'
    } else if (error.response.status === 404) {
      myMessage = 'El recurso no está disponible.'
      icon = 'upcoming'
      return
    } else {
      myMessage = 'Ocurrió un problema, inténtelo más tarde.'
    }

    Notify.create({
      message: myMessage,
      color: 'red-10',
      icon: icon,
      actions: [{ label: 'X', color: 'secondary', handler: () => {} }],
    })
    return Promise.reject(error)
  },
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }
