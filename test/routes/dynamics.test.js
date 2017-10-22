import test from 'ava';
import {
  addSuggestion,
  getSuggestions,
  voteOnSuggestion,
} from '../../src/routes/dynamics';

import connect from '../../src/db';

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

test.only('get the current suggestions', t => {
  t.fail('not implemented!');
})

test('votes on a suggestion', t => {
  t.fail('not implemented!');
});


test('picks out the suggestions with the most votes', t => {
  t.fail('not implemented!');
});
