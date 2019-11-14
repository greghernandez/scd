export function setDocentes (state, docentes) {
  state.docentes = docentes
}
export function deleteDocente (state, id) {
  const index = state.docentes.findIndex(e => e._id === id)
  state.docentes.splice(index, 1)
}
export function cambiarPermisos (state, payload) {
  // Busco al usuario
  const index = state.docentes.findIndex(e => e._id === payload.id)
  console.log(index)
  // Busco el permiso
  state.docentes.splice(index, 1)
  // Elimino o agrego permisos
  let variable = {}

  console.log('Nuevo')
  console.log(variable)
}
