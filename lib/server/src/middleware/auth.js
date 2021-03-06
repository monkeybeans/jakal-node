import * as userHandler from '../db/handlers/users';
import log from '../lib/logger';

const replyInvalidSession = response => {
  response
  .status(401)
  .json({ auth: 'failed', error: 'session unknown' });

  return response;
}

const checkSession = (req, res, next) => {
  const session = req.cookies.session;

  req.publicUserData = {};

  userHandler
  .isSessionValid(session)
  .then(isValid => {
    if (isValid === true) {
      return userHandler.getPublicUserData(session)
      .then(d => {
        req.publicUserData = d;
      });
    } else {
      log(`Got invalid session, id: ${session}`);

      req.cookies.session && res.clearCookie('session');
    }
  })
  .then(next)
  .catch(next);
}

const authenticate = (req, res, next) => {
  const session = req.cookies.session;

  userHandler
  .isSessionValid(session)
  .then(isValid => {
    if (isValid !== true) {
      replyInvalidSession(res);
    } else {
      next();
    }
  })
  .catch(next);
}

export {
  checkSession,
  authenticate,
};
