// Allows us to use babel on the server
import 'babel-polyfill';
import express from 'express';

import config from './config/environment';
import {
  createDbConnection,
  closeDbConnection,
} from './middleware/database';
import middlewareConfig from './middleware';
import routerConfig from './routes';

const {
  EXPRESS: {
    PORT,
  },
} = config;

// Server Config
// =============
const app = express();
const port = PORT;

// Open DB Connection
// =================
app.use(createDbConnection);

app.use((req, res, next) => {
  console.log(req.body);
  next();
});

// Middleware
// =================
middlewareConfig(app);

// Router
// ======
routerConfig(app);

// Start Server
// ============
app.listen(port, (error) => {
  if (error) {
    console.error(error); // eslint-disable-line no-console
  } else {
    console.info('----------'); // eslint-disable-line no-console
    console.info(`Doodle With Mates Server listening on port ${port}.`); // eslint-disable-line no-console
    console.info('==========');// eslint-disable-line no-console
  }
});


app.use(closeDbConnection);
