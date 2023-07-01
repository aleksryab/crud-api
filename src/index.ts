import { createServer } from 'node:http';
import usersApi from './users';
import { notFound, serverError } from './errors';
import { usersRouteRegExp } from './constants';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

const server = createServer((req, res) => {
  req.on('error', () => serverError(res));

  if (usersRouteRegExp.test(req.url ?? '')) {
    usersApi(req, res);
  } else {
    notFound(res);
  }
});

server.listen(PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server running on http://localhost:${PORT}/`,
  );
});
