<template>
  <q-page>
    <div>
      <q-card class="my-card q-mt-md q-mb-md padding-card">
        <q-card-section>
          <div>
            <h3 class="q-mt-md q-mb-md">Categorías</h3>
          </div>
          <div>
            <q-input class="search q-my-xs" rounded outlined dense v-model="search" label="Buscar categorías" type="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div>
            <div class="q-mt-md q-mb-md">
              <q-breadcrumbs style="font-size: 20px">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right " color="#575757" />
                </template>
                <q-breadcrumbs-el label="Rubros" to="/documentos" />
                <q-breadcrumbs-el label="Rubro 100" />
              </q-breadcrumbs>
            </div>
            <div class="row">
              <div class="col-md-4 col-sm-6 col-xs-12 rubro-card" v-for="n in 7" :key="n">
                <!-- slider -->
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageCategorias',
  data () {
    return {
      search: undefined
    }
  }
}
</script>
