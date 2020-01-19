<template>
  <div>
    User Id: {{ this.$route.params.clave }}
    <q-card class="my-card">
      <div class="row">
        <q-card-section class="col">
          Foto de perfil
        </q-card-section>
        <q-card-section class="col">
          Nombre y facultad
        </q-card-section>
      </div>
    </q-card>

  </div>
</template>

<script>
export default {
  name: 'PerfilDocente'
}
</script>
