import { ServerResponse } from 'http';
import { UsersList } from './types';

const getUserById = (users: UsersList, id: string, res: ServerResponse) => {
  const searchedUser = users.find((user) => user.id === id);

  if (searchedUser) {
    res.statusCode = 200;
    res.end(JSON.stringify(searchedUser));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: `User with id ${id} not found` }));
};

export default getUserById;
