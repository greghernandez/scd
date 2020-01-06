<template>
  <q-page>
    <div>
      <q-card class="my-card q-mt-xs q-mb-xs padding-card">
        <q-card-section class="q-px-none q-py-none">
          <div>
            <h5 class="q-mt-xs q-mb-xs">Categorías</h5>
          </div>
          <div>
            <q-input class="search search-input q-my-xs" rounded outlined dense clearable clear-icon="eva-close-circle-outline" v-model="search"
              placeholder="Buscar categorías" type="search">
              <template v-slot:prepend>
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
                <q-breadcrumbs-el :label="'Rubro ' + this.$route.params.id" :to="'/documentos/categorias/' +  this.$route.params.id" />
                <q-breadcrumbs-el v-if="this.$route.params.idSub" :label="'Categoria ' + this.$route.params.idSub"/>
              </q-breadcrumbs>
            </div>
            <div class="q-pa-md">
              <carousel :navigationEnabled="true" :navigation-next-label="nextLabel" :navigation-prev-label="prevLabel"
                paginationActiveColor="#4A4FF1">
                <slide v-for="(category, index) in resultQuery" :key="index">
                  <div @click="selectedCard(category.clave, category.value)">
                    <CatCard :clave="category.clave" :title="category.title" :value="category.value || 0" />
                  </div>
                </slide>
              </carousel>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-md">
        <DocumentsSection :category="category" />
      </div>
    </div>
  </q-page>
</template>

<script>
import CatCard from 'components/documentos/categoriaCard'
import { apolloClient } from '../boot/vue-apollo'
import { categoryQuery } from '../services/graphql/queries'
import { Carousel, Slide } from 'vue-carousel'
import DocumentsSection from '../components/documentos/docsSection'

export default {
  name: 'PageCategorias',
  components: {
    Carousel,
    Slide,
    CatCard,
    DocumentsSection
  },
  data () {
    return {
      search: null,
      categoryData: [],
      category: '',
      id: '',
      nextLabel: "<img src='/assets/arrow-forward.png' class='carousel-img' />",
      prevLabel: "<img src='/assets/arrow-back.png' class='carousel-img' />"
    }
  },
  mounted () {
    this.catQuery()
  },
  props: {
    number: undefined
  },
  methods: {
    catQuery () {
      if (this.$route.params.idSub) {
        this.id = this.$route.params.idSub
      } else {
        this.id = this.$route.params.id
      }
      apolloClient.query({
        query: categoryQuery,
        variables: {
          type: 2,
          uid: this.id
        }
      })
        .then(res => {
          this.categoryData = res.data.category.children
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectedCard (clave, value) {
      this.selected = !this.selected
      console.log(this.selected)
      console.log('Clave seleccionada', clave)
      this.category = clave
      this.catQuery()
    }
  },
  watch: {
    $route (to, from) {
      this.catQuery()
    }
  },
  computed: {
    resultQuery () {
      if (this.search) {
        return this.categoryData.filter((item) => {
          return this.search.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.categoryData
      }
    }
  }
}
</script>
