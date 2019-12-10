import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { documentsTartaro } from '../../services/graphql/queries'
import { MOVE_DOCUMENT, DELETE_DOCUMENT } from '../../services/graphql/mutations'

/**
 * DocumentosQuery
 * @param commit
 * @param payload
 */
export function documentosQuery ({ commit }, payload) {
  return new Promise(resolve => {
    console.log('Categoria de documentos', payload.category)
    apolloClient.query({
      query: documentsTartaro,
      variables: {
        search: {
          user: payload.userId,
          page: 0,
          perPage: 0,
          category: payload.category
        }
      }
    })
      .then(res => {
        const documentos = res.data.documents
        console.log('Documentos', documentos)
        commit('setDocumentos', documentos)
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        Notify.create({
          color: 'negative',
          icon: 'eva-alert-triangle-outline',
          message: 'Ocurrió un error, intentalo de nuevo'
        })
      })
  })
}

export function moverDocumento ({ commit }, payload) {
  return new Promise(resolve => {
    console.log('PAYLOAD:', payload)
    // Mover Documento
    apolloClient.mutate({
      mutation: MOVE_DOCUMENT,
      variables: {
        doc: payload.doc,
        cat: payload.cat
      }
    })
      .then(res => {
        console.log('Respuesta:', res)
        const id = payload.doc
        commit('deleteDocumento', id)
        Notify.create({
          color: 'positive',
          icon: 'eva-checkmark-circle-outline',
          message: 'Se movió correctamente el documento seleccionado'
        })
        resolve(res)
      })
      .catch(err => {
        Notify.create({
          color: 'negative',
          icon: 'eva-alert-triangle-outline',
          message: 'Ocurrió un error, intentalo de nuevo'
        })
        console.log(err)
      })
  })
}

export function eliminarDocumento ({ commit }, id) {
  return new Promise(resolve => {
    console.log('ID a eliminar', id)
    apolloClient.mutate({
      mutation: DELETE_DOCUMENT,
      variables: {
        id: id
      }
    })
      .then(res => {
        console.log('Respuesta:', res)
        const idDoc = id
        commit('deleteDocumento', idDoc)
        Notify.create({
          color: 'positive',
          icon: 'eva-checkmark-circle-outline',
          message: 'Se eliminó correctamente el documento seleccionado'
        })
        resolve(res)
      })
      .catch(err => {
        Notify.create({
          color: 'negative',
          icon: 'eva-alert-triangle-outline',
          message: 'Ocurrió un error, intentalo de nuevo'
        })
        console.log(err)
      })
  })
}
