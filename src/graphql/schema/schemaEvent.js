const { buildSchema } = require('graphql');

const SchemaEvent = buildSchema (`

    type Query {
        events: [Event!]!,
        event(title: String!): Event!, 
    }

    type Mutation {
        addEvent(event: EventInput): Event!,
        removeEvent(title: String!): Boolean!,
        updateEvent(title: String!): Event!
    }

    input EventInput {
        title: String!,
        description: String!,
        category: String!,
        date: String!,
        nbPeoples: String!,
        emailCreator: String!,
    }
   
    type Event {
        _id: ID!, 
        title: String!,
        description: String!,
        category: String!,
        date: String!,
        nbPeoples: String!,
        emailCreator: String!,
        createdAt: String!,
    }

    schema {
        query: Query,
        mutation: Mutation
    }

`);
module.exports = SchemaEvent;
