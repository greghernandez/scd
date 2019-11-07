<template name="component-name">
  <div>
    <q-btn class="btn-habilitar" round color="grey-14" size="sm" icon="eva-eye-outline" @click="verPerfil()">
      <q-tooltip content-class="bg-indigo" transition-show="rotate" transition-hide="rotate">
        Ver perfil
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'BtnVer',
  props: {
    clave: {
      type: String,
      required: true
    }
  },
  methods: {
    verPerfil () {
      this.$router.push({ name: 'docente', params: { clave: this.clave } })
    }
  }
}
</script>
