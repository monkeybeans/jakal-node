import test from 'ava';
import {
  addSuggestion,
  getSuggestions,
  voteOnSuggestion,
  getWinner,
} from '../dynamics';

import connect, { SuggestionModel } from '../../db';

test.before(async () => {
  await connect();
});

test.afterEach.always(async () => {
  await SuggestionModel.remove();
});

test.before(async () => {
  await connect();
});

test('inserts an suggestion', async t => {
  const name = `apan apansson ${Date.now()}`;
  const description = 'monkeing aroud in the djungle';

  const result = await addSuggestion(name, description);

  t.is(result.name, name);
  t.is(result.description, description);
});

test('get the current suggestions', async t => {
  await addSuggestion('name1', 'description1');
  await addSuggestion('name2', 'description2');
  await addSuggestion('name3', 'description3');

  const result = await getSuggestions();

  t.is(result.length, 3);
})

test.failing('votes on a suggestion', async t => {
  const suggestion = await addSuggestion('name1', 'description1');
  const result = await voteOnSuggestion(suggestion._id);

  t.is(result.voting.num_of_votes, 1);
});


test.failing('picks out the suggestions with the most votes', async t => {
  await addSuggestion('name1', 'description1');
  await addSuggestion('name2', 'description2');
  const favourite = await addSuggestion('name3', 'description3');

  await voteOnSuggestion(favourite._id);

  const result = await getWinner();

  t.is(result._id.toString(), favourite._id.toString());
});
