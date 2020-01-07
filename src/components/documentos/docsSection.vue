<template>
  <div>
    <div v-if="this.category !== ''">
      <div>
        <q-input class="search search-input q-my-xs" bg-color="white" rounded outlined dense clearable clear-icon="eva-close-circle-outline" v-model="search"
          placeholder="Buscar documento" type="search">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div class="row" v-if="this.documentosData.length != 0">
        <div class="col-md-3 col-sm-3 col-xs-12 doc-label" v-for="(documents, index) in documentosData" :key="index">
          <DocLabel :objId="documents._id" :fileId="documents.fileId" :fileName="documents.fileName"
            :createdAt="documents.createdAt" />
        </div>
      </div>
      <div v-else class="row items-center justify-center q-ma-lg">
        <q-banner class="q-pa-md bg-grey-3">
          <div v-if="this.documentosData.length === 0 && (this.search === null || this.search === '')">
            No tienes documentos en esta categoria
          </div>
          <div v-else-if="this.search !== null">
            No hay resultados que coincidan con la busqueda
          </div>
        </q-banner>
      </div>
    </div>
    <div v-else class="row items-center justify-center q-ma-lg">
      <q-banner class="q-pa-md bg-grey-3">
        <div class="col-12 text-center q-pb-sm">
          <q-avatar size="50px" font-size="25px" color="grey-5" text-color="text-primary" icon="eva-file-outline" />
        </div>
        <div class="col-12">
          <span class="text-subtitle-1 ">Selecciona una categoria para visualizar los documentos contenidos</span>
        </div>
      </q-banner>
    </div>
    <div>
      <UploadingDialog :uploading="isLoading" />
    </div>
  </div>
</template>

<script>
import DocLabel from 'components/documentos/documentoLabel'
import { payload } from '../../services/user'
import { mapActions } from 'vuex'
import UploadingDialog from './UploadingDialog'

export default {
  name: 'documentsSection',
  components: {
    DocLabel,
    UploadingDialog
  },
  data () {
    return {
      search: null,
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
      if (oldVal) {
        console.log('----', oldVal)
        oldElement.classList.remove('selected-card')
      }
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
      if (this.search) {
        return this.$store.state.documentos.documentos.filter((item) => {
          return this.search.toLowerCase().split(' ').every(v => item.fileName.toLowerCase().includes(v))
        })
      } else {
        return this.$store.state.documentos.documentos
      }
    },
    isLoading () {
      return this.$store.state.documentos.isLoading
    }
  }
}
</script>
