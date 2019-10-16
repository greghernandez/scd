// La cofiguración de apollo se encuentran la carpeta src/boot
import gql from 'graphql-tag'

// Login Query
export const loginQuery = gql`query Login($clave: String!, $password: String!){
      login(clave: $clave, password: $password) {
        userId
        token
        tokenExpiration
      }
    }
`
// Name and Adscription toolbar
export const userQueryToolbar = gql`query User($id: ID!){
  user(id: $id){
      name
      adscription{
        name
      }  
    }
  }
`
// Name and Adscription perfil
export const userQueryPerfil = gql`query User($id: ID!){
  user(id: $id){
      name
      adscription{
        name
      }
      clave
    }
  }
`
// Notices Query
export const noticesQuery = gql`query Notices($page: Int!, $perPage: Int!){
  notices(page: $page, perPage: $perPage){
    title
    body
    link
    imgLnk
    fromDate
    toDate
  }
}
`
// Notices Query
export const noticesQueryAdmin = gql`query Notices($page: Int!, $perPage: Int!){
  notices(page: $page, perPage: $perPage){
    title
    link
    fromDate
    toDate
    status
    createdBy
  }
}
`
