<template>
  <div class="column justify-center flex-center">
    <q-card class="my-card card-cat cat-card">
      <q-card-section class="row justify-center items-center content-center">
        <div class="row justify-center flex-center">
          <div class="col-2 full-with">
            <q-avatar color="secondary" text-color="white">{{ clave }}</q-avatar>
          </div>
          <div class="col-8 q-ml-sm rubro-title" style="height: 100%">
            <p class="q-my-none text-weight-bold">{{ title }}</p>
          </div>
        </div>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <div class="row justify-center items-center content-center">
          <div class="column justify-center flex-center">
            <div class="col-12">
              <q-avatar color="accent" size="md" text-color="white" icon="eva-checkmark-circle-outline" />
            </div>
          </div>
          <div class="column text-center padding-card-sm">
            <div class="col-6 text-weight-bolder">1</div>
            <div class="col-6 txt-card-points text-weight-medium">Puntos por <br> documento</div>
          </div>

          <q-separator vertical />

          <div class="column justify-center flex-center">
            <div class="col-12" style="padding: 0px 0px 0px 15px">
              <q-avatar color="positive" size="md" text-color="white" icon="ion-trophy" />
            </div>
          </div>
          <div class="column text-center padding-card-sm">
            <div class="col-6 text-weight-bolder">1</div>
            <div class="col-6 txt-card-points text-weight-medium">Puntos <br> obtenidos</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CatCard',
  props: {
    clave: String,
    title: String
  }
}
</script>
