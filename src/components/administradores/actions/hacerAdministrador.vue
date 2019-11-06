<template name="component-name">
    <div>
      <div v-if="isAdmin == true">
          <q-btn
          flat
          class="btn-habilitar"
          round
          text-color="primary"
          size="sm"
          icon="eva-shield"
          @click="delegarPermisos(isAdmin)"
        >
          <q-tooltip
            content-class="bg-indigo"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Quitar permisos de administrador
          </q-tooltip>
        </q-btn>
      </div>
      <div v-else>
        <q-btn
          flat
          class="btn-habilitar"
          round
          text-color="primary"
          size="sm"
          icon="eva-shield-outline"
          @click="delegarPermisos(isAdmin)"
        >
          <q-tooltip
            content-class="bg-indigo"
            transition-show="rotate"
            transition-hide="rotate"
          >
            Hacer administrador
          </q-tooltip>
        </q-btn>
      </div>
    </div>
</template>

<script>
import AlertAviso from '../../Alert'
import { apolloClient } from '../../../boot/vue-apollo'
import { userUpdateRoleMutation } from '../../../services/graphql/mutations'

export default {
  name: 'BtnHacerAdministrador',
  data () {
    return {
      elrango: this.rango,
      isAdmin: false,
      permissionsData: undefined,
      propTitle: '',
      propMessage: '',
      propBtn: '',
      propBtnColor: '',
      propPermition: null,
      propAction: null
    }
  },
  props: {
    rango: {
      type: Array,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.elrango.forEach(element => {
      if (element.rank === 1) {
        this.isAdmin = true
      }
    })
  },
  methods: {
    delegarPermisos (isAdmin) {
      if (isAdmin === true) {
        this.propTitle = 'Quitar permisos de administrador'
        this.propMessage = '¿Esta seguro de que desea remover los permisos de administrador a este usuario?'
        this.propBtn = 'Quitar permisos'
        this.propBtnColor = 'negative'
        this.propPermition = 1
        this.propAction = 2
      } else {
        this.propTitle = 'Hacer Administrador'
        this.propMessage = '¿Esta seguro de que desea convertir este usuario en administrador?'
        this.propBtn = 'Hacer administrador'
        this.propBtnColor = 'primary'
        this.propPermition = 1
        this.propAction = 1
      }
      this.$q.dialog({
        component: AlertAviso,
        title: this.propTitle,
        message: this.propMessage,
        btn: this.propBtn,
        btnColor: this.propBtnColor
      }).onOk(() => {
        this.permissionsData = apolloClient.mutate({
          mutation: userUpdateRoleMutation,
          variables: {
            input: {
              userId: this.userId,
              permissionRank: this.propPermition,
              action: this.propAction
            }
          }
        })
        this.permissionsData.then(
          res => {
            console.log(res.data)
            this.isAdmin = !this.isAdmin
          }
        ).catch(
          err => {
            console.log(err)
          }
        )
      })
    }
  }
}
</script>
