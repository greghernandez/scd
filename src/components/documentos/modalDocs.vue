<template>
  <q-dialog ref="dialog" v-model="modalViewDoc" :maximized="maximizedToggle" transition-show="slide-up"
    transition-hide="slide-down">
    <q-card class="items-center doc-modal">

      <q-card-section class="doc-container">
        <q-pdfviewer
          v-model="visible"
          :src="pdfSrc"
          type="html5"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { address } from '../../../enviroment.dev'
// import { getFile } from '../../services/downloads'

export default {
  name: 'AlertAvisos',
  data () {
    return {
      modalViewDoc: false,
      visible: true,
      maximizedToggle: true,
      pdfSrc: ''
    }
  },
  props: {
    title: String,
    message: String,
    btn: String,
    btnColor: String,
    fileId: String
  },
  mounted () {
    console.log('Abrir', this.fileId)
    this.$axios({
      method: 'post',
      url: address + '/downloads/getFile',
      data: {
        id: this.fileId,
        mode: 'download'
      },
      responseType: 'blob',
      headers: { 'content-type': 'application/json' }
    })
      .then(res => {
        const blob = new Blob([res.data], { type: res.data.type })
        this.pdfSrc = window.URL.createObjectURL(blob)
        console.log(this.pdfSrc)
      })
      .catch(err => {
        console.log(err)
      })
    console.log(this.pdfSrc)
  },
  methods: {
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
      console.log('Ok')
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
