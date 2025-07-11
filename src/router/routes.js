const routes = [
  {
    path: '/',
    component: () => import('src/layouts/loginLayout.vue'),
  },
  {
    path: '/usuarios',
    component: () => import('src/layouts/userLayout.vue'),
    children: [
      {
        path: 'listado',
        component: () => import('src/pages/usersPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
