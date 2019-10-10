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
  }
}
</script>
