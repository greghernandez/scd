export function errorHandler (e) {
  const errorType = e.split(': ')[1]
  console.log(errorType)
  let errMsg = 'Ocurrió un error inesperado'
  let errorAuth = false
  switch (errorType) {
    case 'AuthenticationError':
      errMsg = 'La clave de empleado o la contraseña de su cuenta son incorrectas'
      errorAuth = true
      break

    case 'Failed to fetch':
      errMsg = 'Ocurrió un problema con la conexión, por favor revisa que estes conectado a internet'
      break

    case 'ForbiddenError':
      errMsg = 'Tu usuario se encuentra desactivado, consulta con un administrador'
      break

    default:
      errMsg = 'Ocurrió un error inesperado'
      break
  }
  return { msg: errMsg, errorAuth: errorAuth }
}
