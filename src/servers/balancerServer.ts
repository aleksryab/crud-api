import { RequestOptions, createServer, request } from 'http';

const balancerServer = (balancerPort: number, workersCount: number) => {
  let counter = 0;

  const balancerServer = createServer((balancerReq, balancerRes) => {
    const workerPort = (counter % workersCount) + balancerPort + 1;

    const options: RequestOptions = {
      port: workerPort,
      path: balancerReq.url,
      method: balancerReq.method,
      headers: balancerReq.headers,
    };

    const workerReq = request(options, (workerRes) => {
      const statusCode = workerRes.statusCode ?? 400;
      balancerRes.writeHead(statusCode, workerRes.headers);
      workerRes.pipe(balancerRes);
    });

    balancerReq.pipe(workerReq);
    counter += 1;
  });

  balancerServer.listen(balancerPort, () => {
    console.log(
      '\x1b[35m%s\x1b[0m',
      `Process #${process.pid} started Balancer Server on http://localhost:${balancerPort}/`,
    );
  });
};

export default balancerServer;
