import * as express from 'express';
import ConfigTemplate from '../templates/ConfigTemplate';
import SuggestionModel from '../db';

const metaRouter = express.Router();
const dynamicsRouter = express.Router();
const historyRouter = express.Router();
const suggestionRouter = express.Router();

// router.use((req, res, next) => {
//   console.log(`Time: ${Date.now()}`);
//   next();
// });
const getSuggestions = () => {

}

const addSuggestion = ({ name, description }) => {
  const model = new SuggestionModel({ name, description });

  return model
    .save()
    .then(getDynamics);
}

const getDynamics = () => {
  
}

const getConfig = () => {

}

const getHistory = () => {

}

suggestionRouter.post('/dynamics/suggestions', (req, res) => {

  res.send('something');
});

suggestionRouter.post('/dynamics/suggestion/{id}/vote', (req, res) => {

  res.send('something');
});

dynamicsRouter.get('/dynamics', (req, res) => {
  res.send('This will be some dynamics...');
});

metaRouter.get('/config', (req, res) => {
    const config = new ConfigTemplate();
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
