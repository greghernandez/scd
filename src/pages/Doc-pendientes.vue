<template>
  <div>
    <h4 class="q-mb-sm">Documentos pendientes</h4>
    <div>
      <DocumentsSection category="999"/>
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
