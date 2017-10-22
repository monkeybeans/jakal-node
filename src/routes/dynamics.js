import { SuggestionModel } from '../db';


function addSuggestion(name, description) {
  const model = new SuggestionModel({ name, description });

  return model.save();
}

function getSuggestions() {
  return SuggestionModel.find();
}

function voteOnSuggestion(suggestionId) {
  return SuggestionModel
    .findOneAndUpdate(
      { _id: suggestionId },
      { $inc: { 'voting.num_of_votes': 1 } }
    );
}

export {
  getSuggestions,
  addSuggestion,
  voteOnSuggestion,
}
