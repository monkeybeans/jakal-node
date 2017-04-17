import * as express from 'express';
const metaRouter: express.Router = express.Router();
const dynamicsRouter: express.Router = express.Router();
const historyRouter: express.Router = express.Router();

// router.use((req, res, next) => {
//   console.log(`Time: ${Date.now()}`);
//   next();
// });

metaRouter.get('/config', (req, res) => {
  res.send('This will be some configuration...');
});

dynamicsRouter.get('/dynamics', (req, res) => {
  res.send('This will be some dynamics...');
});

historyRouter.get('/history', (req, res) => {
  res.send('This will be some history...');
});

export {
  metaRouter,
  dynamicsRouter,
  historyRouter,
};
