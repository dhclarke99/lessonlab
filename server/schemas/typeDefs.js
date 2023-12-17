const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  firstname: String
  lastname: String
  email: String
  gradeLevel: String
  subject: String
}


input CreateUserInput {
  firstname: String!
  lastname: String!
  email: String!
  password: String!

}


input UpdateUserInput {
  firstname: String
  lastname: String
  email: String
  password: String
  gradeLevel: String
  subject: String
}

type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: String!): User
    me: User
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    updateUser(userId: ID!, input: UpdateUserInput!): User
    login(email: String!, password: String!): Auth
    logout: Boolean
    deleteUser(userId: ID!): User
    }
    
  

`;

module.exports = typeDefs;