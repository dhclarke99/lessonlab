const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  firstname: String
  lastname: String
  email: String
  gradeLevel: String
  subject: String
  experiments: [ExperimentForUser]
  getStartedPrompts: [String]
}

type ExperimentForUser {
  experiment: Experiment
}
type Experiment {
  _id: ID
  title: String
  getStartedPrompts: [String]
  conversation: [String]
  createdAt: String
    updatedAt: String    
}


input CreateUserInput {
  firstname: String!
  lastname: String!
  email: String!
  password: String!

}

input CreateExperimentInput {
  title: String!
}


input UpdateUserInput {
  firstname: String
  lastname: String
  email: String
  password: String
  gradeLevel: String
  subject: String
  experiments: [String]
  getStartedPrompts: [String] 
}

input UpdateExperimentInput {
  title: String
  getStartedPrompts: [String]
  conversation: [String]
}

type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    experiments: [Experiment]
    user(id: String!): User
    experiment(id: String!): Experiment
    me: User
  }

  type Mutation {
    createUser(input: CreateUserInput!): Auth
    createExperiment(input: CreateExperimentInput!): Experiment
    updateUser(userId: ID!, input: UpdateUserInput!): User
    updateExperiment(experimentId: ID!, input: UpdateExperimentInput): Experiment
    login(email: String!, password: String!): Auth
    logout: Boolean
    deleteUser(userId: ID!): User
    deleteExperiment(experimentId: ID!, userId: ID!): Experiment
    }
    
  

`;

module.exports = typeDefs;