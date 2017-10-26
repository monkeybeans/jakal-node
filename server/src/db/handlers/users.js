import { UserModel } from '../models';

function getUsers() {
  return UserModel.find();
}

export {
  getUsers,
}
