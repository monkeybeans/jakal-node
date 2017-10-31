import * as express from 'express';
import {
  getFreshSuggestions,
  addSuggestion,
  voteOnSuggestion,
} from '../db/handlers/suggestions';
import settings from '../settings';

const router = express.Router();

router.get('/dynamics/suggestions', (req, res, next) => {
  getFreshSuggestions({ settings, today: new Date() })
    .then(data => res.json(data))
    .catch(next);
});

router.post('/dynamics/suggestion/:id/vote', async (req, res) => {
  const response = await voteOnSuggestion(req.params.id);
  res.json(response);
});

router.post('/dynamics/suggestion', async (req, res) => {
  const response = await addSuggestion(req.body.name, req.body.description);
  res.json(response);
});

export {
  router as default,
}
