const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
import session from 'express-session';
import uuid from 'uuid';
import passport from 'passport';
import { GraphQLLocalStrategy, buildContext } from 'graphql-passport';
import * as models from './models';
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

import schema from './Graphql/schema';

// using session for express
app.use(
  session({
    // uuid to generate a session ID
    genid: req => uuid(),

    // secret is needed to sign the cookie
    secret: process.env.SESSION_SECRET,

    // false cause is deprecated
    resave: false,
    saveUninitialized: false
  })
);

// telling passport using a localStrategy
passport.use(
  new GraphQLLocalStrategy((email, password, done) => {
    models.User.findOne({ where: { email: email } })
      .then(users => {
        if (!users) {
          return done(null, false, { message: 'incorect email' });
        }
        if (!users.password === password) {
          return done(null, false, { message: 'incorrect password' });
        }
        return done(null, users);
      })
      .catch(err => done(err));
  })
);

//  fuction passport seriallizer user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// passport deserializer user
passport.deserializeUser(function(id, done) {
  models.User.findByPk(id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => done(err));
});

//  tell a express to use passport for authentication
app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  // modules: [require('./GraphQL/User')],
  schema: schema,
  // graphQL session Context
  context: ({ req, res }) => buildContext({ req, res })
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: process.env.PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
