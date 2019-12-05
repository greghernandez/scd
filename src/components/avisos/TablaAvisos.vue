<template>
  <div>
    <q-card class="my-card my-shadow">
      <q-table
        :data="avisosData"
        :columns="columns"
        row-key="Titulo"
        :filter="search"
        binary-state-sort
        no-data-label="No hay datos disponibles"
        no-results-label="No se encontraron coincidencias"
        rows-per-page-label="Campos por página"
        :dense="$q.screen.lt.md"
        flat
      >
        <template v-slot:top="props">
          <q-input class="search q-my-xs" rounded outlined dense v-model="search" placeholder="Buscar aviso" type="search">
            <template v-slot:append>
              <!--<q-avatar color="primary" text-color="white" size="30px" icon="eva-search"></q-avatar>-->
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props" @newNotice = "newNotice">
          <q-tr :props="props">
            <q-td key="Titulo">
              {{ props.row.title }}
            </q-td>
            <q-td key="fromDate">
              {{ props.row.fromDate | dateFormat}}
            </q-td>
            <q-td key="toDate">
              {{ props.row.toDate | dateFormat }}
            </q-td>
            <q-td key="Editar">
              <BtnEditar :id="props.row._id" :title="props.row.title" />
            </q-td>
            <q-td key="Ocultar">
              <BtnStatus :id="props.row._id" :status="props.row.status"  />
            </q-td>
            <q-td key="Eliminar">
              <btnEliminar :id="props.row._id" />
            </q-td>
            <q-td key="Ver">
              <VerConvocatoria :link="props.row.link" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import VerConvocatoria from 'components/avisos/actions/verConvocatoria'
import BtnStatus from 'components/avisos/actions/btnStatus'
import BtnEliminar from 'components/avisos/actions/btnEliminar'
import BtnEditar from 'components/avisos/actions/btnEditar'

// vuex
import { mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'TablaAvisos',
  components: {
    VerConvocatoria,
    BtnStatus,
    BtnEliminar,
    BtnEditar
  },
  mounted () {
    this.$store
      .dispatch('avisos/avisosQuery')
  },
  data () {
    return {
      search: undefined,
      columns: [
        { name: 'Titulo', label: 'Titulo', field: row => row.title, align: 'left', sortable: true, required: true },
        { name: 'Inicio', align: 'left', label: 'Fecha de Inico', sortable: true },
        { name: 'Expiración', align: 'left', label: 'Fecha de expiración', sortable: true },
        { name: 'Editar', align: 'center', label: '' },
        { name: 'Ocultar/Habilitar', align: 'center', label: '' },
        { name: 'Eliminar', align: 'center', label: '' },
        { name: 'Ver', align: 'center', label: '' }
      ]
    }
  },
  filters: {
    dateFormat: function (value) {
      if (!value) return 'NA'
      value = date.formatDate(value, 'DD-MM-YYYY')
      return value
    }
  },
  methods: {
    ...mapActions({
      notices: 'avisos/actions'
    }),
    newNotice (e) {
      this.notices.push(e)
    }
  },
  computed: {
    avisosData () {
      return this.$store.state.avisos.avisos
    }
  }
}
</script>
