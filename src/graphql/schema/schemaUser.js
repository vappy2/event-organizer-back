const { buildSchema } = require('graphql');

const SchemaUser = buildSchema (`

    type Query {
        users: [User!]!
    }

    type Mutation {
        addUser(user: UserInput): User!,
        removeUser(email: String!): Boolean!,
        updateUser(email: String!): User!
    }

    input UserInput {
        firstname: String!,
        lastname: String!,
        email: String!,
        password: String!,
    }
   
    type User {
        _id: ID!, 
        firstname: String!,
        lastname: String!,
        email: String!,
        password: String!,
        createdAt: String!,
    }

    schema {
        query: Query,
        mutation: Mutation
    }

`);
module.exports = SchemaUser;
