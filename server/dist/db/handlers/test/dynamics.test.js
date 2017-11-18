'use strict';

var _suggestions = require('../suggestions');

var _models = require('../../models');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe('handlers.dynamics', () => {
  afterEach(() => _models.SuggestionModel.remove());

  it('inserts an suggestion', _asyncToGenerator(function* () {
    const name = `apan apansson ${Date.now()}`;
    const description = 'monkeing aroud in the djungle';

    const result = yield (0, _suggestions.addSuggestion)(name, description);

    expect(result.name).to.be.equal(name);
    expect(result.description).to.be.equal(description);
  }));

  it('get the fresh suggestions', _asyncToGenerator(function* () {
    const today = new Date();
    const settings = {
      period_suggest_start_day: today.getDate() - 1
    };

    yield (0, _suggestions.addSuggestion)('name1', 'description1');
    yield (0, _suggestions.addSuggestion)('name2', 'description2');
    yield (0, _suggestions.addSuggestion)('name3', 'description3');

    const result = yield (0, _suggestions.getFreshSuggestions)({ settings, today });

    expect(result).to.have.lengthOf(3);
  }));

  it('votes on a suggestion', _asyncToGenerator(function* () {
    const suggestion = yield (0, _suggestions.addSuggestion)('name1', 'description1');
    const result = yield (0, _suggestions.voteOnSuggestion)(suggestion._id);

    expect(result.voting.num_of_votes).to.be.equal(1);
  }));
});