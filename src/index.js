import express from 'express';
import bodyParser from 'body-parser';
import { dynamicsRouter, historyRouter, metaRouter } from './routes';
import connect from './db';
//import { dailySchedule } from './lib/schedule';

const server = express();
const PORT = 8085;

server
.use(bodyParser.json())
.use((req, res, next) => {
  console.log(`[${new Date()}] ${req.originalUrl}`);
  next();
})
.get('/', (req, res) => {
  res.send('should be some description...');
})
.get('/ping', (req, res) => {
  res.send('pong');
});

server
.use('/api/v1', metaRouter)
.use('/api/v1', dynamicsRouter)
.use('/api/v1', historyRouter);

server.listen(PORT, () => {
  connect();

  // dailySchedule.task();
  // dailySchedule.job.start();

  console.log(`Listening on port ${PORT}!`);
});
