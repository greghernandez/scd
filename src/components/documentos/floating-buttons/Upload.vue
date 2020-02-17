<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab class="text-white" color="primary" icon="eva-cloud-upload-outline" @click="subirDocumentos()"/>
    </q-page-sticky>
  </div>
</template>

<script>
import SubirDocumentos from 'components/documentos/subirDocumentos'
import { rubros } from '../../../../enviroment.dev'

export default {
  name: 'FloatingUpload',
  data () {
    return {
      title: '',
      id: ''
    }
  },
  props: {
    // Category id
    catId: {
      type: String
    },
    // category title
    catTitle: {
      type: String
    }
  },
  methods: {
    // check the page where the dialog is called to set property id
    subirDocumentos () {
      if (this.catId === undefined) {
        this.title = 'Documentos Pendientes'
        this.id = rubros.pendientes
      } else {
        this.title = this.catTitle
        this.id = this.catId
      }
      this.$q.dialog({
        component: SubirDocumentos,
        parent: this,
        title: this.title,
        category: this.id,
        unelevated: true,
        rounded: true,
        btnColor: 'primary'
      })
    }
  }
}
</script>
