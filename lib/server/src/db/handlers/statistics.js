import log from '../../lib/logger';
import { SuggestionModel } from '../models';

const getMostActiveSubmitters = limit => {
  return SuggestionModel.aggregate([
    { $group: { _id: '$submitter.username', numOfSubmitted: { $sum: 1 } } },
    { $project: { _id: 0,
      username: "$_id",
      numOfSubmitted: 1, } },
    { $sort: { numOfSubmitted: -1 } },
    { $limit: limit },
  ]);
}

const getVotingNumbers = () => {
  return SuggestionModel.aggregate([
    { $group: { _id: 1, totalNumVotes: { $sum: "$voting.num_of_votes" }, totalNumSuggestions: { $sum: 1 }}},
    { $project: { _id: 0,
      totalNumVotes: 1,
      totalNumSuggestions: 1 } ,
    }
  ])
  .then(results => results[0]);
}

const getStatistics = () => {
  const result = Promise.all([getMostActiveSubmitters(3), getVotingNumbers()]);

  return result
    .then(([mostActiveSubmitters, votingNumbers]) => ({
      mostActiveSubmitters,
      votingNumbers,
    }));
}

export {
  getStatistics,
}
