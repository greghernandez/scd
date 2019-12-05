// import { Notify } from 'quasar'
import { apolloClient } from '../../boot/vue-apollo'
import { noticesQuery, noticeQuery } from '../../services/graphql/queries'
import { statusNotices } from '../../../enviroment.dev'
import { noticeDeleteMutation, noticeCreateMutation, noticeUpdateMutation } from '../../services/graphql/mutations'

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
        console.log('Avisos:', res.data.notices)
        commit('setAvisos', res.data.notices)
        resolve(res)
      })
  })
}

export function avisoQuery ({ commit }, idAviso) {
  return new Promise(resolve => {
    console.log(idAviso)
    apolloClient.query({
      query: noticeQuery,
      variables: {
        id: idAviso
      }
    })
      .then(res => {
        console.log('Aviso:', res.data.notice)
        commit('setAviso', res.data.notice)
        resolve(res)
      })
  })
}

export function createAviso ({ commit }, aviso) {
  return new Promise(resolve => {
    console.log(aviso)
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
        console.log(res.data)
        commit('addAviso', aviso)
        resolve(res)
      })
  })
}

export function updateAviso ({ commit }, aviso) {
  return new Promise(resolve => {
    console.log(aviso)
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
        console.log(res.data)
        commit('updateAviso', aviso)
        resolve(res)
      })
  })
}

export function deleteAviso ({ commit }, idAviso) {
  return new Promise(resolve => {
    console.log(idAviso)
    apolloClient.mutate({
      mutation: noticeDeleteMutation,
      variables: {
        id: idAviso
      }
    })
      .then(res => {
        console.log(res.data)
        commit('deleteAviso', res.data.deleteNotice._id)
        resolve(res)
      })
  })
}
