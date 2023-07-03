import { UsersList } from './users/types';

export interface DataBase {
  users: UsersList;
}
const dataBase: DataBase = { users: [] };

export default dataBase;
