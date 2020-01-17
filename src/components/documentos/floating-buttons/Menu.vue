<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 86]">
      <q-fab icon="eva-more-vertical-outline" direction="up" color="primary">
        <q-fab-action @click="eliminar()" color="negative" icon="eva-trash-outline" />
        <q-fab-action @click="mover()" color="secondary" icon="eva-move-outline" />
        <q-fab-action @click="descargar()" color="primary" icon="eva-cloud-download-outline" />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalEliminar from 'components/documentos/modalEliminar'

export default {
  name: 'FloatingMenu',
  methods: {
    ...mapActions({
      documentos: 'documentos/actions'
    }),
    descargar () {

    },
    mover () {
    },
    eliminar () {
      this.$q.dialog({
        component: ModalEliminar,
        parent: this,
        title: '¿Está seguro de eliminar los documentos seleccionados?',
        description: 'Los documentos seleccionados seran eliminados y no podran recuperarse',
        docId: this.$store.state.documentos.selected,
        multiple: true
      })
    }
  }
}
</script>
