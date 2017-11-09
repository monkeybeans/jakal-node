import bcrypt from 'bcrypt';
import log from '../../lib/logger';
import { UserModel } from '../models';

const SALT_ROUNDS = 10;
const flatten = arr => arr.reduce((flat, a) => { return [...flat, ...a]; }, []);

export function getUser({ username, password }) {
  return UserModel.findOne({ username }).then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    } else {
      log(`user: <${username}> did not type correct password or is unknown`);
      return null;
    }
  });
}

export function getEmailSendList() {
  return UserModel
    .find({}, { emails: 1 })
    .then(addresses => flatten(addresses.map(a => a.emails)));
}

export function register({ username, email, password }) {
  const passwordHash = bcrypt.hashSync(password, SALT_ROUNDS);

  const user = new UserModel();
  user.username = username;
  user.password = passwordHash;
  user.emails = [email];

  return user.save()
  .catch(e => {
    log.error('Could not create user: ', e);
    throw new Error('Failed to register user');
  });
}

export function isSessionValid(session) {
  return UserModel
  .findOne({ session})
  .then(user => {
    return user !== null;
  });
}

export function touchSession({ username, session }) {
  return UserModel
  .update({ username}, { session });  
}
