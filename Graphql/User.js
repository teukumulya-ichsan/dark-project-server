import { gql } from 'apollo-server-express';
import * as models from '../models';
const brcypt = require('bcryptjs');

// import uuid from 'uuid/v4';

export const typeDefs = gql`
  # tipe Return Auth Data setelah Login
  type AuthPayload {
    user: User
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
    currentUser: User
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    register(name: String!, email: String!, password: String!): AuthPayload
    logout: Boolean
  }
`;

export const resolvers = {
  Query: {
    // getting all Users
    users: async () => {
      return models.User.findAll();
    },

    // getting user by Id
    user: async (root, { id }) => {
      return models.User.findByPk(id);
    },

    // getting current users who login
    currentUser: async (parent, args, context) => context.req.user
  },

  Mutation: {
    // register
    register: async (parent, { name, email, password }, context) => {
      // checking user exists with email
      const userExistWithEmail = await models.User.findOne({
        where: {
          email: email
        }
      });

      // error handling if email is exists
      if (userExistWithEmail) {
        throw new Error('User sudah terdaftar');
      }
      const newUser = models.User.create({
        // id: uuid(),
        name: name,
        email: email,
        password: await brcypt.hash(password, 10)
      });

      // save user session to context
      context.login(newUser);

      return { user: newUser };
    },

    // Login
    login: async (parent, { email, password }, context) => {
      // check email is registered
      const users = await models.User.findOne({
        where: {
          email: email
        }
      });

      // handle error if email is not registered
      if (!users) {
        throw new Error('Email tidak terdaftar');
      }

      // comparing password with hashed password
      const isMatch = await brcypt.compare(password, users.password);

      // handle Error if password is not match
      if (!isMatch) {
        throw new Error('Password is Incorect');
      }

      // passport authenticate
      await context.authenticate('graphql-local', {
        email,
        password
      });

      // save user session to context
      context.login(users);

      return { user: users };
    },

    // logout of user with signIn into session
    logout: async (parent, args, context) => context.logout()
  }
};
