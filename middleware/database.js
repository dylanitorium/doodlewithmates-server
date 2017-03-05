import rethinkdb from 'rethinkdb';

import config from '../config/rethinkdb/config';

export const createDbConnection = (req, res, next) => {
  rethinkdb.connect(config, (error, connection) => {
    if (error) {
      next(error);
    } else {
      req.dbConn = connection;
      next();
    }
  });
};

export const closeDbConnection = (req, res, next) => {
  req.dbConn.close();
  next();
};
