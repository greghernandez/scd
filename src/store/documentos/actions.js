import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { documentsTartaro, DOCUMENTS_QUANTITY } from '../../services/graphql/queries'
import { MOVE_DOCUMENT, DELETE_DOCUMENT, multipleUpload, DELETE_DOCUMENTS, MOVE_DOCUMENTS } from '../../services/graphql/mutations'

/**
 * DocumentosQuery
 * @param commit
 * @param payload
 */
export function documentosQuery ({ commit }, payload) {
  return new Promise(resolve => {
    console.log('----- Query documentos ----')
    commit('resetStore')
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
        console.log('Documentos - QRY', documentos)
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

export function documentosQty ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    apolloClient.mutate({
      mutation: DOCUMENTS_QUANTITY,
      variables: {
        userId: payload.userId,
        category: payload.category
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

export function subirDocumentos ({ commit }, payload) {
  return new Promise(resolve => {
    commit('isUploading')
    // Subir documento
    apolloClient.mutate({
      mutation: multipleUpload,
      variables: {
        files: payload.files,
        input: {
          category: payload.category,
          owner: payload.owner
        }
      },
      context: {
        hasUpload: true
      }
    })
      .then(res => {
        console.log(res.data.multipleUpload)
        console.log('page', payload.page)
        console.log('global', payload.global)
        if (payload.global !== true) {
          commit('addDocuments', res.data.multipleUpload)
        } else if (payload.global === true && payload.page === 'pendientes') {
          commit('addDocuments', res.data.multipleUpload)
        }
        commit('isUploading')
        resolve(res)
      })
      .catch(err => console.log(err))
  })
}

export function moverDocumento ({ commit }, payload) {
  return new Promise((resolve, reject) => {
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
        reject(err)
      })
  })
}

export function moverDocumentos ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    console.log('PAYLOAD:', payload)
    // Mover Documento
    apolloClient.mutate({
      mutation: MOVE_DOCUMENTS,
      variables: {
        oids: payload.oids,
        cat: payload.cat
      }
    })
      .then(res => {
        console.log('Respuesta:', res)
        const ids = payload.oids
        commit('deleteDocumentos', ids)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function eliminarDocumento ({ commit }, id) {
  return new Promise((resolve, reject) => {
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
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function eliminarDocumentos ({ commit }, ids) {
  return new Promise((resolve, reject) => {
    apolloClient.mutate({
      mutation: DELETE_DOCUMENTS,
      variables: {
        ids: ids
      }
    })
      .then(res => {
        console.log('Respuesta:', res)
        const idDoc = ids
        commit('deleteDocumentos', idDoc)
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
