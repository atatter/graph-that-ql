const express       = require('express');
const graphqlInit   = require('express-graphql');
const mongoose      = require('mongoose');
const schema        = require('./schema/schema');

const app = express();

mongoose.connect('mongodb://localhost/graphthatql');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

app.use('/graphql', graphqlInit({
    schema,
    graphiql: true,
}));

app.listen(8080, () => console.log('Listening on 8080'));