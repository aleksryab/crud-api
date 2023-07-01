import { IncomingMessage, ServerResponse } from 'http';
import { validate as uuidValidate } from 'uuid';
import { UserBody } from './types';

export const parseUserBody = async (
  req: IncomingMessage,
): Promise<UserBody> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Invalid JSON for body'));
      }
    });
  });
};

const isArrayOfString = (arr: unknown): boolean => {
  return Array.isArray(arr) && !arr.some((item) => typeof item !== 'string');
};

export const validateUserBody = (body: UserBody) => {
  const { username, age, hobbies } = body;

  if (!(username && typeof username === 'string')) {
    throw new Error('Username field is invalid');
  }

  if (!(typeof age === 'number' && age > 0)) {
    throw new Error('Age field is invalid');
  }

  if (!isArrayOfString(hobbies)) {
    throw new Error('Hobbies field is invalid');
  }
};

export const validateUserId = (
  userId: string,
  res: ServerResponse,
  callback: () => void,
) => {
  if (uuidValidate(userId)) {
    callback();
  } else {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: `Invalid user id: ${userId}` }));
  }
};
