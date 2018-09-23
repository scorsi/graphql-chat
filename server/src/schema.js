import {merge} from 'lodash';
import {makeExecutableSchema} from 'graphql-tools';

import userResolver from './models/user/resolver';
import channelResolver from './models/channel/resolver';
import userSchema from './models/user/schema';
import channelSchema from './models/channel/schema';

// language=GraphQL
const rootSchema = `
  type Query {
    version: String!
  }
  type Mutation {
    _version: String!
  }
  
  schema {
    query: Query
    mutation: Mutation
  }
`;

const rootResolver = {
  Query: {
    version: () => '0.0.1'
  },
  Mutation: {
    _version: () => '0.0.1'
  }
};

const typeDefs = [rootSchema, userSchema, channelSchema];
const resolvers = merge([rootResolver, userResolver, channelResolver]);

export default makeExecutableSchema({typeDefs, resolvers});