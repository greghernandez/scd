<template>
  <div>
    <h4 class="q-mb-sm">Documentos pendientes</h4>
    <div>
      <q-input class="search search-input q-my-xs" rounded outlined dense v-model="search"
        placeholder="Buscar categorías" type="search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div class="row">
      <div class="col-md-3 col-xs-6 doc-label" v-for="n in 20" :key="n">
        <DocLabel/>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import DocLabel from 'components/documentos/documentoLabel'

export default {
  name: 'PageDocPendientes',
  components: {
    DocLabel
  },
  apollo: {
    countries: gql`query {
        countries{
            code,
            name,
            emoji
        }
    }`
  },
  data () {
    return {
      countries: []
    }
  }
}
</script>
