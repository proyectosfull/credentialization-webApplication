import { api } from 'src/boot/axios'
import API_URLS from 'src/config/api_urls'

export async function getUsers(params = {}) {
  try {
    const response = await api.get(API_URLS.users.index, { params: params })
    return response
  } catch (error) {
    console.error('Get Users Error:', error)
    throw error
  }
}

export async function saveUser(user) {
  try {
    const response = await api.post(API_URLS.users.index, user)
    return response
  } catch (error) {
    console.error('Save User Error:', error)
    throw error
  }
}
