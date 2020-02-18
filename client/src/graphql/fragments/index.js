import gql from 'graphql-tag'

export const USER_ATTRIBUTES = gql`
  fragment userAttributes on User {
    _id
    name
    email
    cnpj
    description
    createdAt
    updatedAt
  }
`