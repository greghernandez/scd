// import token service
import { isTokenValid } from '../services/user'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // Call verify token function
    let valid = isTokenValid()
    // check if router requires auth to enter
    if (to.matched.some(record => record.meta.requiresAuth)) {
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
    // Redirect a logged user to home page
    if (valid) {
      if (to.path === '/login') {
        next({ path: '/' })
      }
    }
  })
}
