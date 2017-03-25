module.exports = {
  apps: [
    {
      name: 'dwms',
      script: './build/server.js',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      watch: true,
    },
  ],
};
