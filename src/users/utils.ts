import { IncomingMessage } from 'http';
import { UserBody } from './types';

export const parseUserBody = async (
  req: IncomingMessage,
): Promise<Partial<UserBody>> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error('Bad Request: Invalid JSON'));
      }
    });
  });
};

const isArrayOfString = (arr: unknown): boolean => {
  return Array.isArray(arr) && !arr.some((item) => typeof item !== 'string');
};

const userBodySchema: Record<keyof UserBody, (value: unknown) => boolean> = {
  username: (value: unknown) => typeof value === 'string',
  age: (value: unknown) => typeof value === 'number' && value > 0,
  hobbies: (value: unknown) => isArrayOfString(value),
};

const getInvalidFieldMessage = (field: string) => {
  return `Bad Request: ${field} field is invalid`;
};

export const validateCreateUserBody = (body: Partial<UserBody>): UserBody => {
  (Object.keys(userBodySchema) as Array<keyof UserBody>).forEach((key) => {
    const validator = userBodySchema[key];
    const value = body[key];

    if (!(value && validator(value)))
      throw new Error(getInvalidFieldMessage(key));
  });

  return body as UserBody;
};

export const validateUpdateUserBody = (body: Partial<UserBody>) => {
  const keys = Object.keys(userBodySchema) as Array<keyof UserBody>;

  const validBody = keys.reduce<Partial<UserBody>>((acc, key) => {
    const validator = userBodySchema[key];
    const value = body[key];

    if (value) {
      if (!validator(value)) throw new Error(getInvalidFieldMessage(key));
      return { ...acc, [key]: value };
    }

    return acc;
  }, {});

  return validBody;
};
