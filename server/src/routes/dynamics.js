import * as express from 'express';
import {
  getSuggestions,
  addSuggestion,
  voteOnSuggestion,
} from '../db/handlers/suggestions';

const router = express.Router();

router.get('/dynamics/suggestions', (req, res, next) => {
  getSuggestions()
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
