import { ServerResponse } from 'http';

const notFound = (res: ServerResponse) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Endpoint not found' }));
};

export default notFound;
