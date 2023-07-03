import db, { DataBase } from '../dataBase';
import server from './server';

const workerServer = (workerPort: string | number) => {
  server.on('request', () => console.log(`Request to port: ${workerPort}`));

  server.listen(workerPort, () => {
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Process #${process.pid} started Server on http://localhost:${workerPort}/`,
    );
  });

  process.on('message', (msg: DataBase) => {
    if (msg.users) db.users = msg.users;
  });
};

export default workerServer;
