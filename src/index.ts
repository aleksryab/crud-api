import { createServer } from 'node:http';
import usersApi from './users';
import { usersRouteRegExp } from './constants';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

export const server = createServer((req, res) => {
  if (usersRouteRegExp.test(req.url ?? '')) {
    usersApi(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Endpoint not found' }));
  }
});

server.listen(PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server running on http://localhost:${PORT}/`,
  );
});

server.on('error', (err) => {
  console.log(err.message);
});
