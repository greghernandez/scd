//
let token = localStorage.getItem('scd-at') || null

//
if (token !== null) {
  token = JSON.parse(atob(token.split('.')[1]))
} else {
  token = null
}

export const payload = token

export function isTokenValid () {
  if (token === null) {
    console.log('Token Nulo')
    return false
  } else {
    console.log('Token no nulo')
    let ts = Math.floor(Date.now() / 1000)
    console.log(ts)
    if (ts >= payload.exp) {
      console.log('Token expiro')
      return false
    } else {
      console.log('Token vigente')
      return true
    }
  }
}

export function logOut () {
  localStorage.removeItem('scd-at')
}
