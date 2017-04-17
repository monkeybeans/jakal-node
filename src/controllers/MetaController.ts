import * as express from 'express';
const router: express.Router = express.Router();

router.use((req, res, next) => {
  console.log(`Time: ${Date.now()}`);
  next();
});

router.get('/config', (req, res) => {
  res.send('This will be some configuration...');
});

export default router;
