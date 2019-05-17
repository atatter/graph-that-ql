const express = require('express');
const graphqlInit = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

app.use('/graphql', graphqlInit({
    schema,
    graphiql: true,
}));

app.listen(8080, () => console.log('Listening on 8080'));