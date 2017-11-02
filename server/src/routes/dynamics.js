import * as express from 'express';
import {
  getFreshSuggestions,
  addSuggestion,
  voteOnSuggestion,
} from '../db/handlers/suggestions';
import settings from '../settings';

const router = express.Router();

router.get('/dynamics/suggestions', async (req, res, next) => {
  getFreshSuggestions({ settings, today: new Date() })
  .then(r => res.json(r))
  .catch(next);
});

router.post('/dynamics/suggestion', (req, res, next) => {
  addSuggestion(req.body.name, req.body.description)
  .then(r => res.json(r))
  .catch(next);
});

router.post('/dynamics/suggestion/:id/vote', (req, res, next) => {
  voteOnSuggestion(req.params.id)
  .then(r => res.json(r))
  .catch(next);
});

export {
  router as default,
}
