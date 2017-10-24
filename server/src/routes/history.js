import * as express from 'express';
import { getPickedSuggestions } from '../lib/scheduled/voting-util';

const router = express.Router();

router.get('/history', (req, res) => {
  res.json(getPickedSuggestions());
});


export {
  router as default,
}
