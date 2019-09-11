<template>
  <div>
    <div>
      <h3>Avisos</h3>
    </div>
    <div>
      <q-btn unelevated rounded dense color="primary" label="Crear aviso" no-caps @click="crearAviso()"/>
    </div>
    <div class="q-mt-lg">
      <TablaAvisos />
    </div>
  </div>
</template>

<script>
import TablaAvisos from 'components/avisos/TablaAvisos'
import ModalCrearAviso from 'components/avisos/CrearAviso'

export default {
  name: 'PageAvisos',
  components: {
    TablaAvisos
  },
  methods: {
    crearAviso () {
      this.$q.dialog({
        component: ModalCrearAviso
      })
    }
  }
}
</script>
