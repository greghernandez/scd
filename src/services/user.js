const token = localStorage.getItem('scd-at') || null
export const payload = JSON.parse(atob(token.split('.')[1]))
