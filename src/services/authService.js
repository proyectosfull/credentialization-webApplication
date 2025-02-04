import { api } from 'src/boot/axios'
import API_URLS from 'src/config/api_urls'

export async function login(credentials) {
  try {
    const response = await api.post(API_URLS.auth.login, credentials)
    return response
  } catch (error) {
    console.error('Login Error:', error)
    throw error
  }
}

export async function logout(credentials) {
  try {
    const response = await api.post(API_URLS.auth.logout, credentials)
    return response
  } catch (error) {
    console.error('Logout', error)
    throw error
  }
}
