<template>
  <q-page class="">
    <!--Sección de bienvenida-->
    <div>
      <h5 class="q-mt-md q-mb-md">Hola Nombre docente!</h5>
    </div>
    <!--Sección cartas informativas-->
    <div class="row">
      <div class="col-md-2" v-for="n in 6" :key="n">
        <q-card class="my-card card-info">
          <q-card-section>
            <div class="">
              5
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!--Sección de avisos-->
    <div>
      Avisos
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      alert: false
    }
  }
}
</script>
