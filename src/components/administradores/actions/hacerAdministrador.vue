<template name="component-name">
    <div>
      <div v-if="isAdmin == true">
          <q-btn
          flat
          class="btn-habilitar"
          round
          text-color="primary"
          size="sm"
          icon="eva-shield"
          @click="deshabilitar()"
        >
          <q-tooltip
            content-class="bg-indigo"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Quitar permisos de administrador
          </q-tooltip>
        </q-btn>
      </div>
      <div v-else>
        <q-btn
          flat
          class="btn-habilitar"
          round
          text-color="primary"
          size="sm"
          icon="eva-shield-outline"
          @click="habilitar()"
        >
          <q-tooltip
            content-class="bg-indigo"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Hacer administrador
          </q-tooltip>
        </q-btn>
      </div>
    </div>
</template>

<script>
export default {
  name: 'BtnHacerAdministrador',
  data () {
    return {
      elrango: this.rango,
      isAdmin: false
    }
  },
  props: {
    rango: {
      type: Array
    }
  },
  mounted () {
    console.log('----------')
    console.log(this.elrango)
    this.elrango.forEach(element => {
      if (element.rank === 1) {
        this.isAdmin = true
      }
    })
  },
  methods: {
    habilitar () {
      alert('Habilitar')
    },
    deshabilitar () {
      alert('Deshabilitar')
    }
  }
}
</script>
