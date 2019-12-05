export function setAviso (state, aviso) {
  state.aviso = aviso
}

export function setAvisos (state, avisos) {
  state.avisos = avisos
}

export function updateAviso (state, aviso) {
  // state.avisos[index] = aviso
  const index = state.avisos.findIndex(e => e._id === aviso.id)
  state.avisos[index].title = aviso.title
  state.avisos[index].body = aviso.body
  state.avisos[index].link = aviso.link
  state.avisos[index].fromDate = aviso.fromDate
  state.avisos[index].toDate = aviso.toDate
}

export function addAviso (state, aviso) {
  state.avisos.push(aviso)
}

export function deleteAviso (state, id) {
  const index = state.avisos.findIndex(e => e._id === id)
  state.avisos.splice(index, 1)
}
