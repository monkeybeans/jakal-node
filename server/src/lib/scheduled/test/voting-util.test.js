import test from 'ava';
import connect, { SuggestionModel } from '../../../db';
import { getPickedSuggestions, startVoting } from '../voting-util';
import {
  addSuggestion,
  voteOnSuggestion,
} from '../../../routes/dynamics';


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
        t.is(s[1].voting.stage, 'LISTED');
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
    .then(() => getPickedSuggestions())
    .then(ss => console.log(ss));

});
