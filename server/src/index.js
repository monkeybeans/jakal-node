import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import settings from './settings';
import {
  auth,
  dynamicsRouter,
  historyRouter,
  configRouter,
  loadAuth, loadApp } from './routes';
import { calculatePeriodState } from './lib/period-calculator';
import connect from './db/models';
import { actUponPeriodChangeSchedule } from './scheduled';
import log from './lib/logger';
import { getEnvironment } from './lib/arg-utils';
import { AUTH_PATH } from './lib/path-constants';

const server = express();
const PORT = process.env.PORT || 8085;
const STATIC_PATH = path.join(__dirname, '../../app/dist');

function errorHandler(err, req, res, next) {
  log.error("Error Handler recieved: " + err);
  res.status(500).json({ error: err.message });
  next();
}

function ping(req, res) {
  res.send('pong');
}

function accessLog(req, res, next) {
  log(`${req.method} ${req.originalUrl}`);
  next();
}

function setHeaders(req, res, next) {
  res.setHeader( 'X-Powered-By', '** Jakal Web Beta **' );
  next();
}

server
.use(setHeaders)
.use(bodyParser.json())
.use(cookieParser())
.use(accessLog)
.get('/ping', ping)
.use('/assets', express.static(STATIC_PATH))
.get(AUTH_PATH, loadAuth)
.use(auth)
.use('/api/v1', configRouter)
.use('/api/v1', dynamicsRouter)
.use('/api/v1', historyRouter)
.use('/', loadApp)
.use(errorHandler);

server.listen(PORT, () => {
  const {
    days_to_next_period,
    elapsed_period_days,
    period,
  } = calculatePeriodState({ today: new Date(), settings });

  log(`Listening on port ${PORT}!`);
  log(`Running in environment: ${getEnvironment()}`);
  log(`period: ${period}, elapsed days: ${elapsed_period_days}, next period in days: ${days_to_next_period}`);

  connect();
  actUponPeriodChangeSchedule.start();
});
