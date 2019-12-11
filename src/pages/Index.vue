<template>
  <q-page class="">
    <!--Sección de bienvenida-->
    <div>
      <h5 class="q-mt-md q-mb-md">Hola Nombre docente!</h5>
    </div>
    <!--Sección cartas informativas-->
    <div class="row">
      <div class="row col-12">
        <div class="col-md-2 col-xs-6 card-info">
          <InfoCard />
        </div>
        <div class="col-md-2 col-xs-6 card-info">
          <cardDocsPen />
        </div>
      </div>
      <div class="col-md-4 col-xs-6 card-info">
        <q-card class="my-card">
          <q-card-section>
            <DonutChart />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 col-xs-6 card-info">
        <q-card class="my-card">
          <q-card-section>
            <DonutChart />
          </q-card-section>
        </q-card>
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
import DonutChart from 'components/inicio/DonutChart'
import CardDocsPen from 'components/inicio/cardDocsPendientes'
import BoardAvisos from 'components/inicio/BoardAvisos'

export default {
  name: 'PageIndex',
  components: {
    InfoCard,
    BoardAvisos,
    CardDocsPen,
    DonutChart
  },
  data () {
    return {
      alert: false
    }
  }
}
</script>
