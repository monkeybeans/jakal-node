import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import settings from './settings';
import { auth, dynamicsRouter, historyRouter, configRouter } from './routes';
import { calculatePeriodState } from './lib/period-calculator';
import connect from './db/models';
import { actUponPeriodChangeSchedule } from './scheduled';
import log from './lib/logger';
import { getEnvironment } from './lib/arg-utils';

const server = express();
const PORT = 8085;

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

function loadApp(req, res, next) {
  //const html = 'banan';
  res.send(
    `
    <!DOCUMENT html>
    <html>
    <head>
    </head>
    <body>
      <h1>JAKAL VOTING 2.0!!!</h1>
    </body>
    </html>
    `
  );

  next();
}

server
.use(bodyParser.json())
.use(cookieParser())
.use(accessLog)
.get('/ping', ping)
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
