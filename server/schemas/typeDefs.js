const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  firstname: String
  lastname: String
  email: String
  gradeLevel: String
  subject: String
  experiments: [Experiment]
  getStartedPrompts: [String]
}

type Experiment {
  _id: ID
  title: String
  getStartedPrompts: [String]
}


input CreateUserInput {
  firstname: String!
  lastname: String!
  email: String!
  password: String!

}

input CreateExperimentInput {
  _id: ID
}


input UpdateUserInput {
  firstname: String
  lastname: String
  email: String
  password: String
  gradeLevel: String
  subject: String
  getStartedPrompts: [String] 
}

input UpdateExperimentInput {
  title: String
  getStartedPrompts: [String]
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
    updateExperiment(experimentId: ID!, input: UpdateExperimentInput): Experiment
    login(email: String!, password: String!): Auth
    logout: Boolean
    deleteUser(userId: ID!): User
    }
    
  

`;

module.exports = typeDefs;