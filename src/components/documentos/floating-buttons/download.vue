<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 86]">
      <q-btn fab text-color="primary" color="white" icon="eva-cloud-download-outline" @click="descargarDocumentos()"/>
    </q-page-sticky>
  </div>
</template>

<script>
import DescargarDocumentos from 'components/documentos/descargarDocumentos'

export default {
  name: 'FloatingDownload',
  data () {
    return {
      title: '',
      id: ''
    }
  },
  props: {
    catId: {
      type: String
    },
    catTitle: {
      type: String
    }
  },
  methods: {
    descargarDocumentos () {
      this.$q.dialog({
        component: DescargarDocumentos,
        parent: this,
        title: this.catTitle,
        preTicket: this.$store.state.documentos.selected,
        catId: this.catId
      })
    }
  }
}
</script>
