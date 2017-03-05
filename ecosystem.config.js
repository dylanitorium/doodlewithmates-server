module.exports = {
  apps: [
    {
      name: 'dwms',
      script: './server.babel.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      watch: './',
    },
  ],
};
