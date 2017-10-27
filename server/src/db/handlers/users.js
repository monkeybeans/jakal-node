import { UserModel } from '../models';

const flatten = arr => arr.reduce((flat, a) => { return [...flat, ...a]; }, []);

export function getUsers() {
  return UserModel.find();
}

export function getEmailSendList() {
  return UserModel
    .find({}, { emails: 1 })
    .then(addresses => flatten(addresses.map(a => a.emails)));
}
