<template>
  <div>
    <div class="row justify-center items-center">
      <q-spinner v-if="!loaded" color="secondary" size="9em"/>
    </div>

    <div v-if="!isEmpty">
      <Donut-Chart :width="80" :height="70" v-if="loaded" :chartdata="chartdata"/>
    </div>

    <div v-else>
      <q-banner rounded class="bg-grey-3 text-center">
        Aún no tienes información para mostrar
      </q-banner>
    </div>
  </div>
</template>

<script>
import DonutChart from './DonutChart.vue'
import { mapActions } from 'vuex'
import { payload } from '../../services/user'
import { rubros } from '../../../enviroment.dev'

export default {
  name: 'ChartContainer',
  components: { DonutChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    donutData: [],
    isEmpty: false,
    categoriasDonut: [rubros.uno, rubros.dos, rubros.tres, rubros.cuatro]
  }),
  methods: {
    ...mapActions({
      documentosQuery: 'documentos/actions'
    })
  },
  async mounted () {
    // set spinner while content is loaded
    this.loaded = false
    try {
      for (let index = 0; index < this.categoriasDonut.length; index++) {
        await this.$store
          .dispatch('documentos/inspectCategory', {
            user: payload.userId,
            category: this.categoriasDonut[index]
          })
          .then(res => {
            let item = res.data.inspectCategory.totalValue
            this.donutData.push(item)
          })
      }
      if (this.$store.state.documentos.totalPoints === 0) {
        this.isEmpty = true
      }
      this.chartdata = {
        labels: ['100', '200', '300', '400'],
        datasets: [
          {
            backgroundColor: [
              '#4A4FF1',
              '#9C27B0',
              '#4ac0c0',
              '#ffcc56'
            ],
            data: this.donutData
          }
        ],
        options: {
          legend: {
            display: true,
            position: 'bottom'
          },
          height: '200px',
          responsive: true,
          maintainAspectRatio: true,
          tooltips: {
            enabled: true
          }
        }
      }
      this.loaded = true
      // alert(this.donutData)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
