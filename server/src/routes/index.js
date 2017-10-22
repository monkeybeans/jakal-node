import * as express from 'express';
import dynamicsRouter from './dynamics';

const metaRouter = express.Router();
const historyRouter = express.Router();

metaRouter.get('/config', (req, res) => {
    res.send('This will be some configuration...');
});


historyRouter.get('/history', (req, res) => {
    res.send('This will be some history...');
});

export {
    metaRouter,
    dynamicsRouter,
    historyRouter,
};
