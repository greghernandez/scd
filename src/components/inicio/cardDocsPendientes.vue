<template>
  <q-card class="my-card info-content">
    <q-card-section class="absolute-center">
      <div class="text-center">
        <div>
          <q-avatar class="secondary-spc" size="xl" text-color="secondary" icon="eva-archive-outline">
            <q-badge round floating color="primary">{{ numDocPendientes }}</q-badge>
          </q-avatar>
        </div>
        <div class="label-text">
          Documentos Pendientes
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
  name: 'cardDocsPen',
  data () {
    return {
      numDocPendientes: ''
    }
  },
  mounted () {
    apolloClient.mutate({
      mutation: DOCUMENTS_QUANTITY,
      variables: {
        userId: payload.userId,
        category: '999'
      }
    })
      .then(res => {
        console.log(res.data)
        this.numDocPendientes = res.data.documentsQuantity
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
