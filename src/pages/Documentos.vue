<template>
  <q-page class="">
<<<<<<< Updated upstream
    <q-card class="my-card">
      <q-card-section>
        Rubros
      </q-card-section>
    </q-card>
=======
    <div>
      <q-card class="my-card q-mt-md q-mb-md padding-card">
        <q-card-section>
          <div>
            <h4 class="q-mt-md q-mb-md">Rubros</h4>
          </div>
          <div>
            <q-input class="search q-my-xs" rounded outlined dense v-model="search" label="Buscar rubros" type="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div>
            <div class="q-mt-md q-mb-md">
              <q-breadcrumbs style="font-size: 16px">
                <template v-slot:separator>
                  <q-icon
                    size="1.5em"
                    name="chevron_right "
                    color="#575757"
                  />
                </template>
                <q-breadcrumbs-el label="Inicio"/>
                <q-breadcrumbs-el label="Rubros"/>
              </q-breadcrumbs>
            </div>
            <div class="row">
              <div class="col-md-4 col-sm-6 col-xs-12 rubro-card" v-for="n in 7" :key="n">
                <RubroCard rubro="Estudios especiales" />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
>>>>>>> Stashed changes
  </q-page>
</template>

<style>
</style>

<script>
export default {
<<<<<<< Updated upstream
  name: 'PageDocumento'
=======
  name: 'PageDocumento',
  components: {
    RubroCard
  },
  props: {
    rubro: String
  },
  data () {
    return {
      search: undefined
    }
  }
>>>>>>> Stashed changes
}
</script>
