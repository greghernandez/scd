<template>
  <div>
    <h4 class="q-mb-sm">Documentos pendientes</h4>
    <div>
      <DocumentsSection category="999"/>
    </div>
  </div>
</template>

<script>
import DocumentsSection from '../components/documentos/docsSection'

export default {
  name: 'PageDocPendientes',
  components: {
    DocumentsSection
  }
}
</script>
