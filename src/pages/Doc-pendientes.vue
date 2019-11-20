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
    <div>
      <DocumentsSection />
    </div>
  </div>
</template>

<script>
import DocumentsSection from '../components/documentos/docsSection'
// import { apolloClient } from '../boot/vue-apollo'
// import { documentsTartaro } from '../services/graphql/queries'
// import { payload } from '../services/user'

export default {
  name: 'PageDocPendientes',
  components: {
    DocumentsSection
  },
  data () {
    return {
      search: ''
    }
  }
}
</script>
