import { SuggestionModel } from '../models';


function startVoting() {
  const startDate = new Date();

  return SuggestionModel
    .updateMany(
      { 'voting.started': null },
      { 'voting.started': startDate },
      { runValidators: true }
    )
    .then(() => SuggestionModel.find( { 'voting.started': startDate } ));
}

function getEndorsedSuggestions(limit = 50) {
  return SuggestionModel
    .find({ 'voting.condition': 'ENDORSED'})
    .sort('-voting.started')
    .limit(limit);
}

function reolveSuggestionAsEndorsedAndRejected() {
  const idsOfPicked = suggestions => {
    let highestVote = 0;
    return suggestions.reduce((picked, s) => {
      if (s.voting.num_of_votes > highestVote) {
        picked = [s._id];
        highestVote = s.voting.num_of_votes;
      } else if (s.voting.num_of_votes >= highestVote) {
        picked.push(s._id);
        highestVote = s.voting.num_of_votes;
      }
      return picked;
    }, []);
  };

  return SuggestionModel
    .find({ 'voting.condition': 'LISTED'})
    .then(listed => {
      return SuggestionModel
      .update({ 'voting.condition': 'LISTED' }, { 'voting.condition': 'REJECTED' })
      .update({ _id: { $in: idsOfPicked(listed) }}, { 'voting.condition': 'ENDORSED' });
    });
}

export {
  getEndorsedSuggestions,
  startVoting,
  reolveSuggestionAsEndorsedAndRejected,
}
