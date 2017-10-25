import { SuggestionModel } from '../models';

function addSuggestion(name, description) {
  const model = new SuggestionModel({ name, description });

  //@TODO: send notification mail
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

export {
  addSuggestion,
  getSuggestions,
  voteOnSuggestion,
}
