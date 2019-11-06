<template name="component-name">
  <div>
    <q-btn class="btn-eliminar" round color="grey-14" size="sm" icon="eva-trash-outline" @click="eliminarDocente()">
      <q-tooltip content-class="bg-indigo" transition-show="rotate" transition-hide="rotate">
        {{ tooltipMsg }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { apolloClient } from '../../../boot/vue-apollo'
import { userUpdateMutation } from '../../../services/graphql/mutations'
import AlertAviso from '../../Alert'

export default {
  name: 'BtnEliminar',
  props: {
    clave: {
      type: String,
      required: true
    }
  },
  methods: {
    eliminarDocente () {
      alert(this.clave)
      this.$q.dialog({
        component: AlertAviso,
        title: this.propTitle,
        message: this.propMessage,
        btn: this.propBtn,
        btnColor: this.propBtnColor
      }).onOk(() => {
        apolloClient.mutate({
          mutation: userUpdateMutation,
          variables: {
            userId: this.userId,
            status: this.newStatus
          }
        })
          .then(
            res => {
              console.log(res.data)
              this.verificarStatus(this.newStatus)
              this.$q.notify({
                color: 'positive',
                icon: 'eva-checkmark-circle-outline',
                message: 'Se cambio correctamente el estado del usuario a "' + this.newStatus + '"'
              })
            }
          ).catch(
            err => {
              console.log(err.data)
              this.$q.notify({
                color: 'negative',
                icon: 'eva-alert-triangle-outline',
                message: 'Ocurrio un error intentalo de nuevo'
              })
            }
          )
      })
    }
  }
}
</script>
