<template name="component-name">
  <div>
    <q-btn class="btn-eliminar" round color="grey-14" size="sm" icon="eva-trash-outline" @click="eliminarDocente()">
      <q-tooltip content-class="bg-indigo" transition-show="rotate" transition-hide="rotate">
        Eliminar docente
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import { apolloClient } from '../../../boot/vue-apollo'
import { DELETE_USER } from '../../../services/graphql/mutations'
import AlertAviso from '../../Alert'

export default {
  name: 'BtnEliminar',
  props: {
    clave: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  methods: {
    eliminarDocente () {
      alert(this.userId)
      this.$q.dialog({
        component: AlertAviso,
        title: 'Eliminar docente',
        message: '¿Esta seguo de eliminar este doncente?',
        btn: 'Eliminar docente',
        btnColor: 'negative'
      }).onOk(() => {
        apolloClient.mutate({
          mutation: DELETE_USER,
          variables: {
            id: this.userId
          }
        })
          .then(
            res => {
              console.log('-- Then --')
              console.log(res.data)
              this.$q.notify({
                color: 'positive',
                icon: 'eva-checkmark-circle-outline',
                message: 'Se cambio correctamente el estado del usuario a "' + this.newStatus + '"'
              })
            }
          ).catch(
            err => {
              console.log('-- Catch --')
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
