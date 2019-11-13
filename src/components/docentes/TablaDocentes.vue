<template>
  <div>
    <q-card class="my-card my-shadow">
      <q-table
        :data="docentesData"
        :columns="columns"
        row-key="Nombre"
        :filter="filter"
        binary-state-sort
        no-data-label="No hay datos disponibles"
        no-results-label="No se encontraron coincidencias"
        rows-per-page-label="Campos por página"
        :dense="$q.screen.lt.md"
        flat
      >
        <template v-slot:top="props">
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
              {{ props.row.clave}}
            </q-td>
            <q-td key="verDocente">
              <BtnVer :clave="props.row.clave" />
            </q-td>
            <q-td key="habilitarDocente">
              <BtnCandado :status="props.row.status" :userId="props.row._id" />
            </q-td>
            <q-td key="Eliminar">
              <BtnEliminar :clave="props.row.clave" :userId="props.row._id"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
// Componentes
import Alert from 'components/Alert.vue'
import BtnVer from '../../components/docentes/actions/btnVer'
import BtnCandado from '../../components/docentes/actions/btnCandado'
import BtnEliminar from '../../components/docentes/actions/btnEliminar'

// vuex
import { mapActions } from 'vuex'

export default {
  name: 'TablaAvisos',
  components: {
    BtnVer,
    BtnCandado,
    BtnEliminar
  },
  data () {
    return {
      filter: '',
      columns: [
        { name: 'Nombre', label: 'Nombre', field: row => row.name, align: 'left', sortable: true, required: true },
        { name: 'Clave', align: 'left', label: 'Clave', field: 'clave', sortable: true },
        { name: 'Ocultar/Habilitar', align: 'center', label: '', field: 'code' },
        { name: 'Eliminar', align: 'center', label: '', field: 'code' },
        { name: 'Ver', align: 'center', label: '', field: 'code' }
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
    // Muestra el Alert para eliminar
    eliminarDocente () {
      this.$q.dialog({
        component: Alert,
        title: 'Eliminar',
        message: '¿Esta seguro de que desea eliminar permanentemente este docente?',
        btn: 'Eliminar Ddocente',
        btnColor: 'negative'
      })
    }
  },
  computed: {
    docentesData () {
      return this.$store.state.docentes.docentes
    }
  }
}
</script>
