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
import { mapActions } from 'vuex'

export default {
  // Btn to edit a notice
  name: 'BtnEditar',
  props: {
    // ID of notice
    id: {
      type: String,
      required: true
    },
    //
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      notices: 'avisos/actions'
    }),
    // Muestra Modal para editar una noticia
    editarAviso () {
      this.$q.dialog({
        component: ModalEditarAviso,
        parent: this,
        id: this.id,
        title: this.title
      })
    }
  },
  computed: {
    aviso () {
      return this.$store.state.avisos.aviso
    }
  }
}
</script>
