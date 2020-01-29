<template>
  <q-dialog ref="dialog" v-model="cambiarFoto">
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">Cambiar foto de perfil</div>
        </div>
      </q-card-section>

      <q-card-section>
        <file-pond
          name="test"
          ref="pond"
          class-name="my-pond"
          label-idle="Arrastra los documentos aquí..."
          instantUpload="false"
          accepted-file-types="image/jpeg, image/png"
          v-on:init="handleFilePondInit" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline label="Cancelar" color="" v-close-popup @click="onCancelClick()" no-caps />
        <q-btn rounded unelevated label="Subir archivos" color="primary" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
// Import FilePond
import vueFilePond from 'vue-filepond'

// Import plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// Import styles
import 'filepond/dist/filepond.min.css'
// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Create component
let FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
// imports needed to comunicate with the API
import { payload } from '../../../services/user'
import { mapActions } from 'vuex'

export default {
  name: 'CambiarFotoPerfil',
  data () {
    return {
      cambiarFoto: false
    }
  },
  components: {
    FilePond
  },
  props: {
  },
  methods: {
    ...mapActions({
      notices: 'docentes/actions'
    }),
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
      // this.$emit('ok')
      const pondFiles = this.$refs.pond.getFiles()
      console.log(pondFiles)
      this.$store
        .dispatch('docentes/updateUserProfilePic', {
          photo: pondFiles,
          userId: payload.userId
        }).then(res => {
          console.log(res)
        })
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
      this.hide()
    }
  }
}
</script>
