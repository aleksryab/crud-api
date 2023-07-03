# CRUD API

## Description

Simple CRUD API using in-memory database underneath.
Application can work in horizontal scaling mode, that starts multiple instances of application using the Node.js `Cluster` API (equal to the number of available parallelism - 1 on the host machine, each listening on port PORT + n) with a **load balancer** that distributes requests across them (using Round-robin algorithm).

### Endpoint `api/users`:

- **GET** `api/users` is used to get all persons
  - Server answer with `status code` **200** and all users records
- **GET** `api/users/{userId}`
  - Server answer with `status code` **200** and record with `id === userId` if it exists
  - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **POST** `api/users` is used to create record about new user and store it in database
  - Server answer with `status code` **201** and newly created record
  - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
- **PUT** `api/users/{userId}` is used to update existing user
  - Server answer with` status code` **200** and updated record
  - Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
- **DELETE** `api/users/{userId}` is used to delete existing user from database
  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

## Installation

```bash
git clone https://github.com/aleksryab/crud-api.git
cd crud-api
npm install
```

## Running the app

```bash
# development mode and watch
npm run start:dev

# development mode with balancer and watch
npm run start:multi

## build (webpack)
npm run build

# production mode (webpack) and watch
npm run start:prod

# production mode with balancer (webpack) and watch
npm run start:prod:multi

```
