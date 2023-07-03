import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { UsersList } from '../types';
import { parseUserBody, validateUpdateUserBody } from '../utils';

const updateUser = async (
  users: UsersList,
  id: string | undefined,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  if (!uuidValidate(id ?? '')) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: `Invalid user id: ${id}` }));
    return;
  }

  const userIndex = users.findIndex((user) => user.id === id);
  const userForUpdate = users[userIndex];

  if (userForUpdate) {
    try {
      const body = await parseUserBody(req);
      const validBody = validateUpdateUserBody(body);

      const updatedUser = { ...userForUpdate, ...validBody };
      users[userIndex] = updatedUser;

      res.statusCode = 200;
      res.end(JSON.stringify(updatedUser));
    } catch (err) {
      res.statusCode = 400;
      if (err instanceof Error)
        res.end(JSON.stringify({ message: err.message }));
    }

    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ message: `User with id ${id} not found` }));
};

export default updateUser;
