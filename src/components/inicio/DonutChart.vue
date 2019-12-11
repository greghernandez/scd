<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    this.renderChart({
      labels: ['Estudios especiales', 'DOS', 'TRES', 'CUATRO'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: [
            '#4A4FF1',
            '#9C27B0',
            '#4ac0c0',
            '#ffcc56'
          ],
          data: [40, 20, 12, 39]
        }
      ]
    })
  }
}
</script>
