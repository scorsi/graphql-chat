import {merge} from 'lodash';
import {makeExecutableSchema} from 'graphql-tools';

import userResolver from './models/user/resolver';
import userSchema from './models/user/schema';

// language=GraphQL
const rootSchema = `
  schema {
    query: Query
    mutation: Mutation
  }
`;


const typeDefs = [rootSchema, userSchema];
const resolvers = merge([userResolver]);

export default makeExecutableSchema({typeDefs, resolvers});