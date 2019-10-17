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
            <q-btn rounded outline no-caps size="md" color="primary" label="Compartir" icon="ion-share-alt">
              <q-popup-proxy>
                <q-banner>
                  <template v-slot:action>
                    <!-- <q-icon name="eva-link-outline" color="primary" /> -->
                  </template>
                  <div class="row">
                    <p class="q-my-none">Este es tu link para compartir</p>
                  </div>
                  <div class="row">
                    <q-input id="link" dense v-model="linkPerfil"/>
                    <q-btn flat round icon="eva-copy-outline" v-clipboard:copy="linkPerfil" v-clipboard:success="onCopy">
                      <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate"
                      >
                        Copiar el enlace para compartir
                    </q-tooltip>
                    </q-btn>
                  </div>
                </q-banner>
              </q-popup-proxy>
            </q-btn>
            <q-btn-dropdown class="avatar-img" v-if="$q.platform.is.desktop" auto-close flat label="Nombre usuario"
              icon="img:https://picsum.photos/200" rounded no-caps>
              <q-list link>
                <q-item clickable to="/mi-perfil">
                  <q-item-section>Mi Perfil</q-item-section>
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
                <q-avatar>
                  <img src="https://picsum.photos/200">
                </q-avatar>
                <div v-if="!miniState" class="text-center">
                  <p class="q-my-none">{{ name }}<br>{{ adscription }}</p>
                  <q-chip color="secondary" dense text-color="white" class="q-py-xs">
                    50 P
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

            <q-item to="/avisos" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-alert-triangle-outline" />
              </q-item-section>

              <q-item-section>
                Avisos
              </q-item-section>
            </q-item>

            <q-item to="/docentes" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-people-outline" />
              </q-item-section>

              <q-item-section>
                Docentes
              </q-item-section>
            </q-item>

            <q-item to="/administradores" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-shield-outline" />
              </q-item-section>

              <q-item-section>
                Administradores
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
                  icon="eva-cloud-upload-outline" @click="subirDocumentos()"/>
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
import Modal from 'components/Dialog'
import SubirDocumentos from 'components/documentos/subirDocumentos'
import { userQueryToolbar } from '../services/graphql/queries'

export default {
  name: 'MyLayout',
  components: {
    // Dialog
  },
  data () {
    return {
      drawer: false,
      miniState: false,
      linkPerfil: 'Mensaje',
      userData: undefined,
      name: undefined,
      adscription: undefined
    }
  },
  methods: {
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
    descargarCV () {
      this.$q.dialog({
        component: Modal,
        title: 'Descargar',
        message: '¿Esta seguro de que desea eliminar permanentemente el aviso?',
        btn: 'Eliminar Aviso',
        btnColor: 'negative'
      })
    },
    // Subir documentos
    subirDocumentos () {
      this.$q.dialog({
        component: SubirDocumentos,
        title: 'Carga de archivos X',
        btn: 'Eliminar Aviso',
        unelevated: true,
        rounded: true,
        btnColor: 'primary'
      })
    },
    // Copiar link de perfil
    onCopy: function () {
      this.$q.notify({
        message: 'Se copio el link para compartir',
        position: 'top-right'
      })
    },
    // Cerrar Sesión
    logout: function () {
      localStorage.removeItem('scd-at')
      window.location.href = '/login'
    }
  },
  mounted () {
    // Decode token
    const token = localStorage.getItem('scd-at') || null
    var playload = JSON.parse(atob(token.split('.')[1]))

    // Graphql query
    this.userData = this.$apollo.query({
      query: userQueryToolbar,
      variables: {
        id: playload.userId
      }
    })
    this.userData.then(
      res => {
        this.name = res.data.user.name
        this.adscription = res.data.user.adscription.name
      })
  }
}
</script>

<style>
</style>
