export function getDocumentos (state) {
  return state.documentos
}

export function getCardPoints (state, id) {
  const index = state.cardPoints.findIndex(e => e.id === id)
  return state.cardPoints[index].totalValue
}
