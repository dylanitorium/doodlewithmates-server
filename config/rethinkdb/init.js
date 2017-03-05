import r from 'rethinkdb';
import async from 'async';

import config from './config';
import {
  tables,
  tablesWithIndex,
} from './tables';

const handleRun = (conn, next) => (
  (runError, res) => {
    conn.close();
    next(runError, res);
  }
);

const createDb = (next) => {
  r.connect(config, (err, conn) => {
    r.dbCreate(config.db).run(conn, handleRun(conn, next));
  });
};

const createTable = (name, next) => {
  r.connect(config, (err, conn) => {
    r.tableCreate(name).run(conn, handleRun(conn, next));
  });
};

const createTables = next => (async.map(tables, createTable, next));

const createIndex = ({ table, index }, next) => {
  r.connect(config, (err, conn) => {
    r.table(table).indexCreate(index).run(conn, handleRun(conn, next));
  });
};

const createIndexes = next => (async.map(tablesWithIndex, createIndex, next));

async.series({
  created: createDb,
  tables: createTables,
  indexes: createIndexes,
}, (error, res) => {
  console.log(error);
  console.log('============');
  console.log(res);
  console.log('============');
});
