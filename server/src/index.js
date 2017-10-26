import express from 'express';
import bodyParser from 'body-parser';
import { dynamicsRouter, historyRouter, configRouter } from './routes';
import connect from './db/models';
import { actUponPeriodChangeSchedule } from './scheduled';
import log from './lib/logger';
import sendMail from './communication/sendMail';
import { parseArgs, loadSecret } from './lib/arg-utils';

const server = express();
const PORT = 8085;

const argv = parseArgs(process.argv.slice(2));
const secret = loadSecret(argv.secretPath);

function errorHandler(err, req, res, next) {
  res.json({ error: err.message });
  log.error(err);
  next();
}

function ping(req, res) {
  res.send('pong');
}

function logger(req, res, next) {
  log(`GET ${req.originalUrl}`);
  next();
}

server
.use(bodyParser.json())
.use(logger)
.get('/ping', ping)
.use('/api/v1', configRouter)
.use('/api/v1', dynamicsRouter)
.use('/api/v1', historyRouter)
.use(errorHandler);

server.listen(PORT, () => {
  log(`Listening on port ${PORT}!`);

  connect();
  actUponPeriodChangeSchedule.start();

  sendMail(
    secret.mail.username,
    secret.mail.password,
  );
});
