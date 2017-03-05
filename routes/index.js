import express, { Router } from 'express';
import * as users from './users';
import * as auth from './auth';

export default (app) => {
  const router = new Router();

  // Auth
  // =====
  router.post('/api/login', auth.login);

  // User
  // =====
  // router.route('/api/users/');
  app.use(router);
};
