<template>
  <div>
    <h4 class="q-mb-sm">Documentos pendientes</h4>
    <div>
      <q-input class="search search-input q-my-xs" bg-color="white" rounded outlined dense v-model="search"
        placeholder="Buscar categorías" type="search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="row">
      <div class="col-md-3 col-xs-6 doc-label" v-for="n in 20" :key="n">
        <DocLabel/>
      </div>
    </div>
  </div>
</template>

<script>
import DocLabel from 'components/documentos/documentoLabel'
import { apolloClient } from '../boot/vue-apollo'
import { documentsTartaro } from '../services/graphql/queries'
import { payload } from '../services/user'

export default {
  name: 'PageDocPendientes',
  components: {
    DocLabel
  },
  data () {
    return {
      search: undefined
    }
  },
  mounted () {
    apolloClient.query({
      query: documentsTartaro,
      variables: {
        userid: payload,
        page: 0,
        perPage: 0
      }
    })
  }
}
</script>
