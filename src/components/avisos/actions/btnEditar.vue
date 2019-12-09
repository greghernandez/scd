<template>
  <div>
    <q-btn class="btn-editar" round color="grey-14" size="sm" icon="eva-edit-outline"
      @click="editarAviso()">
      <q-tooltip transition-show="rotate" transition-hide="rotate">
        Editar aviso
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import ModalEditarAviso from 'components/avisos/EditarAviso'
// vuex
// import { mapActions } from 'vuex'

export default {
  name: 'BtnEditar',
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    // Muestra Modal para editar una noticia
    editarAviso () {
      this.$store
        .dispatch('avisos/avisoQuery', this.id)
      this.$q.dialog({
        component: ModalEditarAviso,
        parent: this,
        id: this.id
      })
    }
  }
}
</script>
