<template>
  <q-dialog ref="dialog" v-model="alertAviso">
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">{{ title }}</div>
        </div>
      </q-card-section>

        <q-card-section>
          {{ description }}
        </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline dense label="Cancelar" color="" v-close-popup @click="onCancelClick()" no-caps />
        <q-btn rounded unelevated dense label="Eliminar documento" color="negative" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false
    }
  },
  props: {
    // Title of dialog
    title: {
      type: String,
      required: true
    },
    // Description of dialog
    description: {
      type: String,
      required: true
    },
    // Document id to delete
    docId: {
      type: [String, Array],
      required: true
    },
    // The type of delete mode
    multiple: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapActions({
      documentos: 'documentos/actions'
    }),
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    onOKClick () {
      const id = this.docId
      /*
      * verify the type of deleted, if it's multiple or individual,
      * to proceed with the corresponsive action
      */
      if (!this.multiple) {
        this.$store.dispatch('documentos/eliminarDocumento', id)
          .then(res => {
            this.$q.notify({
              color: 'positive',
              icon: 'eva-checkmark-circle-outline',
              message: 'Se eliminó correctamente el documento seleccionado'
            })
            // if the document is in pending documents, we not change points state
            if (this.$route.name !== 'pendientes') {
              // Update the card points and the total points of the user
              this.$store.commit('documentos/updatePoints', {
                mode: 'delete',
                catId: this.selectedCategory.catId,
                points: this.selectedCategory.catDocValue,
                deletedCount: res.data.deleteDocument.deletedCount
              })
            }
          }).catch(err => {
            console.log(err)
            this.$q.notify({
              color: 'negative',
              icon: 'eva-alert-triangle-outline',
              message: 'Ocurrió un error, intentalo de nuevo'
            })
          })
      } else {
        this.$store.dispatch('documentos/eliminarDocumentos', id)
          .then(res => {
            console.log(res)
            this.$q.notify({
              color: 'positive',
              icon: 'eva-checkmark-circle-outline',
              message: 'Se eliminarón correctamente ' + res.data.deleteDocuments.deletedCount + ' documentos'
            })
            // if the document is in pending documents, we not change points state
            if (this.$route.name !== 'pendientes') {
              // Update the card points and the total points of the user
              this.$store.commit('documentos/updatePoints', {
                mode: 'delete',
                catId: this.selectedCategory.catId,
                points: this.selectedCategory.catDocValue,
                deletedCount: res.data.deleteDocuments.deletedCount
              })
            }
          }).catch(err => {
            console.log(err)
            this.$q.notify({
              color: 'negative',
              icon: 'eva-alert-triangle-outline',
              message: 'Ocurrió un error, intentalo de nuevo'
            })
          })
      }
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
      this.hide()
    }
  },
  computed: {
    selectedCategory () {
      return this.$store.state.documentos.selectedCat
    }
  }
}
</script>
