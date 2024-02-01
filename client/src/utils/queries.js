import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
query getUserById($userId: String!) {
  user(id: $userId) {
    _id
    email
    firstname
    lastname
    gradeLevel
    subject
    experiments {
      experiment {
        title
        _id
        getStartedPrompts
        conversation
        createdAt
        updatedAt
      }
    }
  }
}
`
