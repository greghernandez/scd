export function setAviso (state, aviso) {
  state.aviso = aviso
}

export function setAvisos (state, avisos) {
  state.avisos = avisos
}

export function addAviso (state, aviso) {
  state.avisos.push(aviso)
}

export function deleteAviso (state, id) {
  const index = state.avisos.findIndex(e => e._id === id)
  state.avisos.splice(index, 1)
}
