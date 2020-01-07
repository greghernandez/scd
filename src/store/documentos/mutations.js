export function setDocumentos (state, documentos) {
  state.documentos = documentos
}

export function isUploading (state) {
  state.isLoading = !state.isLoading
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
  const indexSeleted = state.selected.findIndex(e => e === id)
  state.selected.splice(indexSeleted, 1)
}

export function resetStore (state) {
  state.documentos = []
  state.selected = []
}

export function check (state, checkBox) {
  console.log(checkBox)
  if (checkBox.val) {
    state.selected.push(checkBox.objId)
  } else {
    console.log('del check')
    const index = state.selected.findIndex(e => e === checkBox.objId)
    state.selected.splice(index, 1)
  }
}
