// Set loaded documents in docsection componet
export function setDocumentos (state, documentos) {
  state.documentos = documentos
}
// Change loading state if the user is uploading documents
export function isUploading (state) {
  state.isLoading = !state.isLoading
}
// Change loading state if the user is downloading documents
export function changeDownloadState (state) {
  state.isDownloading = !state.isDownloading
}
// Add documents to store when user upload files
export function addDocuments (state, documentos) {
  console.log('Payload', documentos)
  documentos.filter((item) => {
    state.documentos.push(item)
  })
}
// Stablish user total points
export function setTotalPoints (state, points) {
  state.totalPoints = points
}
// Stablish displayed categories
export function addCategories (state, categories) {
  state.categorias = categories
}
// Add card points to state
export function addPoints (state, payload) {
  state.cardPoints.push(payload)
}
// reset category points
export function resetCatPoints (state) {
  state.cardPoints = []
}
// Update points (total and cards) depending on user action
export function updatePoints (state, payload) {
  console.log('UpdatePoints', payload)
  switch (payload.mode) {
    // When a document is moved
    case 'move':
      // Subtract points to document category
      for (let index = 0; index < state.cardPoints.length; index++) {
        if (state.cardPoints[index].id === payload.catId) {
          state.cardPoints[index].totalValue -= (payload.points * payload.movedCount)
        }
        // If category card is displayed, update totalValue property
        if (state.cardPoints[index].id === payload.newCat) {
          state.cardPoints[index].totalValue += (state.cardPoints[index].value * payload.movedCount)
        }
      }
      break
    // When a document is deleted
    case 'delete':
      // Reset deleted document points to totalPoints state
      state.totalPoints -= (payload.points * payload.deletedCount)
      // Subtract points to document category
      for (let index = 0; index < state.cardPoints.length; index++) {
        if (state.cardPoints[index].id === payload.catId) {
          state.cardPoints[index].totalValue -= (payload.points * payload.deletedCount)
        }
      }
      break
    // When a document is upload
    case 'upload':
      // Reset deleted document points to totalPoints state
      state.totalPoints += (payload.points * payload.deletedCount)
      // Subtract points to document category
      for (let index = 0; index < state.cardPoints.length; index++) {
        if (state.cardPoints[index].id === payload.catId) {
          state.cardPoints[index].totalValue += (payload.points * payload.deletedCount)
        }
      }
      break
    default:
      break
  }
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
