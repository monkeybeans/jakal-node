import * as express from 'express';
import { getEndorsedSuggestions } from '../db/handlers/voting-utils';

const router = express.Router();

router.get('/history', (req, res, next) => {
  getEndorsedSuggestions()
  .then(endorsed => {
    res.json(endorsed);
  })
  .catch(next);
});

export {
  router as default,
}
