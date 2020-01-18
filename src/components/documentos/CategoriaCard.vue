<template>
  <div class="column">
    <!-- si tiene un valor RIPAUAQ se renderiza una tarjeta con los puntos -->
    <div v-if="value != 0">
      <q-card :id="clave" class="justify-center flex-center my-card card-cat cat-card cursor-pointer">
        <q-card-section class="row justify-center items-center content-center">
          <div class="row justify-center flex-center">
            <div class="col-3 full-with">
              <q-avatar color="secondary" font-size="12px" text-color="white">{{ clave }}</q-avatar>
            </div>
            <div class="col-9 q-col-ml-sm" style="height: 100%">
              <p class="q-my-none text-weight-bold">{{ title | truncate(120) }}</p>
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
              <div class="col-6 text-weight-bolder">{{ value }}</div>
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
    <!-- si tiene no tiene un valor RIPAUAQ se renderiza esta tarjeta -->
    <div v-else>
      <q-card :id="clave" class="my-card row justify-center card-cat cat-card flex-center" @click="seleccionada(clave)">
        <q-card-section class="row justify-center items-center content-center">
          <div class="col-3 full-with">
            <q-avatar color="secondary" text-color="white">{{ clave }}</q-avatar>
          </div>
          <div class="col-9 q-col-ml-sm" style="height: 100%">
            <p class="q-my-none">{{ title | truncate(150) }}</p>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CatCard',
  data () {
    return {
      selected: false
    }
  },
  props: {
    clave: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    seleccionada (clave) {
      this.$router.push({ name: 'subcategoria', params: { idSub: clave } })
    }
  }
}
</script>
