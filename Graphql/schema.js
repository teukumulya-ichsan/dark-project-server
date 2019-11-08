import { merge } from 'lodash';
import { typeDef as User, resolvers as userResolvers } from './User';
import { typeDef as Menu, resolvers as menuResolvers } from './Menu';
import { makeExecutableSchema } from 'graphql-tools';

// Untuk Query Standalone
const Query = `
type Query {
_empty: String
  }
`;
const resolvers = {};

// untuk gabungkan semua schema yang di extending
const schema = makeExecutableSchema({
  typeDefs: [Query, User, Menu],
  resolvers: merge(resolvers, userResolvers, menuResolvers)
});

export default schema;
