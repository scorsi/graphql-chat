import express from 'express';
import http from 'http';
import {ApolloServer} from 'apollo-server-express';
import mongoose from 'mongoose';
import {startsWith} from 'lodash';

import {authenticateByToken} from './models/user/controller';
import schema from './schema';


const expressApp = express();
const httpServer = http.createServer(expressApp);

const apolloServer = new ApolloServer({
  schema,
  tracing: true,
  context: async ({req, connection}) => {
    if (connection) {
      return {};
    } else {
      const authorizationHeader = req.headers.authorization || '';
      if (startsWith(authorizationHeader, 'Bearer ')) {
        const token = authorizationHeader.substring(7);
        const user = await authenticateByToken(token);
        if (user === null) throw new Error('Unauthorized');
        return {auth: {token, user}};
      }
      return {auth: undefined};
    }
  },
  subscriptions: {
    onConnect: async ({token}) => {
      const user = await authenticateByToken(token);
      if (user === null) throw new Error('Unauthorized');
      return {auth: {token, user}};
    }
  }
});

apolloServer.applyMiddleware({app: expressApp});
apolloServer.installSubscriptionHandlers(httpServer);

mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/main')
  .then(() => {
    console.log('✅  Successfully connected to MongoDB');
  });
mongoose.connection.on('error', console.error.bind(console, '🔴  MongoDB connection error:'));

const port = 4000;

httpServer.listen(port, () => {
    console.log(`✅  Server listening on port ${port}`);
    console.log(`➡️  GraphQL at http://localhost:${port}${apolloServer.graphqlPath}`);
    console.log(`➡️  Subscription at ws://localhost:${port}${apolloServer.subscriptionsPath}`);
  }
);

// require('./test');