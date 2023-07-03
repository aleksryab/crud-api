import { IncomingMessage, ServerResponse } from 'http';

import { UsersList } from './types';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  notAllowedMethod,
} from './actions';

const usersApi = async (
  users: UsersList,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  res.setHeader('Content-Type', 'application/json');
  const userId = req.url?.split('/')[3];

  switch (req.method) {
    case 'GET':
      if (userId) {
        getUserById(users, userId, res);
      } else {
        getAllUsers(users, res);
      }
      break;
    case 'POST':
      await createUser(users, req, res);
      break;
    case 'PUT':
      await updateUser(users, userId, req, res);
      break;
    case 'DELETE':
      deleteUser(users, userId, res);
      break;

    default:
      notAllowedMethod(req, res);
      break;
  }
};

export default usersApi;
