<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" style="height: 300px">
      <q-header elevated class="bg-white text-primary">
        <q-toolbar>
          <!--@click="drawer = !drawer"-->
          <q-btn v-if="!$q.platform.is.mobile" flat round @click="miniState = !miniState" dense icon="menu" />
          <q-btn v-if="$q.platform.is.mobile" flat round @click="drawer = !drawer" dense icon="menu" />
          <q-toolbar-title>SCD</q-toolbar-title>
          <q-tabs>
            <q-btn rounded outline no-caps size="md" class="desktop-only" color="primary" label="Compartir"
              icon="ion-share-alt">
              <q-popup-proxy>
                <q-banner>
                  <template v-slot:action>
                    <!-- <q-icon name="eva-link-outline" color="primary" /> -->
                  </template>
                  <div class="row">
                    <p class="q-my-none">Este es tu link para compartir</p>
                  </div>
                  <div class="row">
                    <q-input id="link" dense v-model="linkPerfil" />
                    <q-btn flat round icon="eva-copy-outline" v-clipboard:copy="linkPerfil"
                      v-clipboard:success="onCopy">
                      <q-tooltip transition-show="rotate" transition-hide="rotate">
                        Copiar el enlace para compartir
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
            <q-btn-dropdown class="avatar-img desktop-only" auto-close flat :label="name"
              :icon="'img:'+ this.baseAdress + this.profilePhoto" rounded no-caps>
              <q-list link>
                <q-item clickable to="/mi-cuenta">
                  <q-item-section>Mi cuenta</q-item-section>
                </q-item>

                <q-item @click="logout()" clickable>
                  <q-item-section>Cerrar Sesión</q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
            <q-btn-dropdown class="avatar-img mobile-only" auto-close flat :icon="'img:'+ this.profilePhoto" rounded
              no-caps>
              <q-list link>
                <q-item clickable to="/mi-cuenta">
                  <q-item-section>Mi cuenta</q-item-section>
                </q-item>

                <q-item @click="logout()" clickable>
                  <q-item-section>Cerrar Sesión</q-item-section>
                </q-item>

              </q-list>
            </q-btn-dropdown>
          </q-tabs>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="200"
        :breakpoint="500" bordered content-class="">
        <q-scroll-area class="fit">
          <q-list padding dense>
            <q-item v-if="!miniState">
              <q-item-section class="items-center">
                <q-avatar class="avatar-img">
                  <img :src="this.baseAdress + this.profilePhoto">
                </q-avatar>
                <div v-if="!miniState" class="text-center">
                  <p class="q-my-none text-subtitle2">
                    {{ name }}<br>
                    <span>{{ lastName }}</span><br>
                    <span class="text-caption">{{ adscription }}</span>
                  </p>
                  <q-chip color="secondary" dense text-color="white" class="q-py-xs">
                    {{ this.totalPoints }} P
                  </q-chip>
                </div>
              </q-item-section>
            </q-item>

            <q-separator inset />

            <q-item-label header>Menu</q-item-label>
            <q-item to="/" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-home-outline" />
              </q-item-section>

              <q-item-section>
                Inicio
              </q-item-section>
            </q-item>

            <q-item to="/documentos" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-file-outline" />
              </q-item-section>

              <q-item-section>
                Documentos
              </q-item-section>
            </q-item>

            <q-item to="/documentos-pendientes" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-archive-outline" />
              </q-item-section>

              <q-item-section>
                Documentos Pendientes
              </q-item-section>
            </q-item>

            <!--<q-item to="/rubros" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-book-outline" />
              </q-item-section>

              <q-item-section>
                Rubros
              </q-item-section>
            </q-item>-->

            <q-item v-if="admin" to="/avisos" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-alert-triangle-outline" />
              </q-item-section>

              <q-item-section>
                Avisos
              </q-item-section>
            </q-item>

            <q-item v-if="admin" to="/docentes" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-people-outline" />
              </q-item-section>

              <q-item-section>
                Docentes
              </q-item-section>
            </q-item>

            <q-item v-if="superAdmin" to="/administradores" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-shield-outline" />
              </q-item-section>

              <q-item-section>
                Administradores
              </q-item-section>
            </q-item>

            <q-item class="mobile-only">
              <q-item-section>
                <q-btn rounded outline no-caps size="sm" color="primary" label="Compartir" icon="ion-share-alt">
                  <q-popup-proxy>
                    <q-banner>
                      <template v-slot:action>
                        <!-- <q-icon name="eva-link-outline" color="primary" /> -->
                      </template>
                      <div class="row">
                        <p class="q-my-none">Este es tu link para compartir</p>
                      </div>
                      <div class="row">
                        <q-input id="link" dense v-model="linkPerfil" />
                        <q-btn flat round icon="eva-copy-outline" v-clipboard:copy="linkPerfil"
                          v-clipboard:success="onCopy">
                          <q-tooltip transition-show="rotate" transition-hide="rotate">
                            Copiar el enlace para compartir
                          </q-tooltip>
                        </q-btn>
                      </div>
                    </q-banner>
                  </q-popup-proxy>
                </q-btn>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-btn outline rounded no-caps size="sm" color="primary" label="Descargar CV"
                  icon="eva-download-outline" @click="descargarCV()" />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-btn rounded no-caps size="sm" color="primary" label="Subir Documentos"
                  icon="eva-cloud-upload-outline" @click="subirDocumentos()" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
        <!--<div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
          <q-btn dense round unelevated color="accent" icon="chevron_left" @click="miniState = true" />
        </div>-->
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { openURL } from 'quasar'
import SubirDocumentos from 'components/documentos/subirDocumentos'
import descargarDocumentos from 'components/documentos/descargarDocumentos'
import { mapActions } from 'vuex'
import { payload } from '../services/user'
import { permissions, rubros, address } from '../../enviroment.dev'

