<template>
  <q-card class="my-card rubro-content row justify-center flex-center cursor-pointer" @click="seleccionada(clave)">
    <q-card-section class="row justify-center items-center content-center">
      <div class="col full-with">
        <q-avatar color="secondary" text-color="white">{{ clave }}</q-avatar>
      </div>
      <div class="q-ml-sm" style="height: 100%">
        <p class="q-my-none">{{ rubro }}</p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'RubroCard',
  props: {
    clave: String,
    rubro: {
      type: String,
      required: true
    }
  },
  methods: {
    seleccionada (clave) {
      this.$router.push({ name: 'categorias', params: { id: clave } })
    }
  }
}
</script>
