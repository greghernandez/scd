<template name="component-name">
  <div>
    <q-btn class="btn-habilitar" round color="grey-14" size="sm" icon="eva-eye-off-outline" @click="habilitarAviso()">
      <q-tooltip transition-show="rotate" transition-hide="rotate">
        Habilitar aviso
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
import AlertAviso from '../../Alert'

export default {
  name: 'BtnStatus',
  props: {
  },
  methods: {
    // Muestra Alert para habilitar aviso
    habilitarAviso () {
      this.$q.dialog({
        component: AlertAviso,
        title: 'Habilitar aviso',
        message: 'Este aviso se hara visible para los usuarios',
        btn: 'Habilitar aviso',
        btnColor: 'primary'
      }).onOk(() => {
        alert('Listo')
      })
    }
  }
}
</script>
