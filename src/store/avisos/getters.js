export function getAvisos (state) {
  return state.avisos
}
export function getAvisoById (state, id) {
  console.log('getAvisos', id)
  return state.avisos.find(todo => todo.id === id)
}
