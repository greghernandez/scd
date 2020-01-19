// Assign token value
let token = localStorage.getItem('scd-at') || null

// Dividing token
if (token !== null) {
  token = JSON.parse(atob(token.split('.')[1]))
} else {
  token = null
}

export const payload = token

export function isTokenValid () {
  // verifying if token is null
  if (token === null) {
    // token is null
    return false
  } else {
    let ts = Math.floor(Date.now() / 1000)
    // verifying if token expired
    if (ts >= payload.exp) {
      return false
    } else {
      // the token is valid
      return true
    }
  }
}

export function logOut () {
  localStorage.removeItem('scd-at')
}
