// language=GraphQL
const schema = `
  type Channel {
    name: String!
    user: User!
  }
  
  extend type Query {
    channels: [Channel]!
  }
  extend type Mutation {
    createChannel(name: String!): Channel
    deleteChannel(name: String!): Channel
  }
`;

export default schema;