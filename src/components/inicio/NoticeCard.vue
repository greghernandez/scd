<template>
  <div class="row">
    <div class="col-md-2 col-xs-12">
      <q-img src="https://picsum.photos/200" class="notice-img" spinner-color="white" />
    </div>
    <div class="col-md-10 col-sm-12">
      <div class="column q-mx-lg q-my-md">
        <div class="col text-weight-bolder">
          <h5 class="q-my-none">{{ title }}</h5>
        </div>
        <div class="col text-gray">{{ fromDate }}</div>
        <div class="col text-weight-medium">
          {{ body }}
        </div>
        <div class="col">
          <q-btn outline rounded dense color="primary" label="Ver más" no-caps />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvisoCard',
  props: {
    title: String,
    body: String,
    fromDate: Number
  }
}
</script>
