<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" style="height: 300px">
      <q-header elevated class="bg-white text-primary">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>SCD</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above

        :mini="!drawer || miniState"
        @click.capture="drawerClick"

        :width="200"
        :breakpoint="500"
        bordered
        content-class=""
      >
        <q-scroll-area class="fit">
          <q-list padding>

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

            <q-item to="/rubros" clickable v-ripple exact>
              <q-item-section avatar>
                <q-icon name="eva-book-outline" />
              </q-item-section>

              <q-item-section>
                Rubros
              </q-item-section>
            </q-item>

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
                <q-icon name="eva-award-outline" />
              </q-item-section>

              <q-item-section>
                Administradores
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
        <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
          <q-btn
            dense
            round
            unelevated
            color="accent"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      drawer: false,
      miniState: false
    }
  },
  methods: {
    openURL,
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    }
  }
}
</script>

<style>
</style>
