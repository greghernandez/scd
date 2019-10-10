import gql from 'graphql-tag'

export function login (expedinte, password) {
    login =  gql`query {
        login(clave: expedinte, password: password){
            UserId
            token
            tokenExpiration
        }
    }`
}