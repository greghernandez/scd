<template name="component-name">
  <div>
    <q-btn class="btn-link" round color="grey-14" size="sm" icon="eva-link" @click="verConvocatoria()">
      <q-tooltip transition-show="rotate" transition-hide="rotate">
        Ver convocatoria
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'VerConvocatoria',
  props: {
    link: {
      type: String,
      required: true
    }
  },
  methods: {
    verConvocatoria () {
      window.open(this.link, '_blank')
    }
  }
}
</script>
