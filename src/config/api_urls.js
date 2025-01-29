export const API_URLS = {
  auth: {
    login: '/login',
    logout: '/logout',
  },
  users: {
    index: '/users',
    show: (id) => `/users/${id}`,
    update: (id) => `/users/${id}`,
    delete: (id) => `/users/${id}`,
  },
}

export default API_URLS
