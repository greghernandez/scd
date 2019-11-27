<template>
  <div>
    <div>
      <q-input class="search search-input q-my-xs" bg-color="white" rounded outlined dense v-model="search"
        placeholder="Buscar categorías" type="search" @change="filteredList">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <p>{{ search }}</p>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-3 col-xs-12 doc-label" v-for="(documents, index) in documentosData" :key="index">
        <DocLabel :objId="documents._id" :fileId="documents.fileId" :fileName="documents.fileName"
          :createdAt="documents.createdAt" />
      </div>
    </div>
  </div>
</template>

<script>
import DocLabel from 'components/documentos/documentoLabel'
import { payload } from '../../services/user'
import { mapActions } from 'vuex'

export default {
  name: 'documentsSection',
  components: {
    DocLabel
  },
  data () {
    return {
      search: undefined,
      pendingDocs: []
    }
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  mounted () {
    console.log(payload.userId)
    const userId = payload.userId
    const category = this.category
    this.$store
      .dispatch('documentos/documentosQuery', { userId, category })
  },
  methods: {
    ...mapActions({
      documentosQuery: 'documentos/actions'
    })
  },
  computed: {
    documentosData () {
      return this.$store.state.documentos.documentos
    }
  }
}
</script>
