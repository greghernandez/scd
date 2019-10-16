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

// Notices Query
export const noticesQuery = gql`
  {
    notices @client {
      title
      body
      status
      link
      imgLnk
      fromDate
      toDate
      createdBy
      createdAt
      updatedAt
    }
  }
`
