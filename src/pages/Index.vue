<template>
  <q-page class="">
    <!--Sección de bienvenida-->
    <div>
      <h5 class="q-mt-md q-mb-md">Hola Nombre docente!</h5>
    </div>
    <!--Sección cartas informativas-->
    <div class="row">
      <div class="col-md-2 col-xs-6 card-info">
        <InfoCard />
      </div>
      <div class="col-md-2 col-xs-6 card-info">
        <cardDocsPen />
      </div>
    </div>
    <!--Sección de avisos-->
    <div class="q-mb-xl">
      <BoardAvisos />
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import InfoCard from 'components/inicio/InfoCard'
import CardDocsPen from 'components/inicio/cardDocsPendientes'
import BoardAvisos from 'components/inicio/BoardAvisos'

export default {
  name: 'PageIndex',
  components: {
    InfoCard,
    BoardAvisos,
    CardDocsPen
  },
  data () {
    return {
      alert: false
    }
  }
}
</script>
