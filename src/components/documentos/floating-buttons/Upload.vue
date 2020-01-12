<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab class="text-primary" icon="eva-cloud-upload-outline" @click="subirDocumentos()"/>
    </q-page-sticky>
  </div>
</template>

<script>
import SubirDocumentos from 'components/documentos/subirDocumentos'

export default {
  name: 'FloatingUpload',
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
    subirDocumentos () {
      if (this.catId === undefined) {
        this.title = 'Documentos Pendientes'
        this.id = '5db33a924dc61d2260e5c507'
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
