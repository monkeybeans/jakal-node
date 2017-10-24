import test from 'ava';
import {
  addSuggestion,
  voteOnSuggestion,
} from '../dynamics';
import {
  getHistory,
} from '../history';

import connect, { SuggestionModel } from '../db';

test.before(async () => {
  await connect();
});

test.afterEach.always(async () => {
  await SuggestionModel.remove();
});

test('get history of winner suggestions', async t => {
  await addSuggestion('name1', 'description1');
  await addSuggestion('name2', 'description2');
  const winner = await addSuggestion('name3', 'description3');

  await voteOnSuggestion(winner._id);
  await voteOnSuggestion(winner._id);

  const result = await getHistory();

  console.log(result);

  const  expected = [{
    name: 'name3',
    num_of_votes: 1,
  }];

  t.deepEqual(result, expected);
})
