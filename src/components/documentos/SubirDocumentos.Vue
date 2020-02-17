<template>
  <q-dialog ref="dialog" v-model="alertAviso">
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">Subir Documentos a {{ title }}</div>
        </div>
      </q-card-section>

      <q-card-section>
        <file-pond name="test" ref="pond" class-name="my-pond" label-idle="Arrastra los documentos aquí..."
          allow-multiple="true" instantUpload="false" accepted-file-types="application/pdf"
          v-on:init="handleFilePondInit" z/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline label="Cancelar" color="" v-close-popup @click="onCancelClick()" no-caps />
        <q-btn rounded unelevated label="Subir archivos" :color="btnColor" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// Import FilePond
import vueFilePond from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js'

// Import styles
import 'filepond/dist/filepond.min.css'

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateType)
// imports needed to comunicate with the API
import { payload } from '../../services/user'
import { mapActions } from 'vuex'
import { rubros } from '../../../enviroment.dev'

export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false,
      selectedCat: ''
    }
  },
  components: {
    FilePond
  },
  props: {
    title: String,
    btn: String,
    btnColor: String,
    // category id
    category: String,
    // the dialog is global or is invoked in documents section
    global: Boolean
  },
  methods: {
    ...mapActions({
      notices: 'documentos/actions'
    }),
    handleFilePondInit: function () {
      // console.log('FilePond has initialized')
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
      const pondFiles = this.$refs.pond.getFiles()
      const files = pondFiles.filter((e) => {
        if (e.file.type === 'application/pdf') {
          return e.file
        }
      }).map((e) => { return e.file })
      if (files.length > 0) {
        this.$store.commit('documentos/isUploading')
      }
      this.$store
        .dispatch('documentos/subirDocumentos', {
          files: files,
          category: this.category,
          owner: payload.userId,
          page: this.$route.name,
          global: this.global
        }).then(res => {
          if (this.$store.state.documentos.isLoading) {
            this.$store.commit('documentos/isUploading')
          }
          this.$q.notify({
            color: 'positive',
            icon: 'eva-checkmark-circle-outline',
            message: 'Los documentos se subieron con exito'
          })
          // if the upload was for pending documents, we not change points state
          if (this.category !== rubros.pendientes) {
            // Update the card points and the total points of the user
            this.$store.commit('documentos/updatePoints', {
              mode: 'upload',
              catId: this.selectedCategory.catId,
              points: this.selectedCategory.catDocValue,
              deletedCount: res.data.multipleUpload.length
            })
          }
        })
        .catch(err => {
          this.$q.create({
            color: 'negative',
            icon: 'eva-alert-triangle-outline',
            message: 'Ocurrió un error, intentalo de nuevo'
          })
          console.log(err)
        })
      // this.$emit('ok')
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
