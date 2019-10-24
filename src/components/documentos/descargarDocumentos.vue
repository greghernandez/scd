<template>
  <q-dialog ref="dialog" v-model="alertAviso" persistent>
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">{{ title }} </div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-tree class="col-12 col-sm-6"
          :nodes="simple"
          node-key="label"
          tick-strategy="leaf"
          :selected.sync="selected"
          :ticked.sync="ticked"
          :expanded.sync="expanded" />

      </q-card-section>

      <q-card-actions align="right">
        <q-btn rounded unelevated outline dense label="Cancelar" color="" v-close-popup @click="onCancelClick()"
          no-caps />
        <q-btn rounded unelevated dense label="Descargar" color="primary" v-close-popup @click="onOKClick()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'AlertAvisos',
  data () {
    return {
      alertAviso: false,
      selected: 'Pleasant surroundings',
      ticked: [],
      expanded: [],
      simple: [
        {
          label: 'Satisfied customers',
          children: [
            {
              label: 'Good food',
              children: [
                { label: 'Quality ingredients' },
                { label: 'Good recipe' }
              ]
            },
            {
              label: 'Good service (disabled node)',
              children: [
                { label: 'Prompt attention' },
                { label: 'Professional waiter' }
              ]
            },
            {
              label: 'Pleasant surroundings',
              children: [
                { label: 'Happy atmosphere' },
                { label: 'Good table presentation' },
                { label: 'Pleasing decor' }
              ]
            }
          ]
        }
      ]
    }
  },
  props: {
    title: String
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
      console.log(this.ticked)
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
