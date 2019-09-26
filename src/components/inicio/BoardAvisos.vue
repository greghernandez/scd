<template>
  <q-card flat class="my-card-outlined flat">
    <q-card-section>
      <div class="row ">
        <q-icon name="eva-alert-triangle-outline" />
        <h5 class="q-my-none">Avisos</h5>
      </div>
      <!-- cards con los avisos -->
      <div>
        <q-card v-for="n in 7" :key="n" class="my-card q-my-sm">
          <q-card-secction>
            <div class="row">
              <div class="col">
                <q-img src="https://picsum.photos/200" class="notice-img" spinner-color="white" style="height: 150px; max-width: 150px"/>
              </div>
              <div class="column">
                <div class="col">Nueva convocatoria</div>
                <div class="col">Fecha</div>
                <div class="col">
                  Contenido
                  <q-btn outline rounded dense color="primary" label="Ver más" no-caps />
                </div>
              </div>
            </div>
          </q-card-secction>
        </q-card>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'BoardAvisos'
}
</script>
