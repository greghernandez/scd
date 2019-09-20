<template>
  <q-page class="">
    <!--Sección de bienvenida-->
    <div>
      <h5 class="q-mt-md q-mb-md">Hola Nombre docente!</h5>
    </div>
    <!--Sección cartas informativas-->
    <div class="row">
      <div class="col-md-2 card-info" v-for="n in 2" :key="n">
        <InfoCard/>
      </div>
    </div>
    <!--Sección de avisos-->
    <div>
      <BoardAvisos/>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import InfoCard from 'components/inicio/InfoCard'
import BoardAvisos from 'components/inicio/BoardAvisos'

export default {
  name: 'PageIndex',
  components: {
    InfoCard,
    BoardAvisos
  },
  data () {
    return {
      alert: false
    }
  }
}
</script>
