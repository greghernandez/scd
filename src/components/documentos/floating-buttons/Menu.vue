<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 154]">
      <q-fab color="black" icon="eva-more-vertical-outline" direction="left">
        <q-fab-action @click="eliminar()" color="negative" icon="eva-trash-outline" />
        <q-fab-action @click="mover()" color="secondary" icon="eva-move-outline" />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ModalEliminar from 'components/documentos/modalEliminar'
import ModalMover from 'components/documentos/modalMover'

export default {
  name: 'FloatingMenu',
  methods: {
    ...mapActions({
      documentos: 'documentos/actions'
    }),
    mover () {
      this.$q.dialog({
        component: ModalMover,
        parent: this,
        isMultiple: true,
        title: 'Mover documentos',
        oids: this.$store.state.documentos.selected
      })
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
