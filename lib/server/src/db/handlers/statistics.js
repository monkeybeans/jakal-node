import log from '../../lib/logger';
import moment from 'moment';
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

const getAverageVotesSinceDate = (date) => {
  const aggregations = [
    { $match: { 'submitter.time' : { $gt: new Date(date.toISOString()) } } },
    { $sort: {'submitter.time':1}},
    { $group: { _id: 1,
        totNumVotes: { $sum: "$voting.num_of_votes" },
        totNumSuggestions: { $sum: 1 },
        // oldest:{ $first: '$$ROOT' },
        // newest: { $last:'$$ROOT' },
    }},
    { $project: { _id: 0,
      totNumVotes: 1,
      totNumSuggestions: 1,
      // startDate: '$oldest.submitter.time',
      // endDate: '$newest.submitter.time',
    }},
  ];

  return SuggestionModel.aggregate(aggregations)
  .then(results => results[0] || {});
}

const getStatistics = async () => {
  const lastYear = moment().subtract(1, 'year');

  const [mostActiveSubmitters, votingNumbers] = await Promise
    .all([getMostActiveSubmitters(5), getAverageVotesSinceDate(lastYear)]);

    const { totNumVotes, totNumSuggestions } = votingNumbers;

    const sampleTime = moment().diff(lastYear, 'month') || 1;

    const avgSuggestionsDuringPeriod = totNumSuggestions / sampleTime;
    const avgVotesDuringPeriod = totNumVotes / sampleTime;

    return {
      stats: [
        {
          label: 'Most active submitters',
          data: mostActiveSubmitters.map(s => ({
            meta: s.username,
            value: `submitted: ${s.numOfSubmitted}`,
          })),
        },
        {
          label: 'suggestions / month',
          data: {
            meta: 'A year back',
            value: avgSuggestionsDuringPeriod.toFixed(1),
          },
        },
        {
          label: 'Total suggestions submitted',
          data: {
            meta: 'Since beginning',
            value: totNumSuggestions,
          },
        },
        {
          label: 'votes / month',
          data: {
            meta: 'A year back',
            value: avgVotesDuringPeriod.toFixed(1),
          },
        },
      ],
    };
}

export {
  getStatistics,
}
