'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _users = require('../db/handlers/users');

var userHandler = _interopRequireWildcard(_users);

var _pathConstants = require('../lib/path-constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SESSION_LENGTH_MS = 1000 * 60 * 60 * 24 * 31;
const router = express.Router();

const replyWithSessionCookie = (response, session) => {
  response.cookie('session', session, {
    httpOnly: true,
    maxAge: SESSION_LENGTH_MS
    //secure: true,
    //signed: true,
  }).json({ auth: 'passed' });
};

const touchSessionAndReply = ({ response, username }) => {
  const session = (0, _v2.default)();

  return userHandler.touchSession({ username, session }).then(() => replyWithSessionCookie(response, session));
};

const replyInvalidSession = response => {
  response.status(401).json({ auth: 'failed', error: 'authentication failed' });

  return response;
};

router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;

  return userHandler.getUser({ username, password }).then(user => {
    if (user !== null) {
      return touchSessionAndReply({ username, response: res });
    } else {
      replyInvalidSession(res);
    }
  }).catch(next);
}).post('/register', (req, res, next) => {
  const { username, password, email } = req.body;

  return userHandler.register({
    username,
    email,
    password
  }).then(() => touchSessionAndReply({ username, response: res })).catch(next);
}).use((req, res, next) => {
  const session = req.cookies.session;

  userHandler.isSessionValid(session).then(isValid => {
    if (isValid !== true) {
      /api/.test(req.originalUrl) ? replyInvalidSession(res) : res.redirect(_pathConstants.AUTH_PATH);
    } else {
      next();
    }
  }).catch(next);
});

exports.default = router;