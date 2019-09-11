<template>
  <div>
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
    >
      <template v-slot:top="props">
        <q-input rounded outlined dense v-model="search" label="Buscar aviso" type="search">
        <template v-slot:append>
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
              round
              color="grey-14"
              size="sm"
              icon="eva-edit-outline"
            />
          </q-td>
          <q-td key="Ocultar">
            <q-btn
              round
              color="grey-14"
              size="sm"
              icon="eva-eye-off-outline"
            />
          </q-td>
          <q-td key="Eliminar">
            <q-btn
              round
              color="grey-14"
              size="sm"
              icon="eva-trash-outline"
            />
          </q-td>
          <q-td key="Ver">
            <q-btn
              round
              color="grey-14"
              size="sm"
              icon="eva-link"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'TablaAvisos',
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
      search: '',
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
  }
}
</script>
