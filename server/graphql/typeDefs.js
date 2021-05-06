const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    getUserLogs: [Logs]
    getAllUsers: [User]
    getUser(userId: ID!): [User]
  }
  type User {
    id: ID!
    email: String!
    token: String!
    name: String!
    role: String!
    createdAt: String!
  }
  
  type Logs {
    id: ID!
    phoneNumber: String!
    text: String!
    user: String!
    createdAt: String!
  }
  input userInput {
    name: String!
    email: String!
    password: String!
    role: String
    confirmPassword: String!
  }
  input Paginate{
    offset: Int
    limit: Int
  }
  
  input userInputUpdate {
    name: String!
    email: String!
    password: String!
    role: String
  }
  type Mutation {
    signUp(registerInput: userInput): User!
    login(email: String!, password: String!): User!
    createLog(phoneNumber: String!, text: String!): Logs!
    updateUser(_id: ID!, input: userInputUpdate): User!
  }
`;
