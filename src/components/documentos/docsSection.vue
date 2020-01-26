<template>
  <div>
    selected {{ this.selected }}
    idcat {{ this.SelectedCategory }}
    <div v-if="this.category !== ''">
      <div>
        <q-input class="search search-input q-my-xs" bg-color="white" rounded outlined dense clearable
          clear-icon="eva-close-circle-outline" v-model="search" placeholder="Buscar documento" type="search">
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
    <floating-menu v-if="this.selected.length > 0 && !this.$route.matched.some(record => record.meta.isVisitant)"/>
    <floating-download v-if="this.SelectedCategory.length != 0" :catId="this.SelectedCategory.catId" :catTitle="this.SelectedCategory.title"/>
    <floating-upload v-if="(this.SelectedCategory.length != 0 || this.category === '999') && !this.$route.matched.some(record => record.meta.isVisitant)" :catId="this.SelectedCategory.catId" :catTitle="this.SelectedCategory.title"/>
    <div>
      <UploadingDialog :uploading="isLoading" />
    </div>
  </div>
</template>

<script>
import DocLabel from 'components/documentos/documentoLabel'
import { payload } from '../../services/user'
import { mapActions, mapMutations } from 'vuex'
import UploadingDialog from './UploadingDialog'
import FloatingMenu from './floating-buttons/Menu'
import FloatingUpload from './floating-buttons/Upload'
import FloatingDownload from './floating-buttons/download'

export default {
  name: 'documentsSection',
  components: {
    DocLabel,
    UploadingDialog,
    FloatingUpload,
    FloatingDownload,
    FloatingMenu
  },
  data () {
    return {
      search: null,
      pendingDocs: [],
      userId: null
    }
  },
  props: {
    category: {
      type: String,
      required: true
    },
    catId: {
      type: String
    },
    title: {
      type: String
    }
  },
  watch: {
    category: function (newVal, oldVal) {
      console.log('render')
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      var newElement = document.getElementById(newVal)
      newElement.classList.add('selected-card')
      var oldElement = document.getElementById(oldVal)
      if (oldVal) {
        oldElement.classList.remove('selected-card')
      }
      // const userId = payload.userId
      const category = this.category
      const user = this.userId
      console.log('category', this.category)
      this.$store
        .dispatch('documentos/documentosQuery', { user, category })
        .then(res => {
          console.log(res)
        })
      this.$store.commit('documentos/setActualCategory', {
        catId: this.catId,
        title: this.title
      })
    }
  },
  mounted () {
    // If user is visitant we assign profile id from url params
    if (this.$route.matched.some(record => record.meta.isVisitant)) {
      this.userId = this.$route.params.userId
    } else {
      this.userId = payload.userId
    }
    const category = this.category
    const user = this.userId
    this.$store
      .dispatch('documentos/documentosQuery', { user, category })
  },
  methods: {
    ...mapActions({
      documentosQuery: 'documentos/actions'
    }),
    ...mapMutations({
      notices: 'documentos/mutations'
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
    },
    selected () {
      return this.$store.state.documentos.selected
    },
    SelectedCategory () {
      return this.$store.state.documentos.selectedCat
    }
  }
}
</script>
