import bcrypt from 'bcrypt';
import log from '../../lib/logger';
import { UserModel } from '../models';
import settings from '../../settings';
import { rewindDateToDay } from '../../lib/date-calculator';

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

export function getPublicUserData(session) {
  return UserModel
    .findOne(
      { session },
      { username: 1, lastVoting: 1, _id: 0 },
      { lean: 1},
    )
    .then(user => user || {});
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

  return user.save({validateBeforeSave: true})
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

export function removeSession(username) {
  return UserModel
  .findOneAndUpdate(
    { username },
    { session: null },
    { new: true }
  );
}

export function checkIfVotingAllowed(session) {
  const votingStartDate = rewindDateToDay(new Date(), settings.period_voting_start_day);

  return UserModel
  .findOne({ session, lastVoting: { $lt: votingStartDate } })
  .then(eligible => {
    if (eligible === null) {
      return false;
    }

    return true;
  })
}

export function updateVotingDate(session) {
  return UserModel
  .update({ session }, { lastVoting: new Date()});
}
