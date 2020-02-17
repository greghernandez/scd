<template>
  <div>
    <div>
      <h4 class="q-mt-md q-mb-md">Avisos</h4>
    </div>
    <div>
      <q-btn class="my-btn" unelevated rounded dense color="primary" label="Crear aviso" no-caps @click="crearAviso()"/>
    </div>
    <!-- Notices table -->
    <div class="q-mt-lg">
      <TablaAvisos/>
    </div>
  </div>
</template>

<script>
import TablaAvisos from 'components/avisos/TablaAvisos'
import ModalCrearAviso from 'components/avisos/CrearAviso'
import { mapActions } from 'vuex'

export default {
  name: 'PageAvisos',
  components: {
    TablaAvisos
  },
  methods: {
    // Muestra el Modal para crear avisos
    crearAviso () {
      this.$q.dialog({
        component: ModalCrearAviso,
        parent: this
      })
    },
    ...mapActions({
      docentesQuery: 'docentes/actions'
    })
  },
  // verify if user have permmissions to view page
  beforeMount () {
    let permiso = this.$store.state.docentes.userPermissions
    if (permiso.admin === false) {
      this.$router.push('/')
    }
  }
}
</script>
