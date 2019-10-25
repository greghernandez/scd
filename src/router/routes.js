const isAuth = localStorage.getItem('scd-at') || false

const routes = [
  {
    path: '/login',
    component: () => import('pages/login.vue'),
    beforeEnter: (to, from, next) => {
      if (isAuth) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (!isAuth) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'mi-perfil', component: () => import('pages/Perfil.vue') },
      { path: 'perfil', component: () => import('pages/PerfilVisitante.vue') },
      { path: 'documentos', component: () => import('pages/Documentos.vue') },
      { path: 'documentos/categorias/:id', component: () => import('pages/Categorias.vue') },
      { path: 'documentos-pendientes', component: () => import('pages/Doc-pendientes.vue') },
      { path: 'rubros', component: () => import('pages/Rubros.vue') },
      { path: 'avisos', component: () => import('pages/Avisos.vue') },
      { path: 'docentes', component: () => import('pages/Docentes.vue') },
      { path: 'Administradores', component: () => import('pages/Administradores.vue') }
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
