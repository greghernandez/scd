import gql from 'graphql-tag'
// import { loginQuery } from 'queries'

export const typeDefs = gql`
  extend type login {
    userId: ID!
    token: String!
    tokenExpiration: String!
  },
  extend type notices {
    title: String!
    body: String!
    status: Number!
    link: String!
    imgLnk: String!
    fromDate: Number!
    toDate: Number!
    createdBy: ID!
    createdAt: Number!
    updatedAt: Number!
  }
`
