import { gql } from 'apollo-server-express';
import * as models from '../models';

// import uuid from 'uuid/v4';

export const typeDef = gql`
  extend type Query {
    menus: [Menu!]!
  }

  type Menu {
    id: ID!
    name: String!
    description: String
    price: Int!
  }
`;

export const resolvers = {
  Query: {
    // getting all Users
    menus: async () => {
      return models.Menu.findAll();
    }
  }
};
