
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    meta: { guest: true },
    children: [
      {
        path: 'login',
        component: () => import('pages/auth/Login.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', name: 'dashboard', component: () => import('pages/Index.vue') },
      { path: 'user', component: () => import('pages/user/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
