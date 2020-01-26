<template>
  <div>
    <q-card class="my-card q-mt-xs q-mb-xs padding-card">
      <q-card-section class="q-px-none q-py-none">
        <div>
          <h5 class="q-mt-xs q-mb-xs">Categorías</h5>
        </div>
        <div>
          <q-input class="search search-input q-my-xs" rounded outlined dense clearable
            clear-icon="eva-close-circle-outline" v-model="search" placeholder="Buscar categorías" type="search">
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
              <q-breadcrumbs-el label="Rubros" :to="rubrosLink" />
              <q-breadcrumbs-el :label="'Rubro ' + (this.$route.params.id || this.$route.params.idCategory)"
                :to="categoriesLink + (this.$route.params.id || this.$route.params.idCategory)" />
              <q-breadcrumbs-el v-if="this.$route.params.idSub" :label="'Categoria ' + this.$route.params.idSub" />
            </q-breadcrumbs>
          </div>
          <div class="q-pa-md">
            <carousel v-if="this.resultQuery.length != 0" :perPageCustom="[[480, 1], [768, 2]]"
              :navigationEnabled="true" :navigation-next-label="nextLabel" :navigation-prev-label="prevLabel"
              paginationActiveColor="#4A4FF1">
              <slide v-for="(category, index) in resultQuery" :key="index">
                <div @click="selectedCard(category._id, category.clave, category.value, category.title)">
                  <CatCard :catId="category._id" :clave="category.clave" :title="category.title"
                    :value="category.value || 0" />
                </div>
              </slide>
            </carousel>
            <div v-else class="row items-center justify-center">
              <div v-if="this.search != null">
                <q-banner class="q-pa-md bg-grey-3">No hay resultados que coincidan con la busqueda</q-banner>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <div class="q-pa-md">
      <DocumentsSection :category="category" :catId="catId" :title="catTitle" />
    </div>
  </div>
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
      rubrosLink: '/documentos',
      categoriesLink: '/documentos/categorias/',
      search: null,
      categoryData: [],
      category: '',
      catId: '',
      catTitle: '',
      id: '',
      categories: [],
      nextLabel: "<img src='/assets/arrow-forward.png' class='carousel-img' />",
      prevLabel: "<img src='/assets/arrow-back.png' class='carousel-img' />"
    }
  },
  mounted () {
    // If user is visitant we assign a special link for back to rubros page
    if (this.$route.matched.some(record => record.meta.isVisitant)) {
      this.rubrosLink = '/docente/' + this.$route.params.userId
      this.categoriesLink = '/docente/' + this.$route.params.userId + '/categorias/'
    }
    // reset documents points
    this.$store.commit('documentos/resetCatPoints')
    // Get Categories cards data
    this.catQuery()
  },
  props: {
    number: undefined
  },
  methods: {
    catQuery () {
      console.log('- CatQuery -')
      if (this.$route.params.idSub) {
        this.id = this.$route.params.idSub
      } else if (this.$route.params.idCategory) {
        this.id = this.$route.params.idCategory
      } else {
        this.id = this.$route.params.id
      }
      apolloClient.cache.reset()
      apolloClient.query({
        query: categoryQuery,
        variables: {
          type: 2,
          uid: this.id
        }
      })
        .then(res => {
          this.categoryData = res.data.category.children
          console.log('CATDATA', this.categoryData)
          for (let index = 0; index < this.categoryData.length; index++) {
            console.log(this.categoryData.length)
            const element = this.categoryData[index]
            if (element.value !== null) {
              console.log('Element', element._id)
              this.categories.push(element._id)
            }
          }
          console.log('RES-', this.categories)
          this.$store.commit('documentos/addCategories', this.categories)
          this.categories = {}
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectedCard (id, clave, value, title) {
      this.selected = !this.selected
      // console.log('Id', id)
      // console.log('Clave seleccionada', clave)
      this.category = clave
      this.catId = id
      this.catTitle = title
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
