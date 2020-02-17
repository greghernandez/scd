<template>
  <q-layout>
    <div class="q-ma-lg">
      <q-card class="my-card col-12">
        <q-card-section class="row text-center justify-betwen items-center">
          <div class="col-md-4 col-sm-12 row justify-betwen items-center">
            <div class="col-4">
              <q-avatar class="avatar-img" size="80px">
                <img :src="this.baseAdress + photoUrl">
              </q-avatar>
            </div>
            <div class="col-8">
              <div class="column">
                <div class="text-subtitle1 text-weight-bold">{{ name }} {{ lastName}}</div>
                <div class="text-body2">
                  {{ adscription }}
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <div class="text-subtitle2 text-weight-bold">Clave docente:</div>
            <div class="text-body2">{{ clave }}</div>
          </div>
          <div class="col-md-2 col-sm-6 col-xs-6">
            <div class="text-subtitle2 text-weight-bold">Documentos</div>
            <div class="text-body2">
              <q-chip color="secondary" text-color="white" class="q-py-xs" icon="eva-file-outline">
                {{ totalDocs }}
              </q-chip>
            </div>
          </div>
          <div class="col-md-2 col-sm-6 col-xs-6">
            <div class="text-subtitle2 text-weight-bold">Puntos obtenidos</div>
            <div>
              <q-chip color="secondary" text-color="white" class="q-py-xs" icon="ion-trophy">
                {{ totalPoints }}
              </q-chip>
            </div>
          </div>
          <div class="col-md-2 col-sm-12 col-xs-12">
            <div class="q-ma-xs">
              <q-btn outline rounded no-caps size="md" color="primary" label="Descargar CV" icon="eva-download-outline" @click="descargarCV()" />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pt-sm">
        <router-view />
      </div>
    </div>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import descargarDocumentos from 'components/documentos/descargarDocumentos'
import { rubros, address } from '../../enviroment.dev'
// import PageDocumento from './Documentos'
// import { payload } from '../services/user'

export default {
  name: 'PerfilDocente',
  components: {
    // PageDocumento
  },
  data () {
    return {
      docenteId: undefined,
      clave: undefined,
      name: undefined,
      lastName: undefined,
      adscription: undefined,
      photoUrl: undefined,
      totalDocs: 0,
      totalPoints: 0,
      baseAdress: address
    }
  },
  methods: {
    ...mapActions({
      documentosQuery: 'docentes/actions'
    }),
    descargarCV () {
      this.$q.dialog({
        component: descargarDocumentos,
        parent: this,
        userId: this.$route.params.userId,
        title: 'Descargar del rubro ',
        btnColor: 'negative'
      })
    }
  },
  mounted () {
    this.docenteId = this.$route.params.userId
    // Get docente data
    this.$store
      .dispatch('docentes/userData', this.docenteId)
      .then(res => {
        this.clave = res.data.user.clave
        this.name = res.data.user.name
        this.lastName = res.data.user.lastName
        this.adscription = res.data.user.adscription.name
        this.photoUrl = res.data.user.photoURL
      })
      .catch(err => (console.log(err)))
      // Get docente documents and points
    this.$store
      .dispatch('documentos/inspectCategory', {
        user: this.docenteId,
        category: rubros.todos
      })
      .then(res => {
        this.totalPoints = res.data.inspectCategory.totalValue
        this.totalDocs = res.data.inspectCategory.totalDocs
      })
  }
}
</script>
