<template>
  <q-card class="my-card-outlined flat">
    <q-card-section>
      <div class="row ">
        <q-icon name="eva-alert-triangle-outline" />
        <h5 class="q-my-none">Avisos</h5>
      </div>
      <!-- cards con los avisos -->
      <div>
        <q-card v-for="n in 7" :key="n" class="my-card q-my-sm">
          <q-card-secction>
            <div>
            </div>
            <div>Titulo</div>
            <div>Fecha</div>
            <div>Contenido</div>
            <q-btn outline rounded dense color="primary" label="Ver más" no-caps />
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
