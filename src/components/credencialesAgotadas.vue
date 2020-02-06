<template>
  <div>
    <q-dialog ref="dialog" v-model="alertAviso">
      <q-card class="my-modal items-center">
        <q-card-section class="vertical-middle">
          <div class="row">
            <div class="text-h6">Tu sesión ha expirado</div>
          </div>
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam consequatur necessitatibus tempore
          consequuntur tempora fugit debitis? Cum, omnis. Optio illo cumque quo modi qui, consequuntur provident dolores
          dignissimos porro pariatur.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn rounded unelevated outline dense label="Cancelar" color="" v-close-popup @click="onCancelClick()"
            no-caps />
          <q-btn rounded unelevated dense label="Eliminar documento" color="negative" v-close-popup @click="onOKClick()"
            no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

export default {
  name: 'expiredSesion',
  data () {
    return {
      alertAviso: false
    }
  }
}

</script>
