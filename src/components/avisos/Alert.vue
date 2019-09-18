<template>
  <q-dialog ref="dialog" v-model="alertAviso" persistent>
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">{{ title }}</div>
        </div>
      </q-card-section>

        <q-card-section>
          {{ message }}
        </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline dense label="Cancelar" color="" v-close-popup @click="onCancelClick()" no-caps />
        <q-btn rounded unelevated outline dense :label="btn" :color="btnColor" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false
    }
  },
  props: {
    title: String,
    message: String,
    btn: String,
    btnColor: String
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
