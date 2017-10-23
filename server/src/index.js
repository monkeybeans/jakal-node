import express from 'express';
import bodyParser from 'body-parser';
import { dynamicsRouter, historyRouter, configRouter } from './routes';
import connect from './db';
//import { dailySchedule } from './lib/schedule';

const server = express();
const PORT = 8085;

function errorHandler(err, req, res, next) {
  res
  .json({
    error: err.message,
  });

  console.error(err);

  next();
}

function ping(req, res) {
  res.send('pong');
}

function logger(req, res, next) {
  console.log(`[${new Date()}] ${req.originalUrl}`);
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
  connect();

  // dailySchedule.task();
  // dailySchedule.job.start();

  console.log(`Listening on port ${PORT}!`);
});
