import { gql } from 'apollo-server-express';
import * as models from '../models';

export const typeDefs = gql`
  # type input untuk data register

  type Menu {
    id: ID!
    name: String!
    description: String
    price: Int
  }

  type Query {
    Menus: [Menu!]!
  }
`;

export const resolver = {
  Query: {
    //getting all Menu
    Menus: async () => {
      return models.Menu.findAll();
    }
  }
};
