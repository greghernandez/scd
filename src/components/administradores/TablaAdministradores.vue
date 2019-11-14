<template>
  <div>
    <q-card class="my-card my-shadow">
      <q-table
        :data="docentesData"
        :columns="columns"
        row-key="Nombre"
        :filter="filter"
        no-data-label="No hay datos disponibles"
        no-results-label="No se encontraron coincidencias"
        rows-per-page-label="Campos por página"
        :dense="$q.screen.lt.md"
        binary-state-sort
        flat
      >
        <template v-slot:top="props">
          <div class="q-mx-md">
            <h5>Docentes</h5>
          </div>
          <div class="q-mx-md">
            <q-btn rounded color="primary" :icon=icon :label=btnStatus no-caps @click="filtrarDocentes()"/>
          </div>
          <q-space />
          <q-input class="search q-my-xs" rounded outlined dense v-model="filter" placeholder="Buscar docentes" type="search">
            <template v-slot:append>
              <!--<q-avatar color="primary" text-color="white" size="30px" icon="eva-search"></q-avatar>-->
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name">
              {{ props.row.name + ' ' + props.row.lastName}}
            </q-td>
            <q-td key="Clave">
              {{ props.row.clave }}
            </q-td>
            <q-td key="verDocente" align="center">
              <BtnAdministradores :rango="props.row.permissions" :userId="props.row._id" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import BtnAdministradores from 'components/administradores/actions/hacerAdministrador'
import { permissions } from '../../../enviroment.dev'

// Vuex
import { mapActions } from 'vuex'
// import { docentesQueryAdmin } from '../../services/graphql/queries'

export default {
  name: 'TablaAdministradores',
  components: {
    BtnAdministradores
  },
  data () {
    return {
      docentesInfo: [],
      filter: '',
      selector: undefined,
      btnStatus: 'Ver Administradores',
      icon: 'eva-shield-outline',
      columns: [
        { name: 'Nombre', label: 'Nombre', field: row => row.name, align: 'left', sortable: true, required: true },
        { name: 'Clave', align: 'left', label: 'Clave', field: 'clave', sortable: true },
        { name: 'Administrador', align: 'center', label: 'Administrador' }
      ]
    }
  },
  mounted () {
    this.$store
      .dispatch('docentes/docentesQuery')
  },
  methods: {
    ...mapActions({
      docentesQuery: 'docentes/actions'
    }),
    // Muestra docentes/administradores segun sea el caso
    filtrarDocentes () {
      this.btnFiltro = !this.btnFiltro
      if (this.btnFiltro) {
        this.docentesInfo = this.docentesData.filter(e => {
          for (let index = 0; index < e.permissions.length; index++) {
            if (e.permissions[index].rank === permissions.admin) {
              return e
            }
          }
        })
        this.$store.commit('docentes/setDocentes', this.docentesInfo)
        this.btnStatus = 'Ver todos los docentes'
        this.icon = 'eva-people-outline'
        console.log(this.docentesInfo)
      } else {
        this.$store.dispatch('docentes/docentesQuery')
        this.btnStatus = 'Ver Administradores'
        this.icon = 'eva-shield-outline'
        console.log(this.docentesInfo)
      }
    }
  },
  computed: {
    docentesData () {
      return this.$store.state.docentes.docentes
    }
  }
}
</script>
