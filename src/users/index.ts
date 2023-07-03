import { IncomingMessage, ServerResponse } from 'http';
import getAllUsers from './getAllUsers';
import getUserById from './getUserById';
import createUser from './createUser';
import updateUser from './updateUser';
import deleteUser from './deleteUser';
import notAllowedMethod from './notAllowedMethod';
import { UsersList } from './types';

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
