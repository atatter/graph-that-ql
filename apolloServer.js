const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const { schema, resolvers } = require('./schema/apolloSchema');

mongoose.connect('mongodb://localhost/graphthatql');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

const app = express();

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(8080, () => {
    console.log('Server running on port 8080');
});