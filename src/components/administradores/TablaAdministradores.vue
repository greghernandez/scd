<template>
  <div>
    <q-card class="my-card my-shadow">
      <q-table
        :data="users"
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
            <q-td key="verDocente" align="center">
              <q-btn
                flat
                class="btn-habilitar"
                round
                color="grey-14"
                size="sm"
                icon="eva-shield-outline"
                @click="habilitarAviso()"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Alert from 'components/Alert.vue'

export default {
  name: 'TablaAdministradores',
  components: {
  },
  apollo: {
    users: gql`query {
      users(page: 0, perPage: 0){
        name
        clave
        status
      }
    }`
  },
  data () {
    return {
      search: undefined,
      columns: [
        { name: 'Nombre', label: 'Nombre', field: 'nombre', align: 'left', sortable: true, required: true },
        { name: 'Clave', align: 'left', label: 'Clave', field: 'clave', sortable: true },
        { name: 'Administrador', align: 'center', label: 'Administrador' }
      ],
      users: []
    }
  },
  methods: {
  // Muestra el Alert para eliminar
    eliminarAviso () {
      this.$q.dialog({
        component: Alert,
        title: 'Eliminar',
        message: '¿Esta seguro de que desea eliminar permanentemente el aviso?',
        btn: 'Eliminar Aviso',
        btnColor: 'negative'
      })
    }
  }
}
</script>
