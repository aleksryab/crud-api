import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { UsersList } from '../types';
import { parseUserBody, validateCreateUserBody } from '../utils';

const createUser = async (
  users: UsersList,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const body = await parseUserBody(req);
    const validBody = validateCreateUserBody(body);

    const { username, age, hobbies } = validBody;
    const newUser = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);

    res.statusCode = 201;
    res.end(JSON.stringify(newUser));
  } catch (err) {
    res.statusCode = 400;
    if (err instanceof Error) res.end(JSON.stringify({ message: err.message }));
  }
};

export default createUser;
