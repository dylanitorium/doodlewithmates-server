import session from 'express-session';
import config from '../config/environment';

const sessionConfig = session({
  resave: false,
  saveUninitialized: true,
  secret: config.SESSION.SECRET,
});

export const ioSession = ({ request }, next) => {
  sessionConfig(request, request.res, next);
};

export default sessionConfig;
