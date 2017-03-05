import config from '../environment';

const {
  RETHINKDB: {
    HOST,
    PORT,
    DB,
  },
} = config;

export default {
  host: HOST,
  port: PORT,
  db: DB,
};
