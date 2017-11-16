'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveEndorsedInPeriod = exports.getEndorsedSuggestions = undefined;

var _models = require('../models');

var _suggestions = require('./suggestions');

function getEndorsedSuggestions(limit = 50) {
  return _models.SuggestionModel.find({ 'voting.is_endorsed': true }).sort('-voting.started').limit(limit);
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

  return (0, _suggestions.getFreshSuggestions)({ settings, today }).then(fresh => {

    return _models.SuggestionModel.update({ _id: { $in: endorsedIds(fresh) } }, { 'voting.is_endorsed': true }, { runValidators: true, new: true });
  });
}

exports.getEndorsedSuggestions = getEndorsedSuggestions;
exports.resolveEndorsedInPeriod = resolveEndorsedInPeriod;