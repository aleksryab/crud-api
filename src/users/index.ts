import { IncomingMessage, ServerResponse } from 'http';
import { UsersList } from './types';
import getAllUsers from './getAllUsers';
import notAllowedMethod from './notAllowedMethod';
import getUserById from './getUserById';

const users: UsersList = [
  { id: '111', age: 11, username: 'John', hobbies: ['tv', 'games'] },
  { id: '222', age: 22, username: 'Bob', hobbies: ['games'] },
  { id: '333', age: 33, username: 'Alex', hobbies: ['tv', 'games', 'books'] },
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

    default:
      notAllowedMethod(req, res);
      break;
  }
};

export default usersApi;
