<template>
  <q-dialog ref="dialog" v-model="alertAviso">
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">{{ title }} </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row col-12 col-xs-12 justify-center items-center">
          <div class="col-md-6 col-xs-12">
            <q-tree class="col-6 col-sm-12"
              :nodes="simple"
              node-key="_id"
              tick-strategy="leaf"
              default-expand-all
              accordion
              :selected.sync="selected"
              :ticked.sync="ticked"
              :expanded.sync="expanded"
              no-nodes-label="No hay documentos para descargar" />
          </div>

          <q-separator class="desktop-only" vertical/>

          <div class="row col-md-5 col-sm-12 flex-center">
            <div class="q-gutter-y-md">
              <q-btn rounded class="text-caption full-width" label="Descarga en PDF" icon="eva-download-outline" color="negative" :disabled="!(this.ticked.length > 0)" no-caps @click="descargaPdf()"/><br>
              <q-btn rounded class="full-width" label="Descarga en ZIP" icon="eva-download-outline" :disabled="!(this.ticked.length > 0)" color="warning" no-caps @click="descargaZip()" /><br>
              <q-btn rounded class="full-width" label="Visualizar en linea" icon="eva-download-outline" :disabled="!(this.ticked.length > 0)" color="primary" no-caps  @click="visualizar()"/><br>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline label="Cancelar" color="" v-close-popup @click="onCancelClick()"
          no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { apolloClient } from '../../boot/vue-apollo'
import { treeQuery } from '../../services/graphql/queries'
import { payload } from '../../services/user'
import { joinInZip, joinInPdf } from '../../services/downloads'
import modalDocs from 'components/documentos/modalDocs'

export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false,
      selected: 'Pleasant surroundings',
      ticked: [],
      expanded: [],
      simple: []
    }
  },
  props: {
    title: String,
    userId: {
      type: String,
      default: payload.userId
    },
    catId: {
      type: String,
      default: '5db33a684dc61d2260e5c505'
    },
    preTicket: {
      type: Array,
      default: null
    }
  },
  methods: {
    descargaPdf () {
      this.hide()
      this.$store.commit('documentos/changeDownloadState')
      joinInPdf(this.ticked, 'download').then(res => {
        this.$store.commit('documentos/changeDownloadState')
      })
    },
    descargaZip () {
      this.hide()
      this.$store.commit('documentos/changeDownloadState')
      joinInZip('scd.zip', this.ticked).then(res => {
        this.$store.commit('documentos/changeDownloadState')
        if (res === 200) {
          this.$q.notify({
            color: 'positive',
            icon: 'eva-checkmark-circle-outline',
            message: 'Tu archivo se descargó correctamente'
          })
        } else {
          this.$q.notify({
            color: 'negative',
            icon: 'eva-alert-triangle-outline',
            message: 'Ocurrió un error, intentalo de nuevo'
          })
        }
      })
    },
    visualizar () {
      // Dialog con la vista del documento
      this.$q.dialog({
        component: modalDocs,
        fileId: this.ticked
      })
    },
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
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      this.hide()
    },
    async getTree () {
      await apolloClient.query({
        query: treeQuery,
        variables: {
          cat: this.catId,
          user: this.userId
        }
      })
        .then(res => {
          this.simple.push(res.data.getTree)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getTree()
    if (this.preTicket != null) {
      this.ticked = this.preTicket
    }
  }
}
</script>
