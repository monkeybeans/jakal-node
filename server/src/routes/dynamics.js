import * as express from 'express';
import { SuggestionModel } from '../db';

const router = express.Router();

function addSuggestion(name, description) {
  const model = new SuggestionModel({ name, description });

  return model.save();
}

function getSuggestions() {
  return SuggestionModel.find();
}

function voteOnSuggestion(suggestionId) {
  return SuggestionModel
    .findOne({ _id: suggestionId })
    .then(suggestion => {
      if (suggestion === null) {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) was not found.`);
      }

      if (suggestion.voting.stage !== 'LISTED') {
        throw new Error(`Voting failed: suggesiont Id(${suggestionId}) wrong stage(${suggestion.voting.stage}).`);
      }

      return SuggestionModel.findOneAndUpdate(
        { _id: suggestionId },
        { $inc: { 'voting.num_of_votes': 1 } },
        { new: true },
      );

    })
}

function getWinner() {
  return SuggestionModel
  .find()
  .sort('-voting.num_of_votes')
  .lean()
  .then(results => results[0]);
}

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
  getSuggestions,
  addSuggestion,
  voteOnSuggestion,
  getWinner,
}
