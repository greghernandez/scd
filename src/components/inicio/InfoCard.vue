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
import { payload } from '../../services/user'
import { mapActions } from 'vuex'

export default {
  name: 'InfoCard',
  data () {
    return {
      numDocumentos: '',
      numDocPendientes: ''
    }
  },
  methods: {
    ...mapActions({
      documentosQuery: 'documentos/actions'
    })
  },
  mounted () {
    this.$store
      .dispatch('documentos/documentosQty', {
        userId: payload.userId,
        category: '000'
      })
      .then(res => {
        this.numDocumentos = res.data.documentsQuantity
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
