import { gql } from '@apollo/client';

export const GET_USER_BY__D = gql`
query getUserById($userId: String!) {
    user(id: $userId) {
      _id
      email
      firstname
      lastname
    }
  }
`
