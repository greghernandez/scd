<template name="component-name">
  <div>
    <q-btn class="btn-editar" round color="grey-14" size="sm" :icon="icon" @click="cambiarStatus()" />
    <q-tooltip content-class="bg-indigo" transition-show="rotate" transition-hide="rotate">
      {{ tooltipMsg }}
    </q-tooltip>
  </div>
</template>

<script>
import { apolloClient } from '../../../boot/vue-apollo'
import { userUpdateMutation } from '../../../services/graphql/mutations'

export default {
  name: 'BtnCandado',
  data () {
    return {
      icon: '',
      newStatus: '',
      tooltipMsg: ''
    }
  },
  props: {
    status: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.verificarStatus(this.status)
  },
  methods: {
    verificarStatus (status) {
      if (status === 'Activo') {
        this.icon = 'eva-lock-outline'
        this.newStatus = 'Inactivo'
        this.tooltipMsg = 'Desactivar usuario'
      } else if (status === 'Inactivo') {
        this.icon = 'eva-person-done-outline'
        this.newStatus = 'Activo'
        this.tooltipMsg = 'Activar usuario'
      }
    },
    cambiarStatus () {
      console.log(this.userId)
      console.log(this.status)
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
    }
  }
}
</script>
