const routes = [
  {
    path: '/login',
    component: () => import('pages/login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'mi-perfil', component: () => import('pages/Perfil.vue') },
      { path: 'docente/:clave', name: 'docente', component: () => import('pages/PerfilDocente.vue') },
      { path: 'documentos', component: () => import('pages/Documentos.vue') },
      {
        path: 'documentos/categorias/:id',
        name: 'categorias',
        component: () => import('pages/Categorias.vue'),
        children: [
          { path: 'subcat/:idSub', name: 'subcategoria', component: () => import('pages/Categorias.vue') }
        ]
      },
      { path: 'documentos-pendientes', name: 'pendientes', component: () => import('pages/Doc-pendientes.vue') },
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
