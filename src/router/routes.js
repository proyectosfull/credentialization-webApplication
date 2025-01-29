const routes = [
  {
    path: '/',
    component: () => import('layouts/loginLayout.vue'),
  },
  {
    path: '/usuarios',
    component: () => import('layouts/usersLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
