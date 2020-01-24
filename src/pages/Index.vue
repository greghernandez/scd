<template>
  <q-page class="">
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
      <div class="col-md-4 col-xs-12 card-info">
        <q-card class="my-card">
          <q-card-section>
            <div class="row justify-center items-center text-secondary">
              <q-icon size="sm" name="eva-pie-chart-outline q-mr-sm" />
              <h5 class="text-weight-medium q-my-none">Puntos por categoría</h5>
            </div>
          </q-card-section>
          <q-card-section>
            <ChartContainer />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-md-4 col-xs-6 card-info">
        <q-card class="my-card">
          <q-card-section>
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

<script>
import InfoCard from 'components/inicio/InfoCard'
import ChartContainer from 'components/inicio/ChartContainer'
import CardDocsPen from 'components/inicio/cardDocsPendientes'
import BoardAvisos from 'components/inicio/BoardAvisos'

export default {
  name: 'PageIndex',
  components: {
    InfoCard,
    BoardAvisos,
    CardDocsPen,
    ChartContainer
  },
  data () {
    return {
      alert: false
    }
  }
}
</script>
