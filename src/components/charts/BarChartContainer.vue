<template>
  <div>
    <div class="row justify-center items-center">
      <q-spinner v-if="!loaded" color="secondary" size="9em"/>
    </div>

    <Bar-Chart :width="80" :height="70" v-if="loaded" :chartdata="chartdata"/>
  </div>
</template>

<script>
import BarChart from './BarChart.vue'
import { mapActions } from 'vuex'
import { payload } from '../../services/user'
import { rubros } from '../../../enviroment.dev'

export default {
  name: 'ChartContainer',
  components: { BarChart },
  data: () => ({
    loaded: false,
    chartdata: null,
    BarChartData: [],
    barLabels: ['100', '200', '300', '400'],
    categorias: [rubros.uno, rubros.dos, rubros.tres, rubros.cuatro]
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
      for (let index = 0; index < this.categorias.length; index++) {
        await this.$store
          .dispatch('documentos/inspectCategory', {
            user: payload.userId,
            category: this.categorias[index]
          })
          .then(res => {
            let item = res.data.inspectCategory.totalDocs
            this.BarChartData.push(item)
          })
      }
      this.chartdata = {
        labels: ['Documentos'],
        datasets: [
          {
            backgroundColor: [
              '#4A4FF1'
            ],
            label: '100',
            data: [this.BarChartData[0]]
          },
          {
            backgroundColor: [
              '#9C27B0'
            ],
            label: '200',
            data: [this.BarChartData[1]]
          },
          {
            backgroundColor: [
              '#4ac0c0'
            ],
            label: '300',
            data: [this.BarChartData[2]]
          },
          {
            backgroundColor: [
              '#ffcc56'
            ],
            label: '400',
            data: [this.BarChartData[3]]
          }
        ],
        options: {
          label: {
            display: false
          },
          height: '200px',
          responsive: true,
          maintainAspectRatio: true
        }
      }
      this.loaded = true
      // alert(this.BarChartData)
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
