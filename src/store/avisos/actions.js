// import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { noticesQuery, noticeQuery } from '../../services/graphql/queries'
import { statusNotices } from '../../../enviroment.dev'
import { noticeDeleteMutation, noticeCreateMutation, noticeUpdateMutation } from '../../services/graphql/mutations'

/**
 * Get all notices
 */
export function avisosQuery ({ commit }) {
  return new Promise(resolve => {
    apolloClient.query({
      query: noticesQuery,
      variables: {
        page: 0,
        perPage: 0,
        status: statusNotices.todos
      }
    })
      .then(res => {
        commit('setAvisos', res.data.notices)
        resolve(res)
      })
  })
}
/**
 * get a specific notice
 * @param {String} idAviso - Id notice
 */
export function avisoQuery ({ commit }, idAviso) {
  return new Promise(resolve => {
    apolloClient.query({
      query: noticeQuery,
      variables: {
        id: idAviso
      }
    })
      .then(res => {
        commit('setAviso', res.data.notice)
        resolve(res)
      })
  })
}
/**
 * Create a new notice
 * @param {*} aviso - new notice data
 */
export function createAviso ({ commit, dispatch }, aviso) {
  return new Promise(resolve => {
    apolloClient.mutate({
      mutation: noticeCreateMutation,
      variables: {
        file: aviso.file,
        input: {
          title: aviso.title,
          body: aviso.body,
          status: 1,
          link: aviso.link,
          fromDate: aviso.fromDate,
          toDate: aviso.toDate,
          createdBy: aviso.createdBy
        }
      },
      context: {
        hasUpload: true
      }
    })
      .then(res => {
        let nuevoAviso = res.data.createNotice
        // dispatch('avisosQuery')
        commit('addAviso', nuevoAviso)
        resolve(res)
      })
  })
}
/**
 * update a notice with a specific id
 * @param {*} aviso - Notice data
 */
export function updateAviso ({ commit }, aviso) {
  return new Promise(resolve => {
    apolloClient.mutate({
      mutation: noticeUpdateMutation,
      variables: {
        id: aviso.id,
        file: aviso.file,
        input: {
          title: aviso.title,
          body: aviso.body,
          status: 1,
          link: aviso.link,
          fromDate: aviso.fromDate,
          toDate: aviso.toDate
        }
      },
      context: {
        hasUpload: true
      }
    })
      .then(res => {
        commit('updateAviso', aviso)
        resolve(res)
      })
  })
}
/**
 * deletes a notice
 * @param {*} idAviso - notice id
 */
export function deleteAviso ({ commit }, idAviso) {
  return new Promise(resolve => {
    apolloClient.mutate({
      mutation: noticeDeleteMutation,
      variables: {
        id: idAviso
      }
    })
      .then(res => {
        commit('deleteAviso', res.data.deleteNotice._id)
        resolve(res)
      })
  })
}
