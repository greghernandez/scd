// import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { documentsTartaro } from '../../services/graphql/queries'
import { MOVE_DOCUMENT } from '../../services/graphql/mutations'

/**
 * DocumentosQuery
 * @param commit
 * @param payload
 */
export function documentosQuery ({ commit }, payload) {
  return new Promise(resolve => {
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
        resolve(res)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
