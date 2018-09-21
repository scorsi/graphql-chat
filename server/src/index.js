import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import mongoose from "mongoose";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({typeDefs, resolvers});

const app = express();
server.applyMiddleware({app});

app.listen({port: 4000}, () => {
    console.log(`✅  Server ready at http://localhost:4000`);
    console.log(`➡️  GraphQL at http://localhost:4000/graphql`);
    console.log(`➡️  Subscription at http://localhost:4000/ws`);

    mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/main')
      .then(() => {
        console.log("✅  Successfully connected to MongoDB");
      });
    mongoose.connection.on('error', console.error.bind(console, '🔴  MongoDB connection error:'));
  }
);