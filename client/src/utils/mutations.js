import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      user {
        _id
        email
        firstname
        lastname
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstname
        lastname
      }
    }
  }
  `

  export const LOGOUT_USER = gql `
mutation logout {
  logout
}
`;

export const UPDATE_USER = gql`
mutation updateUser($userId: ID!, $input: UpdateUserInput!) {
    updateUser(userId: $userId, input: $input) {
      _id
      email
      firstname
      lastname
      gradeLevel
      subject
    }
  }
`

