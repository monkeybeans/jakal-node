import test from 'ava';
import mongoose from 'mongoose';
import { SuggestionModel, connect } from '../../src/db';

test.beforeEach(() => {
  connect(mongoose);
});

test('inserts an suggestion', async t => {
  const name = `apan apansson ${Date.now()}`;
  const description = 'monkeing aroud in the djungle';

  const model = new SuggestionModel({name, description});
  await model
  .save();

  await SuggestionModel
  .findOne({name}).sort({submitted: -1})
  .then(suggestion => {
    t.is(suggestion.name, name);
    t.is(suggestion.description, description);
  })
  .catch((err) => console.log('Error: ', err));

});
