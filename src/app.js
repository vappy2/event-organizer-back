const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchemaUser = require('./src/graphql/schema/schemaUser');
const graphqlSchemaEvent = require('./src/graphql/schema/schemaEvent');
const graphqlResolversEvent = require('./src/graphql/resolvers/resolversEvent');
const graphqlResolversUser = require('./src/graphql/resolvers/resolversUser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(
    "/event",
    graphqlHTTP({
        schema: graphqlSchemaEvent,
        rootValue: graphqlResolversEvent,
        graphiql: true,
    }),
    "/user",
    graphqlHTTP({
        schema: graphqlSchemaUser,
        rootValue: graphqlResolversUser,
        graphiql: true,
    }),
);

const uri = ""

const options = { useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(uri, options)
.then(()=> app.listen(3001, console.log('Server ok')))
.catch(error => {throw error})