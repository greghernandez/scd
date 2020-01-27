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
export function setTotalPoints (state, points) {
  state.totalPoints = points
}
export function addCategories (state, categories) {
  state.categorias = categories
}
export function addPoints (state, payload) {
  state.cardPoints.push(payload)
}
export function resetCatPoints (state) {
  state.cardPoints = []
}
export function deleteDocumento (state, id) {
  const index = state.documentos.findIndex(e => e._id === id)
  state.documentos.splice(index, 1)
  const indexSeleted = state.selected.findIndex(e => e === id)
  state.selected.splice(indexSeleted, 1)
}

export function deleteDocumentos (state, ids) {
  ids.filter(item => {
    const index = state.documentos.findIndex(e => e._id === item)
    state.documentos.splice(index, 1)
    state.selected = []
  })
}

export function resetStore (state) {
  state.documentos = []
  state.selected = []
  state.selectedCat = ''
  // state.cardPoints = []
}

export function check (state, checkBox) {
  if (checkBox.val) {
    state.selected.push(checkBox.objId)
  } else {
    console.log('del check')
    const index = state.selected.findIndex(e => e === checkBox.objId)
    state.selected.splice(index, 1)
  }
}
export function setActualCategory (state, catId) {
  state.selectedCat = catId
}

export function resetSelectedCat (state) {
  state.selectedCat = []
}
