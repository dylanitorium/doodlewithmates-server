const DEV_CLIENT = 'http://localhost:4300/';

const CONFIG = {
  EXPRESS: {
    PORT: 8080,
  },
  RETHINKDB: {
    HOST: '0.0.0.0',
    PORT: 32775,
    DB: 'dwm',
  },
  FB: {
    APP_ID: '742896385870748',
    APP_SECRET: '8a1ff8b1ce652e8e25a64489bab08b19',
    REDIRECT_URI: DEV_CLIENT,
  },
  JWT: {
    SECRET: 'dead_salt',
  },
  SESSION: {
    SECRET: 'dead_salt',
  },
};

if (process.env.NODE_ENV === 'production') {
  // ...
}

export default CONFIG;
