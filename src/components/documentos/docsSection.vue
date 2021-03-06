<template>
  <div>
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

      <!-- Render if user not have documents or if no search results -->
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

    <!-- render if no selected category -->
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

    <!-- Floating buttons-->
    <floating-menu v-if="this.selected.length > 0 && !this.$route.matched.some(record => record.meta.isVisitant)"/>
    <floating-download v-if="this.SelectedCategory.length != 0" :catId="this.SelectedCategory.catId" :catTitle="this.SelectedCategory.title"/>
    <floating-upload v-if="(this.SelectedCategory.length != 0 || this.category === '999') && !this.$route.matched.some(record => record.meta.isVisitant)" :catId="this.SelectedCategory.catId" :catTitle="this.SelectedCategory.title"/>

    <!-- Upload and download progress -->
    <div>
      <UploadingDialog :uploading="isLoading" />
      <DownloadingDialog :downloading="isDownloading" />
    </div>
  </div>
</template>

<script>
import DocLabel from 'components/documentos/documentoLabel'
import { payload } from '../../services/user'
import { mapActions, mapMutations } from 'vuex'
import UploadingDialog from './UploadingDialog'
import DownloadingDialog from './DownloadingDialog'
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
    FloatingMenu,
    DownloadingDialog
  },
  data () {
    return {
      search: null,
      pendingDocs: [],
      userId: null
    }
  },
  props: {
    // Category of documents
    category: {
      type: String,
      required: true
    },
    // id of category
    catId: {
      type: String
    },
    // Category point
    catPoint: {
      type: Number
    },
    // title
    title: {
      type: String
    }
  },
  watch: {
    // wath if category selected change for make a new query and change displayed data
    category: function (newVal, oldVal) {
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      try {
        var newElement = document.getElementById(newVal)
        newElement.classList.add('selected-card')
        var oldElement = document.getElementById(oldVal)
        if (oldVal) {
          oldElement.classList.remove('selected-card')
        }
      } catch {
        newElement = ''
      }
      // const userId = payload.userId
      const category = this.category
      const user = this.userId
      this.$store
        .dispatch('documentos/documentosQuery', { user, category })
        .then(res => {
          // console.log(res)
        })
      // Set actual category in store
      this.$store.commit('documentos/setActualCategory', {
        catId: this.catId,
        title: this.title,
        catDocValue: this.catPoint
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
    isDownloading () {
      return this.$store.state.documentos.isDownloading
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
