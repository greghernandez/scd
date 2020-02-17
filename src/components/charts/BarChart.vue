<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: {
    chartdata: {
      type: Object
    },
    options: {
      type: Object
    }
  },
  mounted () {
    this.renderChart(this.chartdata)
  }
}
</script>
