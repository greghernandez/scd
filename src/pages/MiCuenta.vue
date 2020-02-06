<template>
    <div>
      <h4 class="q-mt-xs q-mb-sm">Mi cuenta</h4>
      <q-card class="my-card q-mt-lg">
        <q-card-section class="row">
          <div class="col-md-4 col-sm-12 col-xs-12">
            <div class="text-h6">Foto de perfil</div>
            <div class="text-center q-pt-sm">
              <q-avatar class="avatar-img cursor-pointer" size="120px" @click="cambiarImg()">
                <q-img :src="this.baseAdress + this.profilePhoto" :ratio="1" style="width: 100%">
                  <div class="absolute-bottom text-subtitle1 text-center change-photo">
                    <q-icon name="eva-edit-outline" size="md" />
                    <span class="text-weight-medium">Cambiar foto</span>
                  </div>
                </q-img>
              </q-avatar>
            </div>
          </div>
          <q-separator vertical  class="desktop-only" />
          <q-separator  class="mobile-only" />
          <div class="col-md-7 col-sm-12 col-xs-12 q-pl-md">
            <div class="text-h6">Información de tu cuenta</div>
            <div class="text-subtitle1 q-pt-sm">
              <div>
                <span class="text-weight-bold">Clave: </span><span>{{ clave }}</span>
              </div>
              <div>
                <span class="text-weight-bold">Nombre: </span><span>{{ name + ' ' + lastName }}</span>
              </div>
              <div>
                <span class="text-weight-bold">Facultad: </span><span>{{ adscription }}</span>
              </div>
              <div v-if="admin || superAdmin">
                <span class="text-weight-bold">Permisos: </span><span v-if="admin">Aministrador</span><span v-if="superAdmin">, Super Administrador</span>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { payload } from '../services/user'
import { permissions, address } from '../../enviroment.dev'
import CambiarFotoPerfil from '../components/cuenta/modales/CambiarFotoPerfil.vue'

export default {
  name: 'MiCuenta',
  data () {
    return {
      drawer: false,
      miniState: false,
      linkPerfil: location.host + '/docente/',
      userData: undefined,
      clave: undefined,
      name: undefined,
      lastName: undefined,
      photoUrl: undefined,
      adscription: undefined,
      userPermissions: null,
      admin: false,
      superAdmin: false,
      baseAdress: address
    }
  },
  methods: {
    ...mapActions({
      docentesQuery: 'docentes/actions'
    }),
    ...mapActions({
      documentosQuery: 'documentos/actions'
    }),
    cambiarImg () {
      this.$q.dialog({
        component: CambiarFotoPerfil,
        parent: this
      })
    }
  },
  mounted () {
    // Get user info
    this.$store
      .dispatch('docentes/userData', payload.userId)
      .then(res => {
        this.clave = res.data.user.clave
        this.name = res.data.user.name
        this.lastName = res.data.user.lastName
        this.adscription = res.data.user.adscription.name
        this.photoUrl = res.data.user.photoURL
        this.linkPerfil += payload.userId
        this.userPermissions = res.data.user.permissions
        this.userPermissions = this.userPermissions.filter(e => {
          for (let index = 0; index < this.userPermissions.length; index++) {
            if (permissions.admin === e.rank) {
              this.admin = true
            } else if (permissions.superAdmin === e.rank) {
              this.superAdmin = true
            }
          }
        })
      })
      .catch(err => {
        console.log('Error', err)
      })
  },
  computed: {
    profilePhoto () {
      return this.$store.state.docentes.profilePhoto
    }
  }
}
</script>
