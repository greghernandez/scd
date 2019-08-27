
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'documentos', component: () => import('pages/Documentos.vue') },
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
