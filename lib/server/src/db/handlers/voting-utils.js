import { SuggestionModel } from '../models';
import { getFreshSuggestions } from './suggestions';

function getEndorsedSuggestions(limit = 50) {
  return SuggestionModel
    .find({ 'voting.is_endorsed': true})
    .sort('-submitter.time')
    .limit(limit);
}

function resolveEndorsedInPeriod({ settings, today }) {
  const endorsedIds = suggestions => {
    let highestVote = 0;
    return suggestions
    .filter(s => s.voting.num_of_votes > 0)
    .reduce((picked, s) => {
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
        { 'voting.is_endorsed': true },
        { runValidators: true, new: true },
      );
    });
}

export {
  getEndorsedSuggestions,
  resolveEndorsedInPeriod,
}
