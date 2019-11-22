<template>
  <div>
    <q-card class="doc-card">
      <q-card-section class="q-py-xs q-px-xs">
        <div class="row justify-between items-center content-center">
            <div class="row justify-between items-center content-center">
              <div class="col-2">
                <div class="col-12">
                  <q-icon color="negative" name="eva-file-text" style="font-size: 2rem;" />
                </div>
              </div>
              <div class="col-8 text-caption">
                <q-tooltip>
                  {{ fileName }}
                </q-tooltip>
                <div class="col text-weight-bold text-inline">{{ fileName }}</div>
                <div class="col">{{ createdAt }}</div>
              </div>
              <div class="col-2">
                <q-btn round flat icon="eva-more-vertical-outline">
                  <q-menu transition-show="scale" transition-hide="scale" anchor="center right" self="center right">
                    <q-list style="min-width: 100px">
                      <q-item clickable>
                        <q-item-section @click="abrir()">Abrir</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section @click="mover()" >Mover a</q-item-section>
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

export default {
  name: 'DocLabel',
  components: {

  },
  data () {
    return {
      pdfsrc: ''
    }
  },
  props: {
    fileId: String,
    fileName: String,
    createdAt: Number
  },
  methods: {
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
        title: 'Mover'
      })
    },
    descargar () {
      getFile(this.fileId, 'download')
    },
    eliminar () {
      this.$q.dialog({
        component: ModalEliminar,
        title: 'Eliminar documento'
      })
    }
  }
}
</script>
