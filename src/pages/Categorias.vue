<template>
  <q-page>
    <div>
      <q-card class="my-card q-mt-xs q-mb-xs padding-card">
        <q-card-section class="q-px-none q-py-none">
          <div>
            <h4 class="q-mt-xs q-mb-xs">Categorías</h4>
          </div>
          <div>
            <q-input class="search search-input q-my-xs" rounded outlined dense v-model="search" placeholder="Buscar categorías"
              type="search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div>
            <div class="q-mt-sm q-mb-sm">
              <q-breadcrumbs style="font-size: 16px">
                <template v-slot:separator>
                  <q-icon size="1.5em" name="chevron_right " color="#575757" />
                </template>
                <q-breadcrumbs-el label="Rubros" to="/documentos" />
                <q-breadcrumbs-el :label="'Rubro ' + this.$route.params.id" />
              </q-breadcrumbs>
            </div>
            <div>
              <!-- slider -->
              <vue-glide type="" :swipeThreshold="100" :dragThreshold="200" :touchRatio="1">
                <vue-glide-slide v-for="n in 3" :key="n">
                  <CatCard :number="n" />
                </vue-glide-slide>
                <template slot="control">
                  <q-btn class="absolute-left" round data-glide-dir="<" icon="eva-chevron-left" />
                  <q-btn class="absolute-right" round data-glide-dir=">" icon="eva-chevron-right" />
                </template>
              </vue-glide>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import CatCard from 'components/documentos/categoriaCard'

export default {
  name: 'PageCategorias',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    CatCard
    // rubro: this.$route.params.id
  },
  data () {
    return {
      search: undefined
    }
  },
  props: {
    number: undefined
  }
}
</script>
