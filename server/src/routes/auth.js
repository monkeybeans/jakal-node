import uuidv4 from 'uuid/v4';
import * as express from 'express';
import * as userHandler from '../db/handlers/users';
import { AUTH_PATH } from '../lib/path-constants';

const SESSION_LENGTH_MS = 1000 * 60 * 60 * 24 * 31;
const router = express.Router();

const replyWithSessionCookie = (response, session) => {
  response
  .cookie('session', session, {
    httpOnly: true,
    maxAge: SESSION_LENGTH_MS,
    //secure: true,
    //signed: true,
  })
  .json({ auth: 'passed' });
};

const touchSessionAndReply = ({response, username}) => {
  const session = uuidv4();

  return userHandler
  .touchSession({ username, session})
  .then(() => replyWithSessionCookie(response, session));
};

const replyInvalidSession = response => {
  response
  .status(401)
  .json({ auth: 'failed', error: 'authentication failed' });

  return response;
}

router
.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body;

  return userHandler.getUser({ username, password})
  .then(user => {
    if(user !== null) {
      return touchSessionAndReply({ username, response: res});
    } else {
      replyInvalidSession(res);
    }
  })
  .catch(next);
})
.post('/register', (req, res, next) => {
  const { username, password, email } = req.body;

  return userHandler.register({
    username,
    email,
    password,
  })
  .then(() => touchSessionAndReply({ username, response: res}))
  .catch(next);
})
.get('/logout', (req, res) => {
  res
  .clearCookie('session')
  .json({ logout: true });
})
.use((req, res, next) => {
  const session = req.cookies.session;

  userHandler
  .isSessionValid(session)
  .then(isValid => {
    if (isValid !== true) {
      /api/.test(req.originalUrl)
      ? replyInvalidSession(res)
      : res.redirect(`/jakal-web-BETA/${AUTH_PATH}`.replace('//', '/'));
    } else {
      next();
    }
  })
  .catch(next);
});

export default router;
