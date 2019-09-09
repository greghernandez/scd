<template>
  <q-dialog ref="dialog" v-model="confirm" persistent>
    <q-card class="my-modal">
      <q-card-section>
          <div class="text-h6">{{ titulo }}</div>
        </q-card-section>

        <q-card-section>
          {{lorem}}
        </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup @click="onCancelClick()" />
        <q-btn flat label="Turn on Wifi" color="primary" v-close-popup @click="onOKClick()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
      titulo: 'Inserte un titulo',
      lorem: 'hola',
      confirm: false
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
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
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })
      // then hiding dialog
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