export default {
  name: 'MyLayout',
  components: {
    // Dialog
  },
  data () {
    return {
      drawer: false,
      miniState: false,
      linkPerfil: location.host + '/docente/',
      userData: undefined,
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
    openURL,
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = !this.miniState
        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    // Download user CV
    descargarCV () {
      this.$q.dialog({
        component: descargarDocumentos,
        parent: this,
        title: 'Descargar del rubro ',
        btnColor: 'negative'
      })
    },
    // Upload Documents
    subirDocumentos () {
      this.$q.dialog({
        component: SubirDocumentos,
        parent: this,
        title: 'Documentos Pendinetes',
        category: '5db33a924dc61d2260e5c507',
        global: true,
        unelevated: true,
        rounded: true,
        btnColor: 'primary'
      })
    },
    // Copy profile link
    onCopy: function () {
      this.$q.notify({
        message: 'Se copio el link para compartir',
        position: 'top-right'
      })
    },
    // Log out
    logout: function () {
      localStorage.removeItem('scd-at')
      window.location.href = 'login'
    }
  },
  mounted () {
    // Get user info
    this.$store
      .dispatch('docentes/userData', payload.userId)
      .then(res => {
        this.name = res.data.user.name
        this.lastName = res.data.user.lastName
        this.adscription = res.data.user.adscription.name
        this.photoUrl = res.data.user.photoURL
        this.$store.commit('docentes/setProfilePhoto', this.photoUrl)
        this.linkPerfil += payload.userId
        this.userPermissions = res.data.user.permissions
        this.userPermissions = this.userPermissions.filter(e => {
          for (let index = 0; index < this.userPermissions.length; index++) {
            if (permissions.admin === e.rank) {
              this.admin = true
              this.$store.commit('docentes/setPermisoAdmin', this.admin)
            } else if (permissions.superAdmin === e.rank) {
              this.superAdmin = true
              this.$store.commit('docentes/setPermisoSuper', this.superAdmin)
            }
          }
        })
      })
      .catch(err => {
        console.log('Error', err)
      })
    this.$store
      .dispatch('documentos/inspectCategory', {
        user: payload.userId,
        category: rubros.todos
      })
      .then(res => {
        this.$store.commit('documentos/setTotalPoints', res.data.inspectCategory.totalValue)
      })
  },
  computed: {
    totalPoints () {
      return this.$store.state.documentos.totalPoints
    },
    profilePhoto () {
      return this.$store.state.docentes.profilePhoto
    }
  }
}
</script>

<style>
</style>
