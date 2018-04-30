import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import settings from './settings';
import {
  announceOrLeave,
  dynamicsRouter,
  historyRouter,
  configRouter,
  loadApp } from './routes';
import {
  checkSession,
  authenticate,
} from './middleware/auth';
import { calculatePeriodState } from './lib/period-calculator';
import connect from './db/models';
import { actUponPeriodChangeSchedule } from './scheduled';
import log from './lib/logger';
import { getEnvironment } from './lib/arg-utils';
import { AUTH_PATH } from './lib/path-constants';

const server = express();
const PORT = process.env.PORT || 8085;
const STATIC_PATH = path.join(__dirname, '../../static');
const API_PATH = `/api/v1`;

function errorHandler(err, req, res, next) {
  log.error("Error Handler recieved: " + err.message);
  log.error(err.stack);
  res.status(500).json({ error: err.message });
  next();
}

function ping(req, res) {
  res.send('pong');
}

function accessLog(req, res, next) {
  log(`${req.method} ${req.originalUrl}, user: ${req.publicUserData && req.publicUserData.username}`);
  next();
}

function setHeaders(req, res, next) {
  res.setHeader( 'X-Powered-By', '** Jakal Web Beta **' );
  next();
}

server
.use(bodyParser.json())
.use(cookieParser())
.use(checkSession)
.use(setHeaders)
.use(accessLog)
.get('/ping', ping)
.use(`/assets`, express.static(STATIC_PATH))
.use('/', announceOrLeave)
.use((req, res, next) => {
  const isApiReq = req.url.match(API_PATH) !== null;
  if (isApiReq) {
    next();
  } else {
    const session = req.cookies.session;
    const isAuthReq = req.url.match(AUTH_PATH) !== null;

    if (isAuthReq && session) {
      res.redirect(302, `/`);
    } else if (isAuthReq) {
      loadApp(req, res);
    } else if (session) {
      loadApp(req, res);
    } else {
      res.redirect(302, `${AUTH_PATH}/`);
    }
  }
})
.use(authenticate)
.use(`${API_PATH}`, configRouter)
.use(`${API_PATH}`, dynamicsRouter)
.use(`${API_PATH}`, historyRouter)
.use(errorHandler);

server.listen(PORT, () => {
  const {
    days_to_next_period,
    elapsed_period_days,
    period,
  } = calculatePeriodState({ today: new Date(), settings });

  log(`Listening on port ${PORT}!`);
  log(`Running in environment: ${getEnvironment()}`);
  log(`Serving static from path: ${STATIC_PATH}`)
  log(`period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  connect();
  actUponPeriodChangeSchedule.start();
});
