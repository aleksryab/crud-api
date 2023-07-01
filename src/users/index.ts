import { IncomingMessage, ServerResponse } from 'http';
import { UsersList } from './types';
import getAllUsers from './getAllUsers';
import notAllowedMethod from './notAllowedMethod';
import getUserById from './getUserById';
import createUser from './createUser';

const users: UsersList = [
  { id: '111', username: 'John', age: 11, hobbies: ['tv', 'games'] },
  { id: '222', username: 'Bob', age: 22, hobbies: ['games'] },
  { id: '333', username: 'Alex', age: 33, hobbies: ['tv', 'games', 'books'] },
];

const usersApi = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.url);
  const userId = req.url?.split('/')[3];
  console.log(userId);

  switch (req.method) {
    case 'GET':
      if (userId) {
        getUserById(users, userId, res);
      } else {
        getAllUsers(users, res);
      }
      break;
    case 'POST':
      createUser(users, req, res);
      break;

    default:
      notAllowedMethod(req, res);
      break;
  }
};

export default usersApi;
