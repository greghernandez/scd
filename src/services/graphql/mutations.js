// La cofiguración de apollo se encuentran la carpeta src/boot
import gql from 'graphql-tag'
// notice Mutation CREATE
export const noticeCreateMutation = gql`mutation CreateNotice($file: Upload!, $input: InputNotice!) {
    createNotice(file: $file, input: $input) {
        _id
        title
        status
        fromDate
        link
    }
}
`
// notice Mutation Update
export const noticeUpdateMutation = gql`mutation UpdateNotice($input: UpdateNotice){
  updateNotice(input: $input)
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
// export const noticeStatusMutation = gql`mutation StatusNotice($id: ID!, $input: UpdateNotice!){
//   updateNotice(id: $id, input: $input){
//     _id
//   }
// }
// `
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
// User Mutation UpdateRole
export const userUpdateRoleMutation = gql`mutation UpdateRoleUser($input: UpdateUserRole!){
  updateUserRole(input: $input){
    _id
    name
  }
}
`
// User Mutation UpdateMultipleFiles
export const multipleUpload = gql`
    mutation MultipleUpload($files: [Upload!]!, $input: InputDocument!) {
        multipleUpload(files: $files, input: $input) {
            _id
            fileName
            fileId
            mimetype
            size
            path
        }
    }
`
// User Mutation MoveDocument
export const MOVE_DOCUMENT = gql`mutation MoveDocument($doc: ID!, $cat: ID!){
  moveDocument(doc: $doc, cat: $cat){
    _id
  }
}
`
// User DeletDocuments
export const DELETE_DOCUMENTS = gql`mutation DeleteDocuments($ids: [ID!]!){
  deleteDocuments(ids: $ids){
    deletedCount
    errors
  }
}
`
// Delete User
export const DELETE_USER = gql`mutation DelteUser($id: ID!){
  deleteUser(id: $id){
    _id
  }
}
`
