/* eslint-disable no-param-reassign */
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import constants from './settings';
import { decodeToken } from '../services/auth';

async function auth(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (token != null && token !== 'null') {
      const user = await decodeToken(token);
      req.user = user;
    } else {
      req.user = null;
    }
    return next();
  } catch (error) {
    throw error;
  }
}

const corsOptions = {
  credentials: true,
};

export default (app, typeDefs, resolvers) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(auth);
  app.use(cors(corsOptions));
  app.use(
    constants.graphiQLPath,
    graphiqlExpress({
      endpointURL: constants.graphQLPath,
    }),
  );
  app.use(
    constants.graphQLPath,
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user,
      },
    })),
  );
};
