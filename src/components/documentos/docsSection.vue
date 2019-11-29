<template>
  <div>
    <div if-ca>
      <q-input class="search search-input q-my-xs" bg-color="white" rounded outlined dense v-model="search"
        placeholder="Buscar documento" type="search">
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
  watch: {
    category: function (newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      var newElement = document.getElementById(newVal)
      newElement.classList.add('selected-card')
      var oldElement = document.getElementById(oldVal)
      oldElement.classList.remove('selected-card')
      const userId = payload.userId
      const category = this.category
      this.$store
        .dispatch('documentos/documentosQuery', { userId, category })
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
