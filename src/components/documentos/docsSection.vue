<template>
    <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12 doc-label" v-for="(documents, index) in pendingDocs" :key="index">
          <DocLabel :objId="documents._id" :fileId="documents.fileId" :fileName="documents.fileName" :createdAt="documents.createdAt"/>
        </div>
    </div>
</template>

<script>
import DocLabel from 'components/documentos/documentoLabel'
import { apolloClient } from '../../boot/vue-apollo'
import { documentsTartaro } from '../../services/graphql/queries'
import { payload } from '../../services/user'

export default {
  name: 'documentsSection',
  components: {
    DocLabel
  },
  data () {
    return {
      search: undefined,
      pendingDocs: []
    }
  },
  mounted () {
    console.log(payload.userId)
    apolloClient.query({
      query: documentsTartaro,
      variables: {
        search: {
          user: payload.userId,
          page: 0,
          perPage: 0,
          category: '999'
        }
      }
    })
      .then(res => {
        this.pendingDocs = res.data.documents
        console.log(this.pendingDocs)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>