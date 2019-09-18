<template>
  <div>
    <q-card class="my-card my-shadow">
      <q-table
        :data="countries"
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
          <q-input class="search q-my-xs" rounded outlined dense v-model="search" label="Buscar aviso" type="search">
            <template v-slot:append>
              <!--<q-avatar color="primary" text-color="white" size="30px" icon="eva-search"></q-avatar>-->
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="Titulo">
              {{ props.row.name}}
            </q-td>
            <q-td key="Estado">
              {{ props.row.name}}
            </q-td>
            <q-td key="Fecha">
              {{ props.row.name}}
            </q-td>
            <q-td key="Editar">
              <q-btn
                class="btn-editar"
                round
                color="grey-14"
                size="sm"
                icon="eva-edit-outline"
              />
            </q-td>
            <q-td key="Ocultar">
              <q-btn
                class="btn-habilitar"
                round
                color="grey-14"
                size="sm"
                icon="eva-eye-off-outline"
                @click="habilitarAviso()"
              />
            </q-td>
            <q-td key="Eliminar">
              <q-btn
                class="btn-eliminar"
                round
                color="grey-14"
                size="sm"
                icon="eva-trash-outline"
                @click="eliminarAviso()"
              />
            </q-td>
            <q-td key="Ver">
              <q-btn
                class="btn-link"
                round
                color="grey-14"
                size="sm"
                icon="eva-link"
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
import AlertAviso from './Alert.vue'

export default {
  name: 'TablaAvisos',
  components: {
  },
  apollo: {
    countries: gql`query {
        countries{
            code,
            name,
            emoji
        }
    }`
  },
  data () {
    return {
      search: undefined,
      columns: [
        { name: 'Titulo', label: 'Titulo', field: 'name', align: 'left', sortable: true, required: true },
        { name: 'Estado', align: 'left', label: 'Estado', field: 'calories', sortable: true },
        { name: 'Fecha', align: 'left', label: 'Fecha', field: 'fat', sortable: true },
        { name: 'Editar', align: 'center', label: '', field: 'code' },
        { name: 'Ocultar/Habilitar', align: 'center', label: '', field: 'code' },
        { name: 'Eliminar', align: 'center', label: '', field: 'code' },
        { name: 'Ver', align: 'center', label: '', field: 'code' }
      ],
      countries: []
    }
  },
  methods: {
    // Muestra el Alert para eliminar
    eliminarAviso () {
      this.$q.dialog({
        component: AlertAviso,
        title: 'Eliminar',
        message: '¿Esta seguro de que desea eliminar permanentemente el aviso?',
        btn: 'Eliminar Aviso',
        btnColor: 'negative'
      })
    },
    habilitarAviso () {
      this.$q.dialog({
        component: AlertAviso,
        title: 'Habilitar aviso',
        message: 'Este aviso se hara visible para los usuarios',
        btn: 'Habilitar aviso',
        btnColor: 'primary'
      })
    }
  }
}
</script>
