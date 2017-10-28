import test from 'ava';
import connect, { SuggestionModel } from '../../models';
import {
  getEndorsedSuggestions,
  startVoting,
  reolveSuggestionAsEndorsedAndRejected } from '../voting-utils';
import {
  addSuggestion,
  voteOnSuggestion,
} from '../suggestions';


test.before(async () => {
  await connect();
});

test.afterEach.always(async () => {
  await SuggestionModel.remove();
});

test('Set start voting date for suggestions', async t => {
  await addSuggestion('name1', 'description1')
    .then(() => addSuggestion('name2', 'description2'))
    .then(() => startVoting());

  await addSuggestion('nameA', 'descriptionA')
    .then(() => addSuggestion('nameB', 'descriptionB'))
    .then(() => startVoting()
      .then(s => {
        t.is(s.length, 2);
        t.is(s[1].voting.condition, 'LISTED');
      })
  );
});

test('Picks out the winner for the latest voting round', async t => {
  const ss = await addSuggestion('nameA', 'descriptionA')
    .then(() => addSuggestion('nameB', 'descriptionB'))
    .then(() => addSuggestion('name1', 'description1'))
    .then(() => addSuggestion('name2', 'description2'));

  await startVoting()
    .then(() => voteOnSuggestion(ss._id))
    .then(() => reolveSuggestionAsEndorsedAndRejected())
    .then(() => getEndorsedSuggestions())
    .then(ss => t.is(ss[0].name, 'name2'));
});
