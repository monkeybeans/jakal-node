import * as express from 'express';
import { MetaController } from './controllers';

const server = express();

server.get('/', (req: express.Request, res: express.Response) => {
  res.send('should be some description...');
});

server.get('/ping', (req: express.Request, res: express.Response) => {
  res.send('pong');
});

server.use('/meta', MetaController);

const router: express.Router = express.Router();

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  next();
});

router.get('/config', (req, res) => {
  res.send('This will be some configuration...');
});

server.use('/banan', router);

server.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
