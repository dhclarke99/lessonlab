const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  firstname: String
  lastname: String
  email: String
}


input CreateUserInput {
  firstname: String!
  lastname: String!
  email: String!
  password: String!

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
   
    }
    
  

`;

module.exports = typeDefs;