import uuidv4 from 'uuid/v4';
import * as express from 'express';

const router = express.Router();

const isAuth = session => {
  return session && session.length === 36;
};

router
.all('/login', (req, res) => {
  //const ( user, pass ) = req.body;
  // auth-handler(user, pass)

  res.cookie('session', uuidv4(), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 31,
    //secure: true,
    //signed: true,
  });
  res.json({
    auth: 'passed',
  });
})
.use((req, res, next) => {
  const session = req.cookies.session;

  console.log('session: ', session, session.length);

  if (!isAuth(session)) {
    res
    .status(401)
    .json({
      auth: 'failed',
    });
  } else {
    next();
  }
});

export default router;
