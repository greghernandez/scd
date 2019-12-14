<template>
  <q-dialog ref="dialog" v-model="alertAviso">
    <q-card class="my-modal items-center">
      <q-card-section class="vertical-middle">
        <div class="row">
          <div class="text-h6">{{ title }} </div>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row justify-center items-center content-center">
          <div class="column">
            <q-tree class="col-6 col-sm-12"
              :nodes="simple"
              node-key="label"
              tick-strategy="leaf"
              ref="tree"
              :selected.sync="selected"
              :ticked.sync="ticked"
              :expanded.sync="expanded" />
          </div>

          <q-separator vertical/>

          <div class="column justify-center flex-center">
            <div class="col-6 col-sm-12 q-gutter-y-md">
              <q-btn rounded label="Descarga en PDF" icon="eva-download-outline" color="negative" no-caps @click="seleccionados()"/><br>
              <q-btn rounded label="Descarga en ZIP" icon="eva-download-outline" color="warning" no-caps /><br>
              <q-btn rounded label="Visualizar en linea" icon="eva-download-outline" color="primary" no-caps /><br>
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
    title: String
  },
  methods: {
    seleccionados () {
      const treeNodes = this.$refs.tree.getTickedNodes()
      const ids = treeNodes.map(e => {
        return e.id
      })
      console.log(ids)
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
      console.log(this.ticked)
      this.$emit('ok')
      this.hide()
    },
    onCancelClick () {
      console.log('Cancel')
      this.hide()
    },
    getTree () {
      apolloClient.query({
        query: treeQuery,
        variables: {
          cat: '5db33a684dc61d2260e5c505',
          user: '5da4dca3377d68341c67575d'
        }
      })
        .then(res => {
          this.simple.push(res.data.getTree)
          console.log(this.simple)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getTree()
  }
}
</script>
