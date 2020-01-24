<template>
  <div>
    <div class="row justify-center items-center">
      <q-spinner v-if="!loaded" color="secondary" size="9em"/>
    </div>

    <Donut-Chart v-if="loaded" :chartdata="chartdata"/>
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
    categoriasDonut: [rubros.uno, rubros.dos, rubros.tres, rubros.cuatro]
  }),
  methods: {
    ...mapActions({
      documentosQuery: 'documentos/actions'
    })
  },
  async mounted () {
    this.loaded = false
    // let this.donutData = []
    // let algo = []
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
            // console.log(JSON.stringify(this.donutData))
            // algo = JSON.stringify(this.donutData)
            // algo = JSON.parse('[' + algo + ']')
            if (index === 3) {
              // ASD
            }
          })
      }
      console.log('DONUT:', this.donutData)
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
          responsive: true,
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
