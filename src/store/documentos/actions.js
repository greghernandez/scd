import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { documentsTartaro, DOCUMENTS_QUANTITY, INSPECT_CATEGORY } from '../../services/graphql/queries'
import { MOVE_DOCUMENT, DELETE_DOCUMENT, multipleUpload, DELETE_DOCUMENTS, MOVE_DOCUMENTS } from '../../services/graphql/mutations'

/**
 * Load documents of a certain category
 * @param commit - vuex commit function
 * @param payload - user and category id´s
 */
export function documentosQuery ({ commit }, payload) {
  return new Promise(resolve => {
    commit('resetStore')
    apolloClient.cache.reset()
    apolloClient.query({
      query: documentsTartaro,
      variables: {
        search: {
          user: payload.user,
          page: 0,
          perPage: 0,
          category: payload.category
        }
      },
      refetch: true
    })
      .then(res => {
        const documentos = res.data.documents
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
/**
 * Gets information about an specific category
 * @param {Object} payload - user and category id
 */
export function inspectCategory ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    if (payload.reset) {
      commit('resetCatPoints')
    }
    apolloClient.cache.reset()
    apolloClient.query({
      query: INSPECT_CATEGORY,
      variables: {
        user: payload.user,
        category: payload.category
      }
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
/**
 * Gets documents quantity about a specific category
 * @param {*} payload - User and category id
 */
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
/**
 * Upload documents
 * @param {*} payload - files, owner and category id to upload
 */
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
/**
 * Move a document
 * @param {*} payload - document ID and category id to move it
 */
export function moverDocumento ({ commit, dispatch }, payload) {
  return new Promise((resolve, reject) => {
    // Move Document
    apolloClient.mutate({
      mutation: MOVE_DOCUMENT,
      variables: {
        doc: payload.doc,
        cat: payload.cat
      }
    })
      .then(res => {
        const id = payload.doc
        commit('deleteDocumento', id)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * Moves documents
 * @param {*} payload - documents ID and category id to move them
 */
export function moverDocumentos ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    // Move Document
    apolloClient.mutate({
      mutation: MOVE_DOCUMENTS,
      variables: {
        oids: payload.oids,
        cat: payload.cat
      }
    })
      .then(res => {
        const ids = payload.oids
        commit('deleteDocumentos', ids)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * Delete a document
 * @param {Object} id - id of document to delete
 */
export function eliminarDocumento ({ commit }, id) {
  return new Promise((resolve, reject) => {
    apolloClient.mutate({
      mutation: DELETE_DOCUMENT,
      variables: {
        id: id
      }
    })
      .then(res => {
        const idDoc = id
        commit('deleteDocumento', idDoc)
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
/**
 * Delete documents
 * @param {Object} id - id of documents to delete
 */
export function eliminarDocumentos ({ commit }, ids) {
  return new Promise((resolve, reject) => {
    apolloClient.mutate({
      mutation: DELETE_DOCUMENTS,
      variables: {
        ids: ids
      }
    })
      .then(res => {
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
