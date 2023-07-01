import { ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { UsersList } from './types';

const getUserById = (users: UsersList, id: string, res: ServerResponse) => {
  if (!uuidValidate(id)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: `Invalid user id: ${id}` }));
    return;
  }

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
