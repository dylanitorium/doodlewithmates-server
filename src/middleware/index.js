import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import session from './session';

export default (app) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(session);
};
