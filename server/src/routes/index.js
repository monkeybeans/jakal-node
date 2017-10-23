import * as express from 'express';
import dynamicsRouter from './dynamics';
import configRouter from './config';

const historyRouter = express.Router();

historyRouter.get('/history', (req, res) => {
    res.send('This will be some history...');
});

export {
    configRouter,
    dynamicsRouter,
    historyRouter,
};
