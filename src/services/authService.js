import { api } from 'src/boot/axios'
import API_URLS from 'src/config/api_urls'
import { LocalStorage } from 'quasar'

export async function login(credentials) {
  try {
    const response = await api.post(API_URLS.auth.login, credentials)

    const { bearer_token, profile, roles } = response.data
    if (bearer_token) {
      LocalStorage.setItem('profile', {
        email: profile.email,
        image: profile.selfie_path,
        full_name: profile.full_name,
      })
      LocalStorage.setItem('roles', roles[0])
      LocalStorage.setItem('bearer_token', bearer_token)
    }

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
