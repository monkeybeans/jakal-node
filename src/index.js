import express from 'express';
import { dynamicsRouter, historyRouter, metaRouter } from './routes';

const server = express();
const PORT = 8085;

server
.use((req, res, next) => {
  console.log(`[${Date.now()}] ${req.baseUrl}`);
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
  console.log(`Listening on port ${PORT}!`);
});
