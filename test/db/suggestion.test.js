import test from 'ava';
import { SuggestionModel, PeriodModel, connect } from '../../src/db';

test.before(() => {
  connect();
});

test.serial('add a period', async t => {
  await PeriodModel
  .startPeriod()
  .then(async () => {
    const periods = await PeriodModel.find({closed: false});
    t.is(periods.length, 1, 'Starting period is only one');
  });
});

test.serial('closes the periods', async t => {
  await PeriodModel
  .closePeriod()
  .then(async () => {
    const periods = await PeriodModel.find({closed: false});
    t.is(periods.length, 0, 'No started period should be available');
  });
});

test.serial('inserts an suggestion', async t => {
  const name = `apan apansson ${Date.now()}`;
  const description = 'monkeing aroud in the djungle';

  await PeriodModel
  .startPeriod();

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
