import { IncomingMessage, ServerResponse } from 'http';

const notAllowedMethod = (req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 405;
  res.end(
    JSON.stringify({
      message: `Users API not allowed ${req.method} method`,
    }),
  );
};

export default notAllowedMethod;
