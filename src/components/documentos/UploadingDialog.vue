<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="uploading" class="q-pb-sm" seamless position="bottom">
      <q-card  style="width: 325px">
        <q-card-section class="row items-center justify-center no-wrap">
          <div>
            <q-spinner
              color="primary"
              size="3em"
            />
          </div>
          <div class="text-weight-bold q-pl-sm">Tus archivos se están subiendo</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadingDialog',
  props: {
    uploading: {
      type: Boolean
    }
  }
}
</script>
