<template>
  <div>
    <q-card class="doc-card cursor-pointer">
      <q-card-section class="q-py-xs q-px-xs">
        <div class="row col-12 justify-between items-center content-center">
          <div class="col-1">
            <q-checkbox dense v-model="val" @input="check(val)"/>
          </div>
          <div class="col-2">
            <q-icon color="negative" name="eva-file-text" style="font-size: 2rem;" />
          </div>
          <div class="col-7">
            <q-tooltip>
              {{ fileName }}
            </q-tooltip>
            <div class="ellipsis text-body2">
              {{ fileName }}
            </div>
            <div class="text-caption">
              {{ createdAt | dateFormat }}
            </div>
          </div>
          <div class="col-2">
            <q-btn round flat icon="eva-more-vertical-outline">
              <q-menu transition-show="scale" transition-hide="scale" anchor="center right" self="center right">
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section @click="abrir()">Abrir</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="mover()">Mover a</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="descargar()">Descargar</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="eliminar()">Eliminar</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import ModalMover from 'components/documentos/modalMover'
import ModalEliminar from 'components/documentos/modalEliminar'
import modalDocs from 'components/documentos/modalDocs'
import { getFile } from '../../services/downloads'
import { date } from 'quasar'
import { mapMutations } from 'vuex'

export default {
  name: 'DocLabel',
  components: {

  },
  data () {
    return {
      pdfsrc: '',
      val: false
    }
  },
  filters: {
    dateFormat: function (value) {
      if (!value) return 'NA'
      value = date.formatDate(value, 'DD-MM-YYYY')
      return value
    }
  },
  props: {
    objId: String,
    fileId: String,
    fileName: String,
    createdAt: Number
  },
  methods: {
    ...mapMutations({
      notices: 'documentos/mutations'
    }),
    check (val) {
      this.$store.commit('documentos/check', {
        val: val,
        objId: this.objId
      })
    },
    abrir () {
      // Dialog con la vista del documento
      this.$q.dialog({
        component: modalDocs,
        fileId: this.fileId
      })
    },
    mover () {
      this.$q.dialog({
        component: ModalMover,
        title: 'Mover',
        objId: this.objId,
        parent: this
      })
    },
    descargar () {
      getFile(this.fileId, 'download')
    },
    eliminar () {
      this.$q.dialog({
        component: ModalEliminar,
        parent: this,
        title: 'Eliminar documento',
        docId: this.objId
      })
    }
  }
}
</script>
