<template>
  <div>
    <q-btn class="btn-eliminar" round color="grey-14" size="sm" icon="eva-trash-outline"
      @click="eliminarAviso()">
      <q-tooltip transition-show="rotate" transition-hide="rotate">
        Eliminar aviso
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import AlertAviso from '../Alert.vue'
// vuex
import { mapActions } from 'vuex'

export default {
  name: 'BtnEliminar',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions({
      notices: 'avisos/actions'
    }),
    // Muest ra el Alert para eliminar
    eliminarAviso () {
      this.$q.dialog({
        component: AlertAviso,
        title: 'Eliminar',
        message: '¿Esta seguro de que desea eliminar permanentemente el aviso?',
        btn: 'Eliminar Aviso',
        btnColor: 'negative'
      }).onOk(() => {
        this.$store
          .dispatch('avisos/deleteAviso', this.id)
          .then(res => {
            this.$q.notify({
              color: 'positive',
              icon: 'eva-checkmark-circle-outline',
              message: 'Se elimino correctamente a este usuario'
            })
          })
      })
    }
  }
}
</script>
