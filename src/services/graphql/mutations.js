// La cofiguración de apollo se encuentran la carpeta src/boot
import gql from 'graphql-tag'
// notice Mutation CREATE
export const noticeCreateMutation = gql`mutation CreateNotice($input: InputNotice!) {
    createNotice(input: $input) {
        _id
        title
        status
        fromDate
        link
    }
}
`
// notice Mutation Update
export const noticeUpdateMutation = gql`mutation UpdateNotice($title: String!, $body: String!, $status: Int!, 
                                                              $link: String!, $imgLnk: String!, $fromDate: Float!, 
                                                              $toDate: Float!, $createdBy: ID!){
  updateNotice(
    title: $title
    body: $body
    status: $status
    link: $link
    imgLnk: $imgLnk
    fromDate: $fromDate
    toDate: $toDate
    createdBy: $createdBy)
  {
    _id
  }
}
`

// notice Mutation Delete
export const noticeDeleteMutation = gql`mutation DeleteNotice($id: ID!){
  deleteNotice(id: $id){
    _id
  }
}
`
// notice Mutation Update Status
export const noticeStatusMutation = gql`mutation StatusNotice($id: ID!, $status: Int!){
  updateNotice(id: $id, input: $input){
    _id
  }
}
`
// User Mutation UpdateRole
export const userRoleMutation = gql`mutation ChangeRoleUser($userId: ID!, $permissionId: ID!, $action: Int!){
  updateUserRole( userId: $userId, permissionId: $permissionId, action: $action){
    _id
    name
  }
}
`
// User Mutation Update
export const userUpdateMutation = gql`mutation UpdateUser($userId: ID!, $status: String!){
   updateUser( id: $userId, status: $status){
    _id
    name
  }
}
`
// User Mutation Delete
export const userDeleteMutation = gql`mutation DeleteUser($userId: ID!, $permissionId: ID!, $action: Int!){
  updateUserRole( userId: $userId, permissionId: $permissionId, action: $action){
    _id
    name
  }
}
`
