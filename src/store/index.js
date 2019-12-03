import Vue from 'vue'
import Vuex from 'vuex'
import docentes from './docentes'
import documentos from './documentos'
import avisos from './avisos'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      docentes,
      documentos,
      avisos
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
