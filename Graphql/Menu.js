import { gql } from 'apollo-server-express';
import * as models from '../models';

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

export const resolver = {
  Query: {
    //getting all Menu
    menus: async () => {
      return models.Menu.findAll();
    }
  }
};
