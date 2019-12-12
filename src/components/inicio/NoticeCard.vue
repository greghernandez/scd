<template>
  <div class="row">
    <div class="col-md-2 col-xs-12">
      <q-img :src="img" class="notice-img" :ratio="1" spinner-color="white" />
    </div>
    <div class="col-md-10 col-sm-12">
      <div class="column q-mx-lg q-my-md">
        <div class="col text-weight-bolder">
          <h5 class="q-my-none">{{ title }}</h5>
        </div>
        <div class="col text-gray">{{ fromDate }}</div>
        <div class="col text-weight-medium">
          {{ body | truncate(250) }}
        </div>
        <div class="col">
          <q-btn outline rounded color="primary" class="q-px-lg" label="Ver más" no-caps />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { address } from '../../../enviroment.dev'
export default {
  name: 'AvisoCard',
  data () {
    return {
      src: address
    }
  },
  props: {
    title: String,
    body: String,
    fromDate: Number,
    img: String
  }
}
</script>
