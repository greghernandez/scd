<template>
  <div>
    <q-page-sticky position="bottom-right" :offset="[18, 86]">
      <q-fab icon="eva-more-vertical-outline" direction="up" color="primary">
        <q-fab-action @click="onClick" color="negative" icon="eva-trash-outline" />
        <q-fab-action @click="onClick" color="secondary" icon="eva-move-outline" />
        <q-fab-action @click="onClick" color="primary" icon="eva-cloud-download-outline" />
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>
export default {
  name: 'FloatingMenu'
}
</script>
