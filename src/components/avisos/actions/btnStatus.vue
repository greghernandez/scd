<template name="component-name">
  <div>
    <q-btn class="btn-habilitar" round color="grey-14" size="sm" :icon="icon" @click="cambiarStatus()">
      <q-tooltip transition-show="rotate" transition-hide="rotate">
        {{ tooltipMsg }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import AlertAviso from '../../Alert'
import { noticeUpdateMutation } from '../../../services/graphql/mutations'
import { apolloClient } from '../../../boot/vue-apollo'

export default {
  name: 'BtnStatus',
  data () {
    return {
      icon: '',
      newStatus: undefined,
      tooltipMsg: undefined
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true
    }
  },
  mounted () {
    this.verificarStatus(this.status)
  },
  methods: {
    // cambia es status del btn de acuerdo a si este es precionado
    verificarStatus (status) {
      if (status === 0) {
        this.icon = 'eva-eye-outline'
        this.newStatus = 1
        this.tooltipMsg = 'Habilitar Aviso'
      } else if (status === 1) {
        this.icon = 'eva-eye-off-outline'
        this.newStatus = 0
        this.tooltipMsg = 'Deshabilitar Aviso'
      }
    },

    // Muestra Alert para habilitar/Deshabilitar aviso
    // 0 - oculto, 1 - Vigente, 2 - Vencido, 3 - todos
    cambiarStatus () {
      this.$q.dialog({
        component: AlertAviso,
        title: 'Habilitar aviso',
        message: 'Este aviso se hara visible para los usuarios',
        btn: 'Habilitar aviso',
        btnColor: 'primary'
      }).onOk(() => {
        console.log(this.id)
        apolloClient.mutate({
          mutation: noticeUpdateMutation,
          variables: {
            id: this.id,
            input: {
              status: this.newStatus
            }
          }
        })
          .then(
            res => {
              console.log(res.data)
              this.verificarStatus(this.newStatus)
              this.$q.notify({
                color: 'positive',
                icon: 'eva-checkmark-circle-outline',
                message: 'Se cambio correctamente el estado del usuario'
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
