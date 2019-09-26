<template>
  <div>
    <div>
      <h4 class="q-mt-md q-mb-md">Administradores</h4>
    </div>
    <div class="q-mt-lg">
      <TablaAdministradores />
    </div>
  </div>
</template>

<script>
import TablaAdministradores from 'components/administradores/TablaAdministradores'

export default {
  name: 'PageAdministradoress',
  components: {
    TablaAdministradores
  },
  methods: {
  }
}
</script>
