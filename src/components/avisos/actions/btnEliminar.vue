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
import { apolloClient } from '../../../boot/vue-apollo'
import { noticeDeleteMutation } from '../../../services/graphql/mutations'
import AlertAviso from '../Alert.vue'

export default {
  name: 'BtnEliminar',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    // Muest ra el Alert para eliminar
    eliminarAviso () {
      this.$q.dialog({
        component: AlertAviso,
        title: 'Eliminar',
        message: '¿Esta seguro de que desea eliminar permanentemente el aviso?',
        btn: 'Eliminar Aviso',
        btnColor: 'negative'
      }).onOk(() => {
        apolloClient.mutate({
          mutation: noticeDeleteMutation,
          variables: {
            id: this.id
          }
        })
          .then(
            res => {
              console.log(res.data)
              this.$q.notify({
                color: 'positive',
                icon: 'eva-checkmark-circle-outline',
                message: 'Se elimino correctamente a este usuario'
              })
            }
          ).catch(
            err => {
              console.log(err)
              this.$q.notify({
                color: 'negative',
                icon: 'eva-alert-triangle-outline',
                message: 'Ocurrió un error, intentalo de nuevo'
              })
            }
          )
      })
    }
  }
}
</script>
