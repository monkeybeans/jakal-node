import * as express from 'express';
import { SuggestionModel } from '../../src/db';

const router = express.Router();

function getHistory() {
  return SuggestionModel
    .find({ winner: true });
}

router.get('/history', (req, res) => {
  res.json(getHistory());
});


export {
  router as default,
  getHistory,
}
