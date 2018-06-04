import * as express from 'express';
import { getEndorsedSuggestions } from '../db/handlers/voting-utils';
import { getStatistics } from '../db/handlers/statistics';

const router = express.Router();

router
.get('/history', (req, res, next) => {
  getEndorsedSuggestions()
  .then(endorsed => {
    res.json(endorsed);
  })
  .catch(next);
})
.get('/statistics', (req, res, next) => {
  getStatistics()
  .then(stats => {
    res.json(stats);
  })
  .catch(next);
});



export {
  router as default,
}
