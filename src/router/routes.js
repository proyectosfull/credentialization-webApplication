const routes = [
  {
    path: '/',
    component: () => import('src/layouts/LoginLayout.vue'),
  },
  {
    path: '/usuarios',
    component: () => import('src/layouts/UserLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
