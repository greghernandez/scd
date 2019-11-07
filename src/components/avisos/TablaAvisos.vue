<template>
  <div>
    <q-card class="my-card my-shadow">
      <q-table
        :data="notices"
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
              {{ props.row.title}}
            </q-td>
            <q-td key="Estado">
              {{ props.row.status}}
            </q-td>
            <q-td key="Fecha">
              {{ props.row.fromDate}}
            </q-td>
            <q-td key="Editar">
              <q-btn
                class="btn-editar"
                round
                color="grey-14"
                size="sm"
                icon="eva-edit-outline"
                @click="editarAviso()"
              >
                <q-tooltip
                  transition-show="rotate"
                  transition-hide="rotate"
                >
                  Editar aviso
                </q-tooltip>
              </q-btn>
            </q-td>
            <q-td key="Ocultar">
              <BtnStatus />
            </q-td>
            <q-td key="Eliminar">
              <q-btn
                class="btn-eliminar"
                round
                color="grey-14"
                size="sm"
                icon="eva-trash-outline"
                @click="eliminarAviso(props.row._id)"
              >
                <q-tooltip
                  transition-show="rotate"
                  transition-hide="rotate"
                >
                  Eliminar aviso
                </q-tooltip>
              </q-btn>
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
import gql from 'graphql-tag'
import AlertAviso from './Alert.vue'
import ModalEditarAviso from 'components/avisos/EditarAviso'
import VerConvocatoria from 'components/avisos/actions/verConvocatoria'
import BtnStatus from 'components/avisos/actions/btnStatus'
import { apolloClient } from '../../boot/vue-apollo'
import { noticeDeleteMutation } from '../../services/graphql/mutations'

export default {
  name: 'TablaAvisos',
  components: {
    VerConvocatoria,
    BtnStatus
  },
  mounted () {
    apolloClient.query({
      query: gql`query{
      notices(page: 0, perPage: 0)
        {
          _id
          title
          status
          fromDate
          link
        }
      }`
    })
      .then(res => {
        this.notices = res.data.notices
        console.log(res.data.notices)
      })
      .catch(err => {
        console.log(err)
      })
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
      notices: []
    }
  },
  methods: {
    // Muestra Modal para editar una noticia
    editarAviso (id) {
      this.$q.dialog({
        component: ModalEditarAviso
      })
    },
    newNotice (e) {
      this.notices.push(e)
    },
    // Muest ra el Alert para eliminar
    eliminarAviso (id) {
      this.$q.dialog({
        component: AlertAviso,
        title: 'Eliminar',
        message: '¿Esta seguro de que desea eliminar permanentemente el aviso?',
        btn: 'Eliminar Aviso',
        btnColor: 'negative'
      }).onOk(() => {
        apolloClient.mutate({
          mutation: noticeDeleteMutation,
          variables: {
            id: id
          }
        })
      })
    }
  }
}
</script>
