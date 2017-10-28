import { SuggestionModel } from '../models';
import { getFreshSuggestions } from './suggestions';

function getEndorsedSuggestions(limit = 50) {
  return SuggestionModel
    .find({ 'voting.isEndorsed': true})
    .sort('-voting.started')
    .limit(limit);
}

function resolveEndorsedInPeriod({ settings, today }) {
  const endorsedIds = suggestions => {
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

  return getFreshSuggestions({ settings, today })
    .then(fresh => {

      return SuggestionModel
      .update(
        { _id: { $in: endorsedIds(fresh) }},
        { 'voting.isEndorsed': true },
        { runValidators: true, new: true },
      );
    });
}

export {
  getEndorsedSuggestions,
  resolveEndorsedInPeriod,
}
