<template>
  <div>
    <div>
      <h3 class="q-mt-md q-mb-md">Avisos</h3>
    </div>
    <div>
      <q-btn class="my-btn" unelevated rounded dense color="primary" label="Crear aviso" no-caps @click="crearAviso()"/>
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
    // Muestra el Modal para crear avisos
    crearAviso () {
      this.$q.dialog({
        component: ModalCrearAviso
      })
    }
  }
}
</script>
