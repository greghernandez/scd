export function setDocentes (state, docentes) {
  state.docentes = docentes
}
export function setProfilePhoto (state, docenteData) {
  state.profilePhoto = docenteData
}
export function deleteDocente (state, id) {
  const index = state.docentes.findIndex(e => e._id === id)
  state.docentes.splice(index, 1)
}
export function setPermisoAdmin (state, userPermissions) {
  state.userPermissions.admin = userPermissions
}
export function setPermisoSuper (state, userPermissions) {
  state.userPermissions.superAdmin = userPermissions
}
