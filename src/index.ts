import { availableParallelism } from 'node:os';
import cluster from 'node:cluster';
import { server, balancerServer, workerServer } from './servers';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

const isBalancer = process.env.BALANCER_MODE === 'multi';
const numCPUs = availableParallelism();

if (cluster.isPrimary && isBalancer) {
  let currentPort = Number(PORT);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ clusterPort: currentPort });
    currentPort += 1;
  }

  cluster.on('fork', (worker) => {
    worker.on('message', (msg) => {
      const workers = cluster.workers;
      if (workers) {
        Object.keys(workers).forEach((id) => workers[id]?.send(msg));
      }
    });
  });

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else if (isBalancer) {
  const workerPort = process.env.clusterPort;

  if (workerPort === PORT) {
    balancerServer(Number(PORT), numCPUs - 1);
  } else {
    if (workerPort) workerServer(workerPort);
  }
} else {
  server.listen(PORT, () =>
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Server started on http://localhost:${PORT}/`,
    ),
  );
}
