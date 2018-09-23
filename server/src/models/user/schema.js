// language=GraphQL
const schema = `
  type User {
    username: String!
    email: String!
  }
  type RegisterPayload {
    username: String!
    email: String!
  }
  type AuthenticationPayload {
    username: String!
    email: String!
    token: String!
  }
  
  
  extend type Query {
    users: [User]! 
  }
  extend type Mutation {
    register(username: String!, email: String!, password: String!): RegisterPayload
    authenticate(username: String!, password: String!): AuthenticationPayload
  }
`;

export default schema;