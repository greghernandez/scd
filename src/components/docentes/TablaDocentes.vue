<template>
  <div>
    <q-card class="my-card my-shadow">
      <q-table
        :data="docentesData"
        :columns="columns"
        row-key="Nombre"
        :filter="search"
        binary-state-sort
        no-data-label="No hay datos disponibles"
        no-results-label="No se encontraron coincidencias"
        rows-per-page-label="Campos por página"
        :dense="$q.screen.lt.md"
        flat
      >
        <template v-slot:top="props">
          <q-input class="search q-my-xs" rounded outlined dense v-model="search" placeholder="Buscar docentes" type="search">
            <template v-slot:append>
              <!--<q-avatar color="primary" text-color="white" size="30px" icon="eva-search"></q-avatar>-->
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Nombre">
              {{ props.row.name}}
            </q-td>
            <q-td key="Clave">
              {{ props.row.clave}}
            </q-td>
            <q-td key="verDocente">
              <q-btn
                class="btn-habilitar"
                round
                color="grey-14"
                size="sm"
                icon="eva-eye-outline"
                @click="habilitarAviso()"
              />
            </q-td>
            <q-td key="habilitarDocente">
              <q-btn
                class="btn-editar"
                round
                color="grey-14"
                size="sm"
                icon="eva-lock-outline"
              />
            </q-td>
            <q-td key="Eliminar">
              <q-btn
                class="btn-eliminar"
                round
                color="grey-14"
                size="sm"
                icon="eva-trash-outline"
                @click="eliminarDocente()"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import Alert from 'components/Alert.vue'
import { apolloClient } from '../../boot/vue-apollo'
import { docentesQueryAdmin } from '../../services/graphql/queries'

export default {
  name: 'TablaAvisos',
  components: {
  },
  data () {
    return {
      search: '',
      columns: [
        { name: 'Nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true, required: true },
        { name: 'Clave', align: 'left', label: 'Clave', field: 'clave', sortable: true },
        { name: 'Ocultar/Habilitar', align: 'center', label: '', field: 'code' },
        { name: 'Eliminar', align: 'center', label: '', field: 'code' },
        { name: 'Ver', align: 'center', label: '', field: 'code' }
      ],
      docentesData: []
    }
  },
  mounted () {
    apolloClient.query({
      query: docentesQueryAdmin,
      variables: {
        page: 0,
        perPage: 0
      }
    })
      .then(
        res => {
          this.docentesData = res.data.users
        })
  },
  methods: {
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
  }
}
</script>
