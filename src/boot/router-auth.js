import { isTokenValid } from '../services/user'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      let valid = isTokenValid()
      if (valid === false) {
        next({
          path: '/login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
