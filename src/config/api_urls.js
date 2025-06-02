export const API_URLS = {
  auth: {
    login: '/login',
    logout: '/logout',
  },

  users: {
    index: '/users',
    byId: (id) => `/users/${id}`,
  },
}

export default API_URLS
