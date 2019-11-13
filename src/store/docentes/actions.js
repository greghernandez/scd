import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { docentesQueryAdmin } from '../../services/graphql/queries'
import { DELETE_USER } from '../../services/graphql/mutations'

/**
 * docentesQuery
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
        console.log('DOCENTES:')
        console.log(res.data.users)
        commit('setDocentes', docentesData)
        resolve(res)
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
