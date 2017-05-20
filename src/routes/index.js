import * as express from 'express';
import ConfigTemplate from '../templates/ConfigTemplate';

const metaRouter = express.Router();
const dynamicsRouter = express.Router();
const historyRouter = express.Router();

// router.use((req, res, next) => {
//   console.log(`Time: ${Date.now()}`);
//   next();
// });

metaRouter.get('/config', (req, res) => {
    const config = new ConfigTemplate();
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
