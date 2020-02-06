<template>
  <div>
    <div>
      <h4 class="q-mt-md q-mb-md">Docentes</h4>
    </div>
    <div class="q-mt-lg">
      <TablaDocentes />
    </div>
  </div>
</template>

<script>
import TablaDocentes from 'components/docentes/TablaDocentes'

export default {
  name: 'PageADocentes',
  components: {
    TablaDocentes
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
