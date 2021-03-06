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
      clave
      name
      lastName
      photoURL
      adscription{
        name
      }
      permissions{
        _id
        rank
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
export const noticesQuery = gql`query Notices($page: Int!, $perPage: Int!, $status: Int!){
  notices(page: $page, perPage: $perPage, status: $status){
    _id
    title
    body
    link
    imgLnk
    fromDate
    toDate
    status
  }
}
`
// Notice Query
export const noticeQuery = gql`query Notice($id: ID!){
  notice(id: $id){
    _id
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
    _id
    clave
    status
    name
    lastName
    permissions{
      _id
      rank
    }
  }
}
`
// Categoias Root(Documentos)
export const categoriesQueryRoot = gql`query CategoriesRoot($page: Int!, $perPage: Int!, $type: Int!){
  categories(page: $page, perPage: $perPage, type: $type){
    _id
    title
    clave
  }
}
`

// Categoia (Documento)
export const categoryQuery = gql`query Categories($type: Int!, $uid: ID!){
  category(type: $type, uid: $uid){
    _id
    clave
    title
    children{
      _id
      clave
      value
      title
    }
  }
}
`

// get Permission(Admin)
export const permissionQueryAdmin = gql`query permissionAdmin($page: Int!, $perPage: Int!){
  permissions(page: $page, perPage: $perPage){
    _id
    rank
  }
}
`
// get Documents in Tàrtaro
export const documentsTartaro = gql`query documentsInTartaro($search: SearchDocument!){
  documents(search: $search){
    _id
    fileId
    fileName
    createdAt
    path
  }
}
`
// get download tree data
export const treeQuery = gql`query GetTree($cat: ID!, $user: ID!) {
    getTree(cat: $cat, user: $user) {
        _id
        label
        type
        children {
            _id
            label
            type
            children {
                _id
                label
                type
                children {
                    _id
                    label
                    type
                    children {
                        _id
                        label
                        type
                    }
                }
            }
        }
    }
}`
// Count Documents and pending documents
export const DOCUMENTS_QUANTITY = gql`query DocuemntsQuantity($userId: ID!, $category: String!){
  documentsQuantity(user: $userId, category: $category)
}
`
// get the amount of all user documents and their value
export const INSPECT_CATEGORY = gql`query inspectCategory($user: ID!, $category: ID!){
  inspectCategory(user: $user, category: $category) {
    _id
    clave
    title
    totalDocs
    totalValue
  }
}
`
// get a summarize of a category
export const SUMMARIZE_CATEGORY = gql`query summarizeCategory($user: ID!, $category: ID!){
  summarizeCategory(user: $user, category: $category) {
    _id
    title
    totalDocs
    totalValue
  }
}
`
// get data from mover tree
export const categoriesQueryTreeMover = gql`query CategoriesTreeMover($page: Int!, $perPage: Int!, $type: Int!){
  categories(page: $page, perPage: $perPage, type: $type){
    _id
    title
    clave
    value
    children{
      _id
      clave
      title
      value
      children{
        _id
        title
        clave
        value
        children{
          _id
          title
          clave
          value
        }
      }
    }
  }
}
`
