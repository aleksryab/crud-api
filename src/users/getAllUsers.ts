import { ServerResponse } from 'http';
import { UsersList } from './types';

const getAllUsers = (users: UsersList, res: ServerResponse) => {
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};

export default getAllUsers;
