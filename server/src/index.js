import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import schema, {User} from './models';


const app = express();

new ApolloServer({
  schema,
  context: async ({req}) => {
    const authorizationHeader = req.headers.authorization || '';
    if (_.startsWith(authorizationHeader, 'Bearer ')) {
      const token = authorizationHeader.substring(7);
      const user = await User.findOne({username: jwt.decode(token).username});
      console.log({auth: {token, user}});
      return {auth: {token, user}};
    }
    console.log({auth: null});
    return {auth: null};
  },
}).applyMiddleware({app});

mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/main')
  .then(() => {
    console.log('✅  Successfully connected to MongoDB');
  });
mongoose.connection.on('error', console.error.bind(console, '🔴  MongoDB connection error:'));

app.listen({port: 4000}, () => {
    console.log('✅  Server ready at http://localhost:4000');
    console.log('➡️  GraphQL at http://localhost:4000/graphql');
    console.log('➡️  Subscription at http://localhost:4000/ws');
  }
);

// require('./test');