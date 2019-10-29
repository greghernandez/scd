<template>
  <q-dialog ref="dialog" v-model="alertAviso" persistent>
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">{{ title }}</div>
        </div>
      </q-card-section>

      <q-card-section>
        <file-pond
        name="test"
        ref="pond"
        class-name="my-pond"
        label-idle="Arrastra los documentos aquí..."
        allow-multiple="true"
        instantUpload="false"
        accepted-file-types="application/pdf"
        v-on:init="handleFilePondInit"/>
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
import { apolloClient } from '../../boot/vue-apollo'
import { multipleUpload } from '../../services/graphql/mutations'
// import { payload } from '../../services/user'

export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false
    }
  },
  components: {
    FilePond
  },
  props: {
    title: String,
    btn: String,
    btnColor: String
  },
  methods: {
    handleFilePondInit: function () {
      console.log('FilePond has initialized')
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
      const files = pondFiles.map(e => {
        return e.file
      })
      // console.log(files)
      apolloClient.mutate({
        mutation: multipleUpload,
        variables: {
          files: files,
          input: {
            category: '5db33a924dc61d2260e5c507',
            // owner: payload.userId
            owner: '5da4dca3377d68341c67575d'
          }
        },
        context: {
          hasUpload: true
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
      // this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
      this.hide()
    }
  }
}
</script>
