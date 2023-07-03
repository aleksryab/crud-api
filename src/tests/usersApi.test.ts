import request from 'supertest';
import { server } from '../servers';

const apiPath = '/api/users/';

const testUser = {
  username: 'Alex',
  age: 30,
  hobbies: ['games', 'movies', 'books'],
};

const userUpdate = {
  username: 'Rick',
  age: 70,
  hobbies: ['science'],
};

let userId = '';

describe('Test scenario #1: valid requests', () => {
  afterAll(() => {
    server.close();
  });

  test('GET api/users request should return empty array with status 200', async () => {
    const response = await request(server).get(apiPath);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST api/users request should return created new user object with status 201', async () => {
    const response = await request(server)
      .post(apiPath)
      .send(JSON.stringify(testUser));

    userId = response.body.id;

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: userId, ...testUser });
  });

  test('GET api/user/{userId} request should return user by id with status 200', async () => {
    const response = await request(server).get(apiPath + userId);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: userId, ...testUser });
  });

  test('PUT api/users/{userId} request should update user by id and return it with status 200', async () => {
    const response = await request(server)
      .put(apiPath + userId)
      .send(JSON.stringify(userUpdate));

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: userId, ...userUpdate });
  });

  test('DELETE api/users/{userId} request should delete user by id and return status 204', async () => {
    const response = await request(server).delete(apiPath + userId);
    expect(response.status).toBe(204);
  });

  test('GET api/users/{userId} request deleted user should return status 404 and message', async () => {
    const response = await request(server).get(apiPath + userId);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`User with id ${userId} not found`);
  });
});

describe('Test scenario #2: Bad Request (invalid data)', () => {
  afterAll(() => {
    server.close();
  });

  test('GET request with invalid id should return status 400 and message', async () => {
    const invalidId = 'mayBeId';
    const response = await request(server).get(apiPath + invalidId);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid user id: ${invalidId}`);
  });

  test('PUT request with invalid id should return status 400 and message', async () => {
    const invalidId = 'mayBeId';
    const response = await request(server)
      .put(apiPath + invalidId)
      .send(testUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid user id: ${invalidId}`);
  });

  test('DELETE request with invalid id should return status 400 and message', async () => {
    const invalidId = 'mayBeId';
    const response = await request(server).delete(apiPath + invalidId);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(`Invalid user id: ${invalidId}`);
  });

  test('POST request with invalid username field should return status 400 and message', async () => {
    const invalidUsers = [
      { age: 21, hobbies: [] },
      { ...testUser, username: 123 },
      { ...testUser, username: null },
      { ...testUser, username: '' },
    ];

    for (const user of invalidUsers) {
      const response = await request(server).post(apiPath).send(user);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        'Bad Request: username field is invalid',
      );
    }
  });

  test('POST request with invalid age field should return status 400 and message', async () => {
    const invalidUsers = [
      { username: 'Bob', hobbies: [] },
      { ...testUser, age: -123 },
      { ...testUser, age: null },
      { ...testUser, age: '22' },
    ];

    for (const user of invalidUsers) {
      const response = await request(server).post(apiPath).send(user);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Bad Request: age field is invalid');
    }
  });

  test('POST request with invalid hobbies field should return status 400 and message', async () => {
    const invalidUsers = [
      { username: 'Bob', age: 33 },
      { ...testUser, hobbies: [333, []] },
      { ...testUser, hobbies: null },
      { ...testUser, hobbies: '22' },
    ];

    for (const user of invalidUsers) {
      const response = await request(server).post(apiPath).send(user);
      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        'Bad Request: hobbies field is invalid',
      );
    }
  });

  test('Request with invalid JSON should return status 400 and message', async () => {
    const response = await request(server).post(apiPath);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Bad Request: Invalid JSON');
  });
});

describe('Test scenario #3: Not Found', () => {
  afterAll(() => {
    server.close();
  });

  const testId = '40f81dab-1218-4100-b4c3-20c138d2da82';

  test('Request to non-exist endpoints should return status 404 and message', async () => {
    const testEndPoints = [
      '/non/exist/endpoint',
      '/api',
      '/api/user',
      '/api/userss',
      '/api/users/some/more',
    ];

    for (const endpoint of testEndPoints) {
      const response = await request(server).get(endpoint);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Endpoint not found');
    }
  });

  test('GET request with non-existing id should return status 404 and message', async () => {
    const response = await request(server).get(apiPath + testId);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`User with id ${testId} not found`);
  });

  test('PUT request with non-existing id should return status 404 and message', async () => {
    const response = await request(server)
      .put(apiPath + testId)
      .send(userUpdate);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`User with id ${testId} not found`);
  });

  test('DELETE request with non-existing id should return status 404 and message', async () => {
    const response = await request(server).delete(apiPath + testId);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`User with id ${testId} not found`);
  });

  test('Server should handle not allowed method', async () => {
    const response = await request(server).patch(apiPath);
    expect(response.status).toBe(405);
    expect(response.body.message).toBe('Users API not allowed PATCH method');
  });
});
