import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { docentesQueryAdmin, userQueryToolbar } from '../../services/graphql/queries'
import { DELETE_USER, userPhotoUpdate } from '../../services/graphql/mutations'

/**
 * Query for docentes
 * @param { commit }
 */
export function docentesQuery ({ commit }) {
  return new Promise(resolve => {
    apolloClient.query({
      query: docentesQueryAdmin,
      variables: {
        page: 0,
        perPage: 0
      }
    })
      .then(res => {
        const docentesData = res.data.users
        commit('setDocentes', docentesData)
        resolve(res)
      })
  })
}
/**
 * Gets user data
 * @param {*} userId - user id
 */
export function userData ({ commit }, userId) {
  return new Promise((resolve, reject) => {
    apolloClient.query({
      query: userQueryToolbar,
      variables: {
        id: userId
      },
      context: {
        hasUpload: true
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * Update user profile photo
 * @param {*} payload - user id and photo file
 */
export function updateUserProfilePic ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    apolloClient.mutate({
      mutation: userPhotoUpdate,
      variables: {
        id: payload.userId,
        photo: payload.photo
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function eliminarDocente ({ commit, dispatch }, userId) {
  return new Promise(resolve => {
    apolloClient.mutate({
      mutation: DELETE_USER,
      variables: {
        id: userId.userId
      }
    })
      .then(res => {
        console.log(res.data)
        let id = res.data._id
        // dispatch('docentesQuery')
        commit('deleteDocente', id)
        Notify.create({
          color: 'positive',
          icon: 'eva-checkmark-circle-outline',
          message: 'Se elimino correctamente el docente seleccionado'
        })
        resolve(res)
      })
      .catch(res => {
        Notify.create({
          color: 'negative',
          icon: 'eva-alert-triangle-outline',
          message: 'Ocurrió un error, intentalo de nuevo'
        })
      })
  })
}
