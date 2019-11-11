<template>
  <q-card class="my-card info-content">
    <q-card-section class="absolute-center">
      <div class="text-center">
        <div>
          <q-avatar class="secondary-spc" size="lg" text-color="secondary" icon="eva-file-outline" />
        </div>
        <div>
          <h4 class="q-my-none">{{ numDocumentos }}</h4>
        </div>
        <div class="label-text">
          Documentos
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { DOCUMENTS_QUANTITY } from '../../services/graphql/queries'
import { apolloClient } from '../../boot/vue-apollo'
import { payload } from '../../services/user'

export default {
  name: 'InfoCard',
  data () {
    return {
      numDocumentos: '',
      numDocPendientes: ''
    }
  },
  mounted () {
    apolloClient.mutate({
      mutation: DOCUMENTS_QUANTITY,
      variables: {
        userId: payload.userId,
        category: '000'
      }
    })
      .then(res => {
        console.log(res.data)
        this.numDocumentos = res.data.documentsQuantity
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
