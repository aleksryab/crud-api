import { createServer } from 'node:http';

export const server = createServer((_, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      data: 'Hi from server!',
    }),
  );
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
