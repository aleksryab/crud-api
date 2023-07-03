import { ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { UsersList } from '../types';

const deleteUser = (
  users: UsersList,
  id: string | undefined,
  res: ServerResponse,
) => {
  if (!uuidValidate(id ?? '')) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: `Invalid user id: ${id}` }));
    return;
  }

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex > -1) {
    users.splice(userIndex, 1);
    res.statusCode = 204;
    res.end();
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: `User with id ${id} not found` }));
};

export default deleteUser;
