import { gql } from 'apollo-server-express';
import * as models from '../models';
const brcypt = require('bcryptjs');

export const typeDefs = gql`
  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    register(input: RegisterInput): User!
    login(input: LoginInput): User!
  }
`;

export const resolvers = {
  Query: {
    async users(root, args, { models }) {
      return models.User.findAll();
    },
    // async user(root, { id }, { models }) {
    async user(root, { id }, { models }) {
      return models.User.findByPk(id);
    }
  },
  Mutation: {
    async register(root, { input: RegisterInput }, { models }) {
      return models.User.findOne({
        where: { email: RegisterInput.email }
      })
        .then(async user => {
          if (user) {
            throw new Error('User exists already');
          } else {
            return models.User.create({
              name: RegisterInput.name,
              email: RegisterInput.email,
              password: await brcypt.hash(RegisterInput.password, 10)
            });
          }
        })
        .catch(err => {
          throw err;
        });
    },
    async login(root, { input: LoginInput }, { models }) {}
  }
};
