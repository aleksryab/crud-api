import { createServer } from 'http';
import { notFound, serverError } from '../errors';
import db from '../dataBase';
import usersApi from '../users';
import { usersRouteRegExp } from '../constants';

const isBalancer = process.env.BALANCER_MODE === 'multi';

const server = createServer(async (req, res) => {
  req.on('error', () => serverError(res));

  if (usersRouteRegExp.test(req.url ?? '')) {
    await usersApi(db.users, req, res);
    if (process.send && isBalancer) process.send(db);
  } else {
    notFound(res);
  }
});

export default server;
