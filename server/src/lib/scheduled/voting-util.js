import { SuggestionModel } from '../../db';


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

function getPickedSuggestions(limit = 50) {
  return SuggestionModel
    .find({ 'voting.stage': 'PICKED'})
    .sort('-voting.started')
    .limit(limit);
}

function finalizeVoting() {
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
    .find({ 'voting.stage': 'LISTED'})
    .then(listed => {
      return SuggestionModel
      .update({ 'voting.stage': 'LISTED' }, { 'voting.stage': 'REJECTED' })
      .update({ _id: { $in: idsOfPicked(listed) }}, { 'voting.stage': 'PICKED' });
    });
}

export {
  getPickedSuggestions,
  startVoting,
  finalizeVoting,
}
