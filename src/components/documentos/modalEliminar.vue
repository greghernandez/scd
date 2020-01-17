<template>
  <q-dialog ref="dialog" v-model="alertAviso" persistent>
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
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    docId: {
      type: [String, Array],
      required: true
    },
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
      if (!this.multiple) {
        this.$store.dispatch('documentos/eliminarDocumento', id)
          .then(res => {
            this.$q.notify({
              color: 'positive',
              icon: 'eva-checkmark-circle-outline',
              message: 'Se eliminó correctamente el documento seleccionado'
            })
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
            this.$q.notify({
              color: 'positive',
              icon: 'eva-checkmark-circle-outline',
              message: 'Se eliminarón correctamente ' + res.data.deleteDocuments.deletedCount + ' documentos'
            })
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
  }
}
</script>
