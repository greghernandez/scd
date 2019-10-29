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
              <vueper-slides class="no-shadow" :visible-slides="2" :arrows-outside="false" slide-multiple :slide-ratio="1/5" :dragging-distance="20" :breakpoints="{ 800: { visibleSlides: 2 } }">
                <vueper-slide v-for="(category, index) in categoryData" :key="index" >
                  <div slot="slideContent">
                    <CatCard :clave="category.clave" :title="category.title" />
                  </div>
                </vueper-slide>
              </vueper-slides>
              <!-- slider -->
              <!-- <vue-glide type="" :swipeThreshold="100" :dragThreshold="200" :touchRatio="1">
                <vue-glide-slide v-for="(category, index) in categoryData" :key="index">
                  <CatCard :clave="category.clave" :title="category.title" />
                </vue-glide-slide>
                <template slot="control">
                  <q-btn class="absolute-left" round data-glide-dir="<" icon="eva-chevron-left" />
                  <q-btn class="absolute-right" round data-glide-dir=">" icon="eva-chevron-right" />
                </template>
              </vue-glide> -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { Glide, GlideSlide } from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
import CatCard from 'components/documentos/categoriaCard'
import { apolloClient } from '../boot/vue-apollo'
import { categoryQuery } from '../services/graphql/queries'
import { VueperSlides, VueperSlide } from 'vueperslides'
// Since v. 1.6.0, you need to include Vueper Slides CSS file for default styles.
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'PageCategorias',
  components: {
    [Glide.name]: Glide,
    [GlideSlide.name]: GlideSlide,
    VueperSlides,
    VueperSlide,
    CatCard
    // rubro: this.$route.params.id
  },
  data () {
    return {
      search: undefined,
      categoryData: []
    }
  },
  mounted () {
    console.log(this.$route.params.id)
    apolloClient.query({
      query: categoryQuery,
      variables: {
        type: 2,
        uid: this.$route.params.id
      }
    })
      .then(res => {
        this.categoryData = res.data.category.children
        console.log(this.categoryData)
      })
      .catch(err => {
        console.log(err)
      })
  },
  props: {
    number: undefined
  }
}
</script>
