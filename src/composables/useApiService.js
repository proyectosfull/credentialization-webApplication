import { api } from 'src/boot/axios'
import { LocalStorage } from 'quasar'

const request = async ({ url, method, data = null, headers = {} }) => {
  try {
    const response = await api({
      url,
      method,
      data,
      headers,
    })

    console.log('API Response:', response.data)

    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error.response || error.message
  }
}

export const login = async (url, credentials) => {
  try {
    const response = await request({
      url,
      method: 'post',
      data: credentials,
    })

    const { bearer_token, profile, roles } = response
    if (bearer_token) {
      LocalStorage.setItem('roles', roles)
      LocalStorage.setItem('profile', profile)
      LocalStorage.setItem('bearer_token', bearer_token)
    }

    return response
  } catch (error) {
    console.error('Login Error:', error)
    throw error
  }
}

export const logout = async (url = null) => {
  try {
    if (url) {
      // Notifica al backend que el usuario cerró sesión
      await request({
        url,
        method: 'post',
      })
    }

    LocalStorage.removeItem('auth_token') // Limpia el token del almacenamiento
    console.log('Sesión cerrada correctamente')
  } catch (error) {
    console.error('Logout Error:', error)
    throw error
  }
}

export const deleteData = async (url) => {
  return request({ url, method: 'delete' })
}

export const getData = async (url, pagination = false) => {
  const response = await request({ url, method: 'get' })
  if (!pagination) {
    return response.data?.data || response.data
  }
  return response
}

export const formData = async (url, method, data) => {
  return request({
    url,
    method,
    data,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const urlEncoded = async (url, method, data) => {
  return request({
    url,
    method,
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
}
