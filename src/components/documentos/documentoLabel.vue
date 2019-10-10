<template>
  <div>
    <q-card class="doc-card">
      <q-card-section class="q-py-xs q-px-md">
        <div class="row justify-between items-center content-center">
            <div class="column">
              <div class="col-12">
                <q-icon color="negative" name="eva-file-text" style="font-size: 2rem;" />
              </div>
            </div>
            <div class="column text-caption">
              <div class="col-6 text-weight-bold">Nombre de documento</div>
              <div class="col-6">11/09/2001</div>
            </div>
            <div class="column">
              <q-btn round flat icon="eva-more-vertical-outline">
                <q-menu transition-show="scale" transition-hide="scale" anchor="center right" self="center right">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Abrir</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Mover a</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Descargar</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Eliminar</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'DocLabel'
}
</script>
