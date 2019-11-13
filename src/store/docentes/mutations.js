export function setDocentes (state, docentes) {
  state.docentes = docentes
}
export function deleteDocente (state, id) {
  const index = state.docentes.findIndex(e => e._id === id)
  state.docentes.splice(index, 1)
}
