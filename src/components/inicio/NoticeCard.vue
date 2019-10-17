<template>
  <div class="row">
    <div class="col-md-2 col-xs-12">
      <q-img src="https://picsum.photos/200" class="notice-img" spinner-color="white" />
    </div>
    <div class="col-md-10 col-sm-12">
      <div class="column q-mx-lg q-my-md">
        <div class="col text-weight-bolder">
          <h5 class="q-my-none">Nueva convocatoria</h5>
        </div>
        <div class="col text-gray">11/09/2001</div>
        <div class="col text-weight-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
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
  name: 'AvisoCard'
}
</script>
