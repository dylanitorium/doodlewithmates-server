const DEV_CLIENT = 'http://localhost:4300/';

const CONFIG = {
  EXPRESS: {
    PORT: 8080,
  },
  MONGO: {
    HOST: '0.0.0.0',
    PORT: '32777',
    PATH: 'dwm',
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
  CONFIG.FB.REDIRECT_URI = 'https://doodlewithmates.xyz/';
  CONFIG.EXPRESS.PORT = 8181;
  CONFIG.MONGO.PORT = 27017;
}

console.log(CONFIG.FB.REDIRECT_URI);

export default CONFIG;
