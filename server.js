var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');


//construct schema
var schema = buildSchema(`
type Name {
    name: String
}
type Query {
    repository(owner: "gemmiedodger" name: "boathook"): Name
    getMessage(id: ID!): Message
`);


var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running graphql api server at http://localhost:4000/graphql');
