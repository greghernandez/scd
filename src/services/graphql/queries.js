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
// Name, Adscription, clave perfil
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
    fromDate
    toDate
  }
}
`
// Notice Query
export const noticeQuery = gql`query Notice($id: ID!){
  notice(id: $id){
    title
    body
    link
    imgLnk
    fromDate
    toDate
  }
}
`
// Notices Query Admin
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
// Users Query Admin
export const docentesQueryAdmin = gql`query Docentes($page: Int!, $perPage: Int!){
  users(page: $page, perPage: $perPage){
    clave
    status
    name
  }
}
`
// Users Query Admin
export const administradoresQueryAdmin = gql`query Docentes($page: Int!, $perPage: Int!){
  users(page: $page, perPage: $perPage){
    clave
    status
    name
    permissions{
      _id
      rank
    }
  }
}
`
// Categoias Root(Documentos)
export const categoriesQueryRoot = gql`query CategoriesRoot($type: Int!, $uid: String!){
  categories(type: $type, uid: $uid){
    clave
    title
    children{
      clave
      vlue
      title
      
    }
  }
}
`
// Categoias (Documentos)
export const categoriesQuery = gql`query Categories(page:0, perPage: 0, $type: Int!){
  categories(page: $page, perPage: $perPage, type: $type){
    title
    clave
  }
}
`

// get Permission(Admin)
export const permissionQueryAdmin = gql`query permissionAdmin($id: ID!){
  permission(id: $id){
    _id
    rank
  }
}
`
// get Documents in Tàrtaro
export const documentsTartaro = gql`query documentsInTartaro($search: SearchDocument){
  documents(search: $search){
    _id
    fileName
    createdAt
    path
  }
}
`
