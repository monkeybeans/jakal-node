import connect, { UserModel } from '../models';
import users from './users';
import log from '../../lib/logger';

export default function seed() {
  const connection = connect();

  UserModel
  .remove()
  .then(() => UserModel.insertMany(users))
  .then(() => log(`Inserted ${users.length} user(s)`))
  .catch(e => { throw e; })
  .then(() => connection.close());
}
