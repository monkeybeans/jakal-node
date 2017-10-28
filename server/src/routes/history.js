import * as express from 'express';
import { getEndorsedSuggestions } from '../db/handlers/voting-utils';

const router = express.Router();

router.get('/history', (req, res) => {
  getEndorsedSuggestions()
  .then(endorsed => {
    res.json(endorsed);
  });
});


export {
  router as default,
}
