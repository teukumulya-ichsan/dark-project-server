const { ApolloServer } = require('apollo-server');

const models = require('./models');

const server = new ApolloServer({
  modules: [require('./Graphql/User')],
  context: { models }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`🚀 Apollo Server start at http://localhost:4000`)
  );
