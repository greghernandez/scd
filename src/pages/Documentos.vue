<template>
  <q-page class="">
    <div>
      <q-card class="my-card q-mt-md q-mb-md padding-card">
        <q-card-section>
          <div>
            <h4 class="q-mt-md q-mb-md">Rubros</h4>
          </div>
          <div>
            <q-input class="search q-my-xs" rounded outlined dense clearable clear-icon="eva-close-circle-outline" v-model="search" label="Buscar rubros" type="search">
              <template v-slot:prepend>
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
            <div  v-if="this.resultQuery.length != 0" class="row">
              <div class="col-md-4 col-sm-6 col-xs-12 rubro-card" v-for="(rubro, index) in resultQuery" :key="index">
                <div>
                  <RubroCard :clave="rubro.clave" :rubro="rubro.title" />
                </div>
              </div>
            </div>
            <div v-else class="row items-center justify-center">
              <div v-if="this.search != null">
                <q-banner class="q-pa-md bg-grey-3">No hay resultados que coincidan con la busqueda</q-banner>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import RubroCard from 'components/documentos/RubroCard'
import { apolloClient } from '../boot/vue-apollo'
import { categoriesQueryRoot } from '../services/graphql/queries'

export default {
  name: 'PageDocumento',
  components: {
    RubroCard
  },
  props: {
    rubro: String
  },
  data () {
    return {
      search: null,
      categoriesData: []
    }
  },
  mounted () {
    apolloClient.query({
      query: categoriesQueryRoot,
      variables: {
        type: 1,
        page: 0,
        perPage: 0
      }
    })
      .then(res => {
        this.categoriesData = res.data.categories
      })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
    resultQuery () {
      if (this.search) {
        return this.categoriesData.filter((item) => {
          return this.search.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.categoriesData
      }
    }
  }
}
</script>
