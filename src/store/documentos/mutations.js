export function setDocumentos (state, documentos) {
  state.documentos = documentos
}

export function addDocuments (state, documentos) {
  console.log('Payload', documentos)
  documentos.filter((item) => {
    state.documentos.push(item)
  })
}

export function deleteDocumento (state, id) {
  const index = state.documentos.findIndex(e => e._id === id)
  state.documentos.splice(index, 1)
}
