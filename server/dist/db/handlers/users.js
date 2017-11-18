'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = getUser;
exports.getEmailSendList = getEmailSendList;
exports.register = register;
exports.isSessionValid = isSessionValid;
exports.touchSession = touchSession;
exports.checkIfVotingAllowed = checkIfVotingAllowed;
exports.updateVotingDate = updateVotingDate;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _logger = require('../../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

var _models = require('../models');

var _settings = require('../../settings');

var _settings2 = _interopRequireDefault(_settings);

var _dateCalculator = require('../../lib/date-calculator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SALT_ROUNDS = 10;
const flatten = arr => arr.reduce((flat, a) => {
  return [...flat, ...a];
}, []);

function getUser({ username, password }) {
  return _models.UserModel.findOne({ username }).then(user => {
    if (user && _bcrypt2.default.compareSync(password, user.password)) {
      return user;
    } else {
      (0, _logger2.default)(`user: <${username}> did not type correct password or is unknown`);
      return null;
    }
  });
}

function getEmailSendList() {
  return _models.UserModel.find({}, { emails: 1 }).then(addresses => flatten(addresses.map(a => a.emails)));
}

function register({ username, email, password }) {
  const passwordHash = _bcrypt2.default.hashSync(password, SALT_ROUNDS);

  const user = new _models.UserModel();
  user.username = username;
  user.password = passwordHash;
  user.emails = [email];

  return user.save({ validateBeforeSave: true }).catch(e => {
    _logger2.default.error('Could not create user: ', e);
    throw new Error('Failed to register user');
  });
}

function isSessionValid(session) {
  return _models.UserModel.findOne({ session }).then(user => {
    return user !== null;
  });
}

function touchSession({ username, session }) {
  return _models.UserModel.update({ username }, { session });
}

function checkIfVotingAllowed(session) {
  const votingStartDate = (0, _dateCalculator.rewindDateToDay)(new Date(), _settings2.default.period_voting_start_day);

  return _models.UserModel.findOne({ session, lastVoting: { $lt: votingStartDate } }).then(eligible => {
    if (eligible === null) {
      return false;
    }

    return true;
  });
}

function updateVotingDate(session) {
  return _models.UserModel.update({ session }, { lastVoting: new Date() });
}